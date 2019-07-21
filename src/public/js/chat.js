const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let actions = document.getElementById('actions');
let sendBtn = document.getElementById('send');
let output = document.getElementById('output');

sendBtn.addEventListener('click', ()=>{
    console.log(username.value, message.value);
    socket.emit('chat:message',{
        username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username.value)
});

socket.on('chat:message', (data)=>{
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', (data)=>{
    console.log(data);
    actions.innerHTML = `<p><em>
        ${data} is typing a message.
    </em></p>`
});

