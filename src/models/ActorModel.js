const db = require('../database/models')

const ActorModel = {
    getAll: ()=>{
        let actors = db.Actor.findAll()
         return actors.then( (res)=> res)
         .catch((err)=> console.error(err))
    }
}

module.exports = ActorModel