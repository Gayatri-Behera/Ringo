const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
var audio = new Audio('ting.mp3');

do {
    name = prompt("Enter your name");
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing');
    textarea.value = " ";
    scrollToBottom();

    //send to server
    socket.emit('message', msg)
}

//appending to main container

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message')


    let markup = `<h4>${msg.user}</h4><p> ${msg.message}</p>`

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
    if (type == 'incoming') {
        audio.play();
    }
}

//Recieve messages

socket.on('message', (msg) => {
    //console.log(msg);
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}