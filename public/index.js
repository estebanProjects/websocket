const socket = io()

socket.on('message_back', (data) => {
    console.log(data)

    socket.emit("message_client", "Thanks, I am the Client")
})