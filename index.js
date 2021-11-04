const express = require('express')
const app = express()

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
    socket.emit('message_back', 'Hello I am the Back')

    socket.on("message_client", (data) => {
        console.log(data)
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html')
})


server.listen(3003, () => {
    console.log("Server running on port 3003")
})