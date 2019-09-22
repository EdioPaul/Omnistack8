//frame express
const express = require('express');
//ODM mongo
const mongoose = require('mongoose');
//cros origin
const cors = require('cors');
//chama routes.js
const routes = require ('./routes');
//cria o servidor do express
const app = express();
//http padrão do Node
const server = require('http').Server(app);
//socket io para conexão direta com o back por websocket
const io = require('socket.io')(server);


//relacionando o id de usuario com o id do socket
const connectedUsers = {};

//toda vez que conecta por websocket recebe a conexão 
io.on('connection', socket => {
    //pega o ususario 
    const { user } = socket.handshake.query;

    console.log(user, socket.id);

    connectedUsers[user] = socket.id;  
    
     

    //************************************* */
    //cada conexão com o back gera um id para saber para qual usuario enviar a atualização
  //console.log('Nova conexão', socket.id);
  
  //ouvindo a mensagem do front
  //socket.on('hello', message => {
    //  console.log(message);
  //})
   //enviando a msg para o front
  //setTimeout(() => {
    //  socket.emit('word', {
      //    message: 'omnistack'
      //});
  //}, 5000)
//******************************************* */



});
//conexão com o banco
mongoose.connect('mongodb+srv://edio:3d10@cluster0-512sp.mongodb.net/omnistack8?retryWrites=true&w=majority', {useNewUrlParser: true});

//midleware para passar req ao controller
app.use((req, res, next) => {
  //variavel io para não precisar importar socket.io no Likecontroller  
  req.io = io;
  //passa quais usuarios estão conectados para o controller
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
//avisa o express que tudo sera via JSON
app.use(express.json());

//server é a constante ou seja o proprio "app"
//usa o routes exportado de routes.js
app.use(routes);

//escuta na porta 3333
server.listen(3333);