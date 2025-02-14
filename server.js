
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path');
const PORT = process.env.PORT || 3000

console.log(__dirname);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

http.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})


//socket.io


const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('user is connected');
    socket.on('message', (msg) => {
        //console.log(msg);
        socket.broadcast.emit('message', msg);
    })
})

