//setting the API key and the domain name
var api_key = 'e6a7241ecfb3a0d65c363d1d58ce311a-28e9457d-f856ac5c';
var domain = 'sandboxbd479141f79c470db7a138f570f4baae.mailgun.org';
//importing the mailgun module
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
//importing the path module
const path = require('path')
//importing the express module
const express = require('express');
//importing the https module
const https = require('https')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/public/mynew.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css'); // Set the MIME type
    res.sendFile(path.join(__dirname, 'public', 'mynew.css'));
});

const PORT = process.env.PORT || 3000//Setting the port
app.use(express.urlencoded({ extended: true }));

//Code for sending the mail
app.post('/', (req, res) => {
    const to = req.body.email;
    console.log(req.body.last_name);
    console.log("Printing body")
    console.log(req);
    var data = {
        from: 'Jeetasha <arorajeetasha@gmail.com>',
        to: `${to}`,
        subject: 'Welcome Email',
        html: '<h1>Welcome to Deakin community!!<h1><h2>Thankyou for subscribing :)</h2>'
    };
    mailgun.messages().send(data, (err, body) => {
        if (err) {
            console.log("Error !! Error !!")
        }
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})