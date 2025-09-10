const express = require('express');
const { viewController } = require('../controllers/controllers.js');    
const app = require('../app');

const appRouter = express.Router();

appRouter.get('/', viewController);

module.exports = appRouter;
