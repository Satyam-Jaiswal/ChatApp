const socket = io ('http://localhost:8000');

const form = document.getElementById('send-container')
const msginp = document.getElementById('msginp')
const msgcont = document.querySelector('container')
var audio = new Audio('pop.mp3') ;

// $(ChatApp).ready(append = (message, position)=>{

    const append = (message, position)=>{
        const messageElement= document.createElement('div');
        messageElement.innerText=message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        msgcont.append('messageElement');
        if(position=='left'){
            audio.play();
        }
    };
    
// });

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msginp.value;
    append(`You: ${message}`, 'rigth');
    socket.emit('send', message);
    msginp.value="";
})


const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
append(`${name} joined the chat`, "right")  
})

socket.on('receive', data =>{
  append(`${data.name}: ${data.message}`, "left")  
})

socket.on(`left`, name =>{
  append(`${name} left the chat `, "left")  
})