
const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const keys=require('../config/keys');


const User=require('../models/User');

const router=express.Router();


router.post('/register',(req,res)=>{
    var errors={}
	User.findOne({ email:req.body.email })
	.then((user)=>{
		if(user){
			errors.email='Email already exits';
			res.status(400).json(errors);
		}else{
			const newUser= new User({
				name    :req.body.name,
				email   :req.body.email,
				password:req.body.password
			})

			bcrypt.genSalt(10, (err,salt)=>{
				bcrypt.hash(newUser.password,salt,(err,hash)=>{
					if(err) throw err;
					newUser.password=hash;
					newUser.save()
					.then((user)=>{
						res.json(user);
					})
					.catch((err)=>{
						console.log(err);
					})
				})

			})
		}
	})
})

router.post('/login', (req, res)=>{
    
    var errors={}
	const email=req.body.email;
	const password=req.body.password;
	User.findOne({email})
	.then(user=>{
		if(!user){
			errors.email='User not found';
			res.status(404).json(errors);
		}

		bcrypt.compare(password, user.password)
		.then(isMatch=>{
			if(isMatch){
				const payload={id:user.id, name:user.name};
				jwt.sign(
					payload, 
					keys.secretOrKey, 
					{ expiresIn:3600 },
					(err,token)=>{
						res.json({
							success:true,
							token:'bearer ' +token
						})
					});
			}else{
				errors.password='Incorrect password';
				res.status(400).json(errors);
			}
		})
	});
});

module.exports=router;
