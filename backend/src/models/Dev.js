//importa do mongoose por desestruturação o Schema e model
const { Schema, model} = require ('mongoose');

//Estrutura para armazenar desenvolvedores dentro
const DevSchema = new Schema({
   name: {
       type: String,
       require: true,
   },
    user: {
       type: String,
       required: true,
    },
    bio: String,
    avatar: {
       type: String,
       required: true,
    },
    likes: [{
        //devs que ja receberam like conforme id do mongo
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        //devs que ja receberam dislike conforme id do mongo
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],

}, {
    //cria createdAt e updatedAt automatico
    timestamps: true, 
});

module.exports = model ('Dev', DevSchema);