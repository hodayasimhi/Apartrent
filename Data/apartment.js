const {Schema,model} = require('mongoose');

const apartmentSchema = new Schema({
    idlandLord: {type:String, required:true},
    coordinate: {type: String, required:true},
    numberOfRooms: {type: Number, required:true},
    isFurnished: {type: String, required:true},
    numOfParking:{type: Number, required:false},
    price: {type:Number, require: true}
}, {
    collection: 'apartment'
});

const Apartment = model('Apartment', apartmentSchema);

module.exports = Apartment;