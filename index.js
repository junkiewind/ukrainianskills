const {spawn} = require('child_process');
const express = require('express');
const path = require('path');
const app = express();
// const bodyParser = require('body-parser');
const port = 3000;
var cors = require('cors');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 
app.use(express.static('public/fonts/')); 
var corsOptions = {
 origin: '*',
 optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
 setHeaders: function (res, path, stat) {
  res.set('x-allowed-origin', Date.now());
  res.set('Access-Control-Allow-Origin', '*');
}
};



app.use(cors(corsOptions));
app.get('/', function(req, res) {
    res.type('html');
    // res.type('json');
    res.sendFile(path.join(__dirname, '/index.html'));
  });
let dataToSend = '';
app.get('/data', function(req, res) {
  const python = spawn('python3', ['python/datanalysis.py']);

    // collect data from script
    res.type('json');
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        //   dataToSend = JSON.parse(dataToSend);

    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
    });
});
//Here we are configuring express to use body-parser as middle-ware.


app.post('/skills', function(req, res) {
  const skills = req.body.skills;
  res.send({
    'result': req.body
  });
  //python processing  -> add skills to csv
  const python = spawn('python3', ['python/userinput.py', skills, req.body.username, req.body.usermail, req.body.usercity]);
    // collect data from script
    // res.type('json');
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        //   dataToSend = JSON.parse(dataToSend);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



