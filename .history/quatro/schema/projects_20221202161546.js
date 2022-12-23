const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
	tittle : {
        type : String,
        default : undefined,
        required : true
    },

	description : {
        type : String,
        default : undefined,
        required : true
    },

    vigency : {
        type : String,
        default : undefined,
        required : true
    },
    status : String,
    members : String,

    coordinator1 : String,
    coordinator2 : String,
    coordinator3 : String,

    scholar1 : String,
    scholar2 : String,
    scholar3 : String,
    scholar4 : String,
    scholar5 : String,
})

module.exports = mongoose.model('projects',projectSchema)