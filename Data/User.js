
const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    idUser: {type:String, required:true},
    name: {type:String, required:true},
    userName: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true},
    phone:{type: String, required:false},
    birthdayDate: {type:Date, require: true},
    joinDate: {type:Date, require: true},
    
}, {
    collection: 'user'
});

const User = model('User', userSchema);

module.exports = User;

