const order  = require('../Data/order');
const Notice  = require('../Data/notice');
const mongoose = require('mongoose');
const mongodb = require('../connectMoDB');
var ConnectMD= mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions);
var dataNow = Date();
var allNotices = [];
function checkInput(input) {
  if(!(input === null ))
  {
    return (true)
  }
    console.log("fill the review")
    return (false)
}

//function
exports.ctrlOrders = {
     //view all Orders
     getAllOrders(req, res, next) {
        ConnectMD.then(async() => {
        const result = await order.find({})
        if(result) res.json(result)
        else res.status(404).send('not found')
        })
        .catch(err => { 
        console.error('some error occurred', err)
        res.status(500).send(err.message)
        }); },

        //After select tenant
        finishOrder(req,res,next){
            ConnectMD.then(async() => {
            const{
              idNotices = null,
              idUser=null,
              totalPrice=null,
              orderDate=dateNow,
              checkIn=null,
              checkOut=null,
            }= req.body
            if(checkOut-checkIn<0)
              res.status(400).send(err.message);
            allNotices=await Notice.findOne({_id:idNotices})
            totalPrice=allNotices[1]*(checkOut-checkIn);
          
            const Order = new order({idNotices,idUser,totalPrice,orderDate,checkIn,checkOut})
            const result = await Order.save()    
            if(result) res.json(result)
            else res.status(404).send(`not found`);
          })},
          cancelOrder(req, res, next) {
            ConnectMD.then(async () => {
            const { id = null } = req.body
            if(!checkInput(id))
              res.status(400).send(err.message);
            const result = await order.deleteOne({_id:id})
            if (result) res.json(result)
            else res.status(404).send('not found')
            })
            .catch(err => {
            console.error('some error occurred', err)
            res.status(500).send(err.message)
            })}
  
}