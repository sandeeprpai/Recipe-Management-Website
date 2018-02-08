import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import RecipeModel from './model/RecipeModel';
import JobModel from './model/JobModel';

import DataAccess from './DataAccess';
import GooglePassportObj from './GooglePassport';
import FacebookPassportObj from './FacebookPassport';

let passport = require('passport');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public Recipes:RecipeModel;
  public Jobs:JobModel;
  public idGenerator:number;
  public username:string;
  public facebookPassportObj:FacebookPassportObj;
  public googlePassportObj:GooglePassportObj;
  

  //Run configuration methods on the Express instance.
  constructor() {
    this.facebookPassportObj = new FacebookPassportObj();
    this.googlePassportObj = new GooglePassportObj();
    this.express = express();
    this.middleware();
    this.routes();
    this.idGenerator = 100;
    this.Recipes = new RecipeModel();
    this.Jobs = new JobModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(session({ secret: 'keyboard cat' }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }
  
  private validateAuth(req, res, next):void {
    if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
	
	router.get('/auth/facebook', 
        passport.authenticate('facebook', 
            {scope: ['public_profile', 'email'] }
        )
    );

    router.get('/auth/facebook/callback', 
        passport.authenticate('facebook', 
            { failureRedirect: '/', successRedirect: '/myprofile' }
        )
    );
	
	router.get('/auth/userdata', this.validateAuth, (req, res) => {
        console.log('user object:' + JSON.stringify(req.user));
		this.username = JSON.stringify(req.user);
        res.json(req.user);
    });
	/*
	router.use( (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });*/
    
    router.get('/app/recipe/:recipeID', (req, res) => {
        var id = req.params.recipeID;
        console.log('Query single recipe with id: ' + id);
        this.Recipes.retrieveRecipeDetails(res, {recipeID: id});
    });
	
	router.get('/app/recipe/category/:recipeCategory', (req, res) => {
        var category = req.params.recipeCategory;
        console.log('Query single recipe with category: ' + category);
        this.Recipes.retrieveRecipeDetailsByCategory(res, {recipeCategory: category});
    });

    router.get('/app/recipe/', (req, res) => {
        console.log('Query All Recipes');
        this.Recipes.retrieveAllRecipes(res);
    });

    router.get('/app/search/:search', (req, res) => {
        var category = req.params.search;
        console.log('Search recipe: ' + category);
        this.Recipes.searchRecipes(res, category);
    });

    router.post('/app/recipe/', (req, res) => {
        console.log("inside POST request for userPost");
        console.log(req.body);
        var jsonObj = req.body;
        jsonObj.recipeID = this.idGenerator;
		console.log("id..."+jsonObj.recipeID);
        this.Recipes.model.create([jsonObj], (err) => {
            if (err) {
                console.log('object creation failed');
            }
        });
        res.send({ message: 'Recipe created!' });
        this.idGenerator++;
    });
	
	router.get('/app/job/:jobID', (req, res) => {
        var id = req.params.jobID;
        console.log('Query single recipe with id: ' + id);
        this.Jobs.retrieveJobDetails(res, {jobID: id});
    });
	
    router.get('/app/job/', (req, res) => {
        console.log('Query All jobs');
        this.Jobs.retrieveAllJobs(res);
    });

    router.post('/app/job/', (req, res) => {
        console.log("inside POST request for job post");
        console.log(req.body);
        var jsonObj = req.body;
        jsonObj.jobID = this.idGenerator;
        this.Jobs.model.create([jsonObj], (err) => {
            if (err) {
                console.log('job creation failed');
            }
        });
        res.send({ message: 'job created!' });
        this.idGenerator++;
    });

    router.get('/app/recipe/user/:recipeOwner', (req, res) => {
        var userId = req.params.recipeOwner;
        console.log('Query single recipe with name: ' + userId);
        this.Recipes.retrieveRecipeDetailsByUser(res, {recipeOwner: userId});
    });
	
	router.get('*', (req, res) => {
        res.sendFile(__dirname + '/dist/index.html');
    });


    

    this.express.use('/app/json/', express.static(__dirname+'/app/json'));
    this.express.use('/images', express.static(__dirname+'/img'));
    this.express.use('/', express.static(__dirname+'/dist'));
	this.express.use('/', router);

  }

}

export default new App().express;
