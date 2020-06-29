const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const customerSchema=new Schema({
	name:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	},
	phone:{
		type:String,
		require:true
    },
    gender:{
		type:String,
		require:true
	},
	city:{
		type:String,
		require:true
	},
	dateofBirth:{
		type:String,
		require:true
	},
	date:{
		type:Date,
		default:Date.now
	}
})

module.exports=Customer=mongoose.model('customers', customerSchema);