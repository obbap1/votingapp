const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

let serviceAccount = require('./fir-app-d7818-firebase-adminsdk-r1qfy-2a523dfe0e');

let firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-app-d7818.firebaseio.com'
})

let database = firebaseAdmin.database();

const app = express();

app.use(logger('dev'));

//Create authentication middleware
function isAuthenticated(){
    //if i dont want them to see the page that loads after this, i create a middleware to make sure they dont see it 
    next();
}

app.get('/',(req,res)=>{
    let restaurantsRef = database.ref('/restaurants');
    //when we were using on, we are getting an error that the headers are already set.
    restaurantsRef.once('value',(snapshot)=>{
        let data = snapshot.val();
        if(!data){
            data ={};
        }
        res.render('home.ejs',{restaurants: snapshot.val()});
    })
    
})

app.get('/homecoming-queen',isAuthenticated,(req,res)=>{
    res.render('homeComingQueen');
})

//This will give the server access
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/',(req,res)=>{
    let breakfast = req.body.breakfast;
    res.render('results.ejs',{data:breakfast});
})

app.set('view engine','ejs');

app.use(express.static('views'));
app.set('views', __dirname + '/views');


let port = process.env.PORT || 1337;

app.listen(port,()=>{
    console.log('App running on port ' + port);
})