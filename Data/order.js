const {Schema,model} = require('mongoose');

const orderSchema = new Schema({
    idNotices: {type:Number, required:true},
    idUser: {type:String, required:true},
    totalPrice: {type:Number, required:true},
    orderDate: {type:Date, require: true},
    checkIn: {type:Date, require: true},
    checkOut: {type:Date, require: true}
}, {
    collection: 'order'
});

const Order = model('Order', orderSchema);

module.exports = Order;