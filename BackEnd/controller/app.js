// ====================== Imports ======================
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// env variables
require('dotenv').config();

// bcrypt

// ------------------ model ------------------
const Exp = require('../model/experience');
const Skill = require('../model/skills');
const Project = require('../model/projects');
// const { json } = require('body-parser');

const currentUrl = 'http://localhost:5000';

// MF function
/**
 * prints useful debugging information about an endpoint we are going to service
 *
 * @param {object} req
 *   request object
 *
 * @param {object} res
 *   response object
 *
 * @param {function} next
 *   reference to the next function to call
 */

// ====================== MiddleWare Functions ======================
function printDebugInfo(req, res, next) {
  console.log();
  console.log('-----------------[Debug Info]----------------');
  // console.log(`Servicing ${urlPattern} ..`);
  console.log(`Servicing ${req.url}..`);

  console.log(`> req.params:${JSON.stringify(req.params)}`);
  console.log(`> req.body:${JSON.stringify(req.body)}`);
  // console.log("> req.myOwnDebugInfo:" + JSON.stringify(req.myOwnDebugInfo));

  console.log('---------------[Debug Info Ends]----------------');
  console.log();

  next();
}

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// MF Configurations
app.use(urlEncodedParser);
app.use(jsonParser);

app.options('*', cors());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('HelloWorld');
});

app.get('/exps', (req, res) => {
    Exp.getAllExp((err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/exp/:id', (req, res) => {
    const expId = req.params.id;

    Exp.getAExp(expId, (err, result) => {
        if (!err) {
            res.status(200).send(result[0]);
        } else {
            console.log(err);
        }
    });
});

app.get('/skills', (req, res) => {
    Skill.getAllSkills((err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/projects', (req, res) => {
    Project.getAllProjects((err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/project/:id', (req, res) => {
    const projId = req.params.id;

    Project.getProject(projId, (err, result) => {
        if (!err) {
            res.status(200).send(result[0]);
        } else {
            console.log(err);
        }
    });
});

module.exports = app;