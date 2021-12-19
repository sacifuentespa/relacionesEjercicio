const db = require('../database/models')

const ActorModel = {
    findAll: ()=>{
        let actores = db.Actor.findAll()
         return actores.then( (res)=> console.log(res))
         .catch((err)=> console.error(err))
    }
}

console.log(ActorModel.findAll())