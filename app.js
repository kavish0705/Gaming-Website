const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://kavish123:kavish123@cluster0.7x4q2.mongodb.net/pacific?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})
const connectDB = async () => {
    await mongoose.connect(URI, { useUnifiedToplogy: true, useNewUrlParser: true });
    console.log('Db connected!');
}
app.set('view engine', 'ejs');


app.use(express.static("public"));
app.get('/', function (req, res) {

    res.sendFile(__dirname + "/public/login.html")

});
app.post('/login', function (req, res) {
    var user = req.body.username;
    var pass = req.body.pass;
    db.collection('details').findOne({
        username: user,
        password: pass
    })
        .then(resp => {
            console.log(resp);
            if (resp)
                res.redirect('/h1.html');
            else
                res.redirect('/invalid.html');
        })
        .catch(() => {
            res.redirect('/invalid.html');
        });


});

app.post('/signup', function (req, res, next) {
    console.log(req.body);
    var fullname = req.body.name;
    var user = req.body.username;
    var email = req.body.email;
    var number = req.body.number;
    var pass = req.body.pass;
    var data = {
        "name": fullname,
        "username": user,
        "email": email,
        "number": number,
        "password": pass
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted successfully");
        res.redirect('/login.html')
    })
});

app.post('/contact', function (req, res) {
    var fullname = req.body.name;
    var email = req.body.email;
    var sub = req.body.subj;
    var message = req.body.message;
    var data1 = {
        "fullname": fullname,
        "email": email,
        "subject": sub,
        "message": message
    }
    db.collection('contactus').insertOne(data1, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted successfully");
        res.redirect('/h1.html')
    })
});

app.post('/cancel', function (req, res) {
    var fullname = req.body.name;
    var email = req.body.email;
    var sub = req.body.subj;
    var message = req.body.message;
    var data2 = {
        "fullname": fullname,
        "email": email,
        "subject": sub,
        "message": message
    }
    db.collection('cancel').insertOne(data2, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted successfully");
        res.redirect('/h1.html')
    })
});

mongoose.connect('mongodb+srv://kavish123:kavish123@cluster0.7x4q2.mongodb.net/pacific?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connected");
        app.listen(3000, () => {
            console.log("Server is ready!");
        });
    });

/* const arrPC = [];
const time = [];

const cllthis = async () => {
    const pcs = db.collection('pcdetails').find({});
    console.log(pcs);
};

cllthis();

app.post("/pcregistration", function (res, req) {
    const data = req.body;
    console.log(data);
})
app.post("/psregistration", function (res, req) {
    const data = req.body;
}) */