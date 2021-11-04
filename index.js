const express = require('express')
const app = express()
const router = require('./routes/index')

let msn = []

// Archivos estaticos
app.use(express.static(__dirname + '/public'))

// Server 
const http = require('http')
const server = http.createServer(app)

// Socket
const { Server } = require('socket.io')
const io = new Server(server)

// Conexion Socket
io.on("connection", (socket) => {
    console.log("Client connected")

    socket.on("message_client", (data) => {
        console.log(data)
    })

    // Listen chat client
    socket.on('dataMsn', (data) => {
        msn.push(data)
        console.log(msn)
        // socket.emit('message_back', msn)
        io.sockets.emit('message_back', msn)
    })
})

// Router
app.use('/api', router)


server.listen(3003, () => {
    console.log("Server running on port 3003")
})