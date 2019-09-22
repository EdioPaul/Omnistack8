const express = require('express');
//importa o Devcontroller.js
const DevController = require ('./controllers/DevController');
//importa o Likecontroller.js
const LikeController = require ('./controllers/LikeController');
//importa o Dislikecontroller.js
const DislikeController = require ('./controllers/DislikeController');

//para passar para fora e ser usado
const routes = express.Router();

routes.get('/devs', DevController.index);
//quando acessar essa rota chama o controller
routes.post('/devs', DevController.store);
//inserir o like no banco ao referido "id"
routes.post('/devs/:devId/likes', LikeController.store);
//inserir o dislike no banco ao referido "id"
routes.post('/devs/:devId/dislikes', DislikeController.store);

//exporta routes
module.exports = routes;