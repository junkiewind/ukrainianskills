const express = require('express')
const https = require(`https`);
const http = require(`http`);
const fs = require(`fs`);
const os = require("os");
const hostname = os.hostname();
console.log('hostname', hostname)




const app = express()

const {
    spawn
} = require('child_process');

if (hostname === "Alexanders-MacBook-Pro.local") {
    const ssl_key = fs.readFileSync("ssl/key.pem")
    const ssl_cert = fs.readFileSync("ssl/cert.pem")
} else {
    const ssl_key = fs.readFileSync("/etc/letsencrypt/live/klymov.design/privkey.pem")
    const ssl_cert = fs.readFileSync("/etc/letsencrypt/live/klymov.design/cert.pem")
}

// http.createServer(app).listen(80)


https
    .createServer({
        key: ssl_key,
        cert: ssl_cert,
    }, app)
    .listen(443, () => {
        console.log('server is runing at port 443')
    });

app.set("view enjine", "ejs")
// app.use(express.urlencoded({
//     extended: true
// }))
app.use(express.json())
// app.use(express.text())



app.get('/', (req, res) => {
    res.render("index.ejs")
    // res.send(Date())
})

app.get('/data', (req, res) => {
    const python = spawn('python3', ['python/datanalysis.py']);
    // console.log(python)
    // collect data from script
    // res.type('json');
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');

        dataToSend = data.toString();
        //   dataToSend = JSON.parse(dataToSend);

    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        // console.log('dataToSend', dataToSend)
        res.send(dataToSend);
    });

})

app.post('/skills', (req, res) => {
    const skills = req.body;

    // console.log(`${skills.skillsInput}, ${skills.username}, ${skills.usermail}, ${skills.usercity}`)
    const python = spawn('python3', ['python/userinput.py', skills.skillsInput, skills.username, skills.usermail, skills.usercity])
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
    })
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(JSON.stringify(skills))
    })
});

app.use(express.static("public"))



// const port = 80
// app.listen(port, () => {
//     console.log(`Experss in running on port  ${port}`)
// })