const {Schema,model} = require('mongoose');

const messageSchema = new Schema({
    fromUser: {type:String, required:true},
    theMessage: {type:String, required:true},
    toUser: {type: String, required:true},
    messageDate: {type:Date, require: true}

}, {
    collection: 'message'
});

const Message = model('Message', messageSchema);

module.exports = Message;