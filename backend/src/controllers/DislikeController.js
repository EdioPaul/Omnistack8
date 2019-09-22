const Dev = require ('../models/Dev');

module.exports = {
   async store (req, res){
    const { user  } = req.headers;
    //qual dev esta dando like em alguem
    const { devId } = req.params;
       
       //busca o model deles no banco logged e target são as instancias
       // findById busca o usuario logado pelo Id
       const loggedDev = await Dev.findById(user); 
       const targetDev = await Dev.findById(devId);

       //verifica se está dando like para usuario que nao existe
       if(!targetDev) {
           return res.status(400).json({error: 'Dev not exists'});
       }

       //se existe logado
       //push busca no array do vetor de likes
       loggedDev.dislikes.push(targetDev._id);
       //salva as modificações
       await loggedDev.save();

       return res.json( loggedDev);
    }
};