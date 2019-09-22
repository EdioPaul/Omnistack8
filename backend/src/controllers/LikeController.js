const Dev = require ('../models/Dev');

module.exports = {
    //async sinaliza que sera modo assincrono
   async store (req, res){

    console.log(req.io, req.connectedUsers);

    const { user  } = req.headers;
    //qual dev esta dando like em alguem
    const { devId } = req.params;
       
       //busca o model deles no banco logged e target são as instancias
       const loggedDev = await Dev.findById(user); // findById busca o usuario logado pelo Id
       const targetDev = await Dev.findById(devId);

       //verifica se está dando like para usuario que nao existe
       if(!targetDev) {
           return res.status(400).json({error: 'Dev not exists'});
       }
        if(targetDev.likes.includes(loggedDev._id)){
         //avisa os dois user pelo socketid
         const loggedSocket = req.connectedUsers[user];
         const targetSocket = req.connectedUsers[devId];

         //recebe a notificação somente se estiver conectado
         //avisa usuario logado se deu match
         if(loggedSocket) {
             req.io.to(loggedSocket).emit('match', targetDev);
         }
         //avisa o outro usuario se deu match
         if(targetSocket){
             req.io.to(targetSocket).emit('match', loggedDev);
         }

        }
       //se existe logado
       //push busca no array do vetor de likes
       loggedDev.likes.push(targetDev._id);
       //await aguarda se esta logado, salva as modificações
       await loggedDev.save();

       return res.json( loggedDev);
    }
};