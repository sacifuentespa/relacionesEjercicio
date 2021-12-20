const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const GenreModel = require(path.resolve(__dirname, '../models/GenreModel'))


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        let genres = GenreModel.getAll()
        return genres
        .then(genres=>{
            res.render('moviesAdd',{allGenres: genres})
        })
        .catch(err=>console.error(err))        
    },
    create: function (req,res) {
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        })
        .then(()=>{
            res.redirect('/movies')
        })
        .catch(err=>console.error(err))

    },
    edit: function(req,res) {

        let movie = Movies.findByPk(req.params.id,{
            include: [{association: 'genres'}]
        })

        let genres = GenreModel.getAll()

        Promise.all([movie, genres]).then(function([movie, genres]){
            res.render('moviesEdit',{Movie: movie, allGenres: genres})
        })
    },
    update: function (req,res) {
        Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        },{
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect('/movies')
        })
        .catch(err=>console.error(err))

    },
    delete: function (req,res) {
        Movies.findByPk(req.params.id)
        .then(result=>{
            res.render('moviesDelete',{Movie: result})
        })
        .catch(err=>console.error(err))

    },
    destroy: function (req,res) {
        Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect('/movies')
        })
        .catch(err=>console.error(err), res.redirect('/movies'))

    }
}

module.exports = moviesController;