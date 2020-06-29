const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const users=require('./routes/users');
const customers=require('./routes/customers');
const app=express();

const port=process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

require('./middleware/passport')(passport);

//DB config
const db=require('./config/keys').mongoURI;

//MongoDB connect
mongoose
.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>console.log('MongoDB connected'))
.catch((err)=> console.log(err));


//use routes
app.use('/api/users', users);
app.use('/api/customers', customers);

app.listen(port, ()=>{
	console.log('server is running on port: '+port);
})
