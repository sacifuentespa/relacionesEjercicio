const db = require('../database/models')

const ActorModel = {
    getAll: ()=>{
        let actores = db.Actor.findAll()
         return actores.then( (res)=> console.log(res))
         .catch((err)=> console.error(err))
    }
}

module.exports = ActorModel