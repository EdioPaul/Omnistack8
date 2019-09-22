//Controller recebe das rotas as requisições e as trata
const Dev = require ('../models/Dev');

//importar APIS externas
const axios = require('axios');

module.exports = {
   // index lista usuarios do banco
   async index (req, res) { 
     const { user } = req.headers;
    //pega todos os dados do usuario logado, como seus likes e deslikes
     const loggedDev = await Dev.findById(user);
   
     const users = await Dev.find({
         //aplica os 3 filtros de uma vez, não uma a um usando OR
         $and: [
           { _id: { $ne: user}},//pega todos os usuarios que não seja o logado
           { _id: { $nin: loggedDev.likes}},//exclui logados que ja recebeu like do user logado
           { _id: { $nin: loggedDev.dislikes}},//exclui logados que ja recebeu dislike do user logado
        ],

     })

        return res.json(users);

    },
   //indica ser assincrono
   async store (req, res) { 
    
    const { username } = req.body;

    //verifica se o usuario ja existe na base
    //findOne busca 01 usuario igual "username"
    const userExists = await Dev.findOne({ user: username });
   
    if (userExists) {
      //se o usuario existe, retorna ele mesmo
        return res.json(userExists);
    }
    //resposta que o axios retorna
    const response = await axios.get(`https://api.github.com/users/${username}`);
     //importa name, bio e avatar do response.data
     const { name, bio, avatar_url: avatar } = response.data;

    //passar informações para o banco
      const dev = await Dev.create({
          name,
          user: username,
          bio,
          avatar //avatar foi alterado a variavel em "avatar_url"
      }); 
      //retorna a variavel dev
      return res.json( dev );
   }
};