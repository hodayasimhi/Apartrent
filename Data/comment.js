const {Schema,model} = require('mongoose');

const commentSchema = new Schema({
    idUser: {type:String, required:true},
    idUApartment: {type:Number, required:true},
    theComment: {type: String, required:true},
    commentDate: {type: Date, required:true}
}, {
    collection: 'comment'
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;