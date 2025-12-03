import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
app.use(cors())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both ports
    methods: ["GET", "POST"]
  }
})

// Store connected users
const connectedUsers = new Map<string, { name: string; avatar: string }>()

// Función para traducir a idioma pirata
async function translateToPirate(text: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.funtranslations.com/translate/pirate.json?text=${encodeURIComponent(text)}`
    )
    
    if (!response.ok) {
      console.error('Translation API error:', response.status)
      return text // Si falla, devuelve el texto original
    }

    const data = await response.json()
    return data.contents.translated || text
  } catch (error) {
    console.error('Error translating to pirate:', error)
    return text // Si hay error, devuelve el texto original
  }
}

io.on("connection", socket => {
  console.log("🟢 Usuario conectado:", socket.id)

  // Handle user joining
  socket.on("user_join", (userData: { name: string; avatar: string }) => {
    connectedUsers.set(socket.id, userData)
    console.log(`👤 ${userData.name} joined the chat`)
    
    // Send updated user list to all clients
    io.emit("users_update", Array.from(connectedUsers.values()))
  })

  socket.on("send_message", async (data) => {
    console.log("📨 Mensaje recibido:", data.message)
    
    // Traduce el mensaje a idioma pirata
    const translatedMessage = await translateToPirate(data.message)
    console.log("🏴‍☠️ Mensaje traducido:", translatedMessage)
    
    // Envía el mensaje traducido a todos los clientes
    const messageData = {
      author: data.author,
      avatar: data.avatar,
      message: translatedMessage
    }
    
    io.emit("receive_message", messageData)
  })

  socket.on("disconnect", () => {
    const user = connectedUsers.get(socket.id)
    if (user) {
      console.log(`🔴 ${user.name} disconnected`)
      connectedUsers.delete(socket.id)
      
      // Send updated user list to all clients
      io.emit("users_update", Array.from(connectedUsers.values()))
    }
  })
})

server.listen(3001, () => {
  console.log("🏴‍☠️ Servidor pirata corriendo en http://localhost:3001")
})
