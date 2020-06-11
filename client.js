const socket=io('http://localhost:8000');

const form = document.getElementById('send-container')
const msginp = document.getElementById('msginp')
const msgcont = document.getElementById('container')

const append = (message, posiotion)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);

}


const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', data=>{
  append(`${name}` "right")  
})