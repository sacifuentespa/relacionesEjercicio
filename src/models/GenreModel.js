const db = require('../database/models')

const GenreModel = {
    getAll: ()=>{
        let genres = db.Genre.findAll()
         return genres.then( (res)=> res)
         .catch((err)=> console.error(err))
    }
}

module.exports = GenreModel