const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AdminSchema = new Schema({
    email: { type: String },
    name: { type: String },
    password: { type:String }
}, {
    versionKey: false
})
module.exports = mongoose.model('AdminSchema', AdminSchema,'Admins')

