var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var firebase = require('firebase');
var admin = require("firebase-admin");
require('dotenv').config()

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user:  process.env.EMAIL,
        pass:  process.env.PASSWORD
    }
}));


//firebase
var serviceAccount = require("./educa-mozambique-firebase-adminsdk-qahz4-c913e1a12b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://educa-mozambique.firebaseio.com"
});

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "educa-mozambique.firebaseapp.com",
    databaseURL: "https://educa-mozambique.firebaseio.com",
    projectId: "educa-mozambique",
    storageBucket: "educa-mozambique.appspot.com",
    messagingSenderId: "812293792882",
    appId: process.env.APP_ID,
    measurementId: "G-29BMBQ8P6Y"
};

firebase.initializeApp(firebaseConfig);
var usersList = [];
getAllUser();
async function getAllUser() {
 await firebase.database().ref("users").on("value", data => {
        usersList.push(data.val());    
      }, errorObject => {
        console.log(errorObject.code);
    });

    for( var i = 0; i < usersList.length() ; i++) {
       sendEmail("That was easy "+i, usersList.email);
    }
    
}

function sendEmail(message, email) {
 
 var mailOptions = {
    from: 'agostinhodossantos27@gmail.com',
    to: email,
    subject: 'Test Sending Email ',
    text: email
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
