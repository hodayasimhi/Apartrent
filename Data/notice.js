const {Schema,model} = require('mongoose');

const noticeSchema = new Schema({
    idApartment: {type:Number, required:true},
    priceForDay: {type:Number, required:true},
    noticeDate: {type:Date, require: true},
    checkIn: {type:Date, require: true},
    checkOut: {type:Date, require: true}
}, {
    collection: 'notice'
});

const Notice = model('Notice', noticeSchema);

module.exports = Notice;