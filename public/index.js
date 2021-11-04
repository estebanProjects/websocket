const socket = io()

socket.on('message_back', (data) => {
    console.log(data)
    render(data)
    socket.emit("message_client", "Thanks, I am the Client")
})

const render = (data) => {
    let html = data.map(x => {
        return `
        <p> <strong>${x.nombre} </strong> : ${x.msn} </p>`
    }).join(" ")

    document.querySelector('#caja').innerHTML = html
}

const addInfo = () => {
    let dataObj = {
        nombre: document.querySelector('#nm').value,
        msn: document.querySelector('#msn').value
    }

    console.log(dataObj)
    socket.emit("dataMsn", dataObj)
    document.querySelector('#msn').value = ""

    return false // si se lo quito, se refresca la pagina
}


const send = document.getElementById('send')

send.addEventListener('click', (e) => {
    e.preventDefault()
    addInfo()
})

// 1:10:00