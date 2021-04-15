var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var firebase = require('firebase');
var admin = require("firebase-admin");
var emails = require("./emails")
var message = require('./message')
const fs = require('fs');

require('dotenv').config()

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    pool: true,
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
var message = message.message;
firebase.initializeApp(firebaseConfig);
var usersList = [];

sendEmailNow()
async function sendEmailNow() {
//  var   emailUser = emails.emailList 
  // for(var i = 0; i < emailUser.length; i++) {
   
  //   setTimeout(function () {  console.log("Timeout")  }, 3000);
  //   console.log(emailUser[i])
  // }
  var   emailUser = emails.emailList 

//   waka.raymund@gmail.com
//   chilaulechilax@gmail.com
//  caznuvunga@gmail.com
// sisjunior33@gmail.com
// AGOSTINHODOSSANTOS27@gmail.com
// almirando.quive@gmail.com
// 


  //var  emailUser = ['almirando.quive@gmail.com', 'Elcidiadabala@gmail.com', 'AGOSTINHODOSSANTOS27@gmail.com','sisjunior33@gmail.com', 'caznuvunga@gmail.com', 'waka.raymund@gmail.com', 'messiasmanhica17@gmail.com' ];


  // var i = 0
  // setInterval(()=>{
  //   i++
  //   if(i < emailUser.length)
  //   sendEmail(message,  emailUser[i])
  // },1500);

  emailUser.forEach((value) => {
    sendEmail(message,  value)
  })
 

  // emailUser.forEach(async(value) => {

  //    var status = await sendEmail(message,  value)
    
  // })

}

async function sucessLog(email) {
  fs.appendFileSync('sucess.txt', email+"\n");
}

async function errorLog(email) {
  fs.appendFileSync('error.txt', '"'+email+'"'+","+"\n");
}



// async function getAllUser() {
//  await firebase.database().ref("users").on("value", data => {
        
//         var dataValue = data.val()
       

//         for(var item in dataValue) {

//         firebase.database().ref("users/"+item).on("value", data => { 
            
//             sendEmail(message, data.val().email)
//           })
          
//         }
       
  

//       }, errorObject => {
//         console.log(errorObject.code);
//     });
    
// }

// sendEmail("message", "agostinhodossantos27@gmail.com")
async function sendEmail(message, email) {
 
 var mailOptions = {
    from: 'contacto@onemediamoz.com',
    to: email,
    subject: 'Educa Moçambique',
    html: message
  };
  
 transporter.sendMail(mailOptions, function(error, info){
    if (error) {

      console.log(error)
      errorLog(email)
    
      return false
    } else {
      console.log("Sucess: "+ email)
      sucessLog(email)
      return true
      
    }
   
  });

}
