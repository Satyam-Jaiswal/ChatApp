const socket = io ('http://localhost:8000');

const form = document.getElementById('send-container')
const msginp = document.getElementById('msginp')
const msgcont = document.querySelector('containerr')
var audio = new Audio('pop.mp3') ;

// $(ChatApp).ready(append = (message, position)=>{

    const change = (message, position)=>{
        const messageElement= document.createElement('div');
        messageElement.innerText=message;
        messageElement.classList.add("msg");
        messageElement.classList.add(position);
        msgcont.append(messageElement);
        if(position=='left'){
            audio.play();
        }
    };
    
// });

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msginp.value;
    change(`You: ${message}`, 'rigth');
    socket.emit('send', message);
    msginp.value="";
})


const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
change(`${name} joined the chat`, "right")  
})

socket.on('receive', data =>{
  change(`${data.name}: ${data.message}`, "left")  
})

socket.on(`left`, name =>{
  change(`${name} left the chat `, "left")  
})