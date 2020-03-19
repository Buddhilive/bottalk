const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const buddhi = require('buddhi-nlp');
let renderer;

function initiateBot(res, req) {
    const dataUrl = 'public/model/model_metadata.json';
    const modelUrl = 'http://' + req.headers.host + '/model/model.json'
    renderer = res;

    buddhi.loadModel(modelUrl, dataUrl, loadStatus);
}

function loadStatus() {
    renderer.render('index');
    console.log('Model Loaded!');
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/answer/:message').get(getAnswer);

function getAnswer(req, res) {
    const botReply = {
        response: buddhi.classify(req.params.message)
    };
    res.json(botReply);
}

app.get('/', function(req, res) {
    //res.render('index');
    initiateBot(res, req);
    console.log(req.headers.host)
});

app.set('view engine', 'ejs');

app.listen(3000, function() {
    console.log('Bot is listening on port 3000!');
});