"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var RecipeModel_1 = require("./model/RecipeModel");
var JobModel_1 = require("./model/JobModel");
var GooglePassport_1 = require("./GooglePassport");
var FacebookPassport_1 = require("./FacebookPassport");
var passport = require('passport');
// Creates and configures an ExpressJS web server.
var App = (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.facebookPassportObj = new FacebookPassport_1["default"]();
        this.googlePassportObj = new GooglePassport_1["default"]();
        this.express = express();
        this.middleware();
        this.routes();
        this.idGenerator = 100;
        this.Recipes = new RecipeModel_1["default"]();
        this.Jobs = new JobModel_1["default"]();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(session({ secret: 'keyboard cat' }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
        router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/myprofile' }));
        router.get('/auth/userdata', this.validateAuth, function (req, res) {
            console.log('user object:' + JSON.stringify(req.user));
            _this.username = JSON.stringify(req.user);
            res.json(req.user);
        });
        /*
        router.use( (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });*/
        router.get('/app/recipe/:recipeID', function (req, res) {
            var id = req.params.recipeID;
            console.log('Query single recipe with id: ' + id);
            _this.Recipes.retrieveRecipeDetails(res, { recipeID: id });
        });
        router.get('/app/recipe/category/:recipeCategory', function (req, res) {
            var category = req.params.recipeCategory;
            console.log('Query single recipe with category: ' + category);
            _this.Recipes.retrieveRecipeDetailsByCategory(res, { recipeCategory: category });
        });
        router.get('/app/recipe/', function (req, res) {
            console.log('Query All Recipes');
            _this.Recipes.retrieveAllRecipes(res);
        });
        router.get('/app/search/:search', function (req, res) {
            var category = req.params.search;
            console.log('Search recipe: ' + category);
            _this.Recipes.searchRecipes(res, category);
        });
        router.post('/app/recipe/', function (req, res) {
            console.log("inside POST request for userPost");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.recipeID = _this.idGenerator;
            console.log("id..." + jsonObj.recipeID);
            _this.Recipes.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send({ message: 'Recipe created!' });
            _this.idGenerator++;
        });
        router.get('/app/job/:jobID', function (req, res) {
            var id = req.params.jobID;
            console.log('Query single recipe with id: ' + id);
            _this.Jobs.retrieveJobDetails(res, { jobID: id });
        });
        router.get('/app/job/', function (req, res) {
            console.log('Query All jobs');
            _this.Jobs.retrieveAllJobs(res);
        });
        router.post('/app/job/', function (req, res) {
            console.log("inside POST request for job post");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.jobID = _this.idGenerator;
            _this.Jobs.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('job creation failed');
                }
            });
            res.send({ message: 'job created!' });
            _this.idGenerator++;
        });
        router.get('/app/recipe/user/:recipeOwner', function (req, res) {
            var userId = req.params.recipeOwner;
            console.log('Query single recipe with name: ' + userId);
            _this.Recipes.retrieveRecipeDetailsByUser(res, { recipeOwner: userId });
        });
        router.get('*', function (req, res) {
            res.sendFile(__dirname + '/dist/index.html');
        });
        this.express.use('/app/json/', express.static(__dirname + '/app/json'));
        this.express.use('/images', express.static(__dirname + '/img'));
        this.express.use('/', express.static(__dirname + '/dist'));
        this.express.use('/', router);
    };
    return App;
}());
exports["default"] = new App().express;
