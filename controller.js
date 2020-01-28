//Object
const Users  = require('./Data/User');
const apartment  = require('./Data/apartment');
const order  = require('./Data/order');
const message  = require('./Data/message');
const Comment = require('./Data/comment');
const notice = require('./Data/notice');


const mongoose = require('mongoose');
const mongodb = require('./connectMoDB');
//Google maps
var ConnectMD= mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions);
const fetch = require('node-fetch');
let url1 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='
let url2='&types=geocode&language=fr&'
let key = 'key=AIzaSyAwSPV4foS-hiuzLV-vPLArQMBWHUJDhdU&sessiontoken=1234567890'
let Arr=[];

function checkInput(input){
  if(input==null||input=='')
    return false;
  return true;

}

//function
exports.ctrl = {

  //Views
    //view all Users
    getAllUsers(req, res, next) {
      ConnectMD.then(async() => {
        const result = await Users.find({})
        if(result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => { 
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      });}, 
    //view all Apartments  
    getAllApartment(req, res, next) {
    ConnectMD.then(async() => {
      const result = await apartment.find({})
      if(result) res.json(result)
      else res.status(404).send('not found')
      })
      .catch(err => { 
      console.error('some error occurred', err)
      res.status(500).send(err.message)
      });},
    

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

    //view all message
    getAllMessage(req, res, next) {
      ConnectMD.then(async() => {
      const result = await message.find({})
      if(result) res.json(result)
      else res.status(404).send('not found')
      })
      .catch(err => { 
      console.error('some error occurred', err)
      res.status(500).send(err.message)
      });},

    //view all comment
    getAllComment(req, res, next) {
      ConnectMD.then(async() => {
      const result = await Comment.find({})
      if(result) res.json(result)
      else res.status(404).send('not found')
      })
      .catch(err => { 
      console.error('some error occurred', err)
      res.status(500).send(err.message)
      });},
       //view all notice For Bord
    getAllNoticet(req, res, next) {
      ConnectMD.then(async() => {
      const result = await notice.find({})
      if(result) res.json(result)
      else res.status(404).send('not found')
      })
      .catch(err => { 
      console.error('some error occurred', err)
      res.status(500).send(err.message)
      });},
    //Orders History
    getOrdersHistoryUser(req, res, next) {
      ConnectMD.then(async() => {
        const {id = null} = req.params;
        if(!checkInput(id))
          console.log()
        const result = await apartment.find({idlandLord:id});
        if(result) res.json(result)
        else res.status(404).send(`empty for ${id}`);
      })
      .catch(err => {
        console.error('some error occurred', err);
        res.status(500).send(err.message);
      })},
    Inbox(req, res, next) {
      ConnectMD.then(async() => {
        const {id = null} = req.params;
        const result = await message.find({ toUser:id});
          if(result) res.json(result)
          else res.status(404).send(`empty`);
        })
        .catch(err => {
          console.error('some error occurred', err);
          res.status(500).send(err.message);
        })
      },
    Outbox(req, res, next) {
        ConnectMD.then(async() => {
          const {id = null} = req.params;
          const result = await message.find({fromUser:id});
          if(result) res.json(result)
          else res.status(404).send(`empty`);
        })
        .catch(err => {
          console.error('some error occurred', err);
          res.status(500).send(err.message);
        })},
    sendMessage(req,res,next){
      ConnectMD.then(async() => {
          const{
            fromUser = null,
            theMessage=null,
            toUser=null,
            messageDate=null,
            }= req.body
            const Message = new message({fromUser,theMessage,toUser,messageDate})
            const result = await Message.save()    
            if(result) res.json(result)
            else res.status(404).send(`not found`);
          })},
    ApartmentReviews(req, res, next) {
      ConnectMD.then(async() => {
        const {id = null} = req.params;
        const result = await Comment.find({idUApartment:id});
        if(result) res.json(result)
        else res.status(404).send(`empty`);
        })
        .catch(err => {
        console.error('some error occurred', err);
        res.status(500).send(err.message);
        })},
    addComment(req,res,next){
      ConnectMD.then(async() => {
        const{
            idUser = null,
            idUApartment=null,
            theComment=null,
            commentDate=null,
            }= req.body
            const comment = new Comment({idUser,idUApartment,theComment,commentDate})
            const result = await comment.save()    
            if(result) res.json(result)
            else res.status(404).send(`not found`);
            })},
      ApartmentToPublish(req, res, next) {
        mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
          .then(async() => {
          const {id = null} = req.params;
          const result = await apartment.findOne({idApartment:id});
          if(result) res.json(result)
          else res.status(404).send(`Deliver ${id} has not been found`);
          })
          .catch(err => {
          console.error('some error occurred', err);
          res.status(500).send(err.message);
          })},
      editApartment(req,res,next){
        ConnectMD.then(async() => {
          const {idApartment = null} = req.params;
          const {isFurnished = null} = req.body;
          const {numOfParking = null} = req.body;
          const {numberOfRooms = null} = req.body;
          const result = await apartment.updateOne({idApartment},{isFurnished},{numOfParking},{numberOfRooms})
                      
          if(result) res.json(result)
          else res.status(404).send(`Deliver ${id} has not been found`);
          })
          .catch(err => {
          console.error("Some error occured", err);
          res.status(500).send(err);
          })
          },
      finishOrder(req,res,next){
        ConnectMD.then(async() => {
        const{
          idOrder = null,
          idApartment=null,
          totalPrice=null,
          orderDate=null,
          checkIn=null,
          checkOut=null,
        }= req.body
        const Order = new order({idOrder,idApartment,totalPrice,orderDate,checkIn,checkOut})
        const result = await Order.save()    
        if(result) res.json(result)
        else res.status(404).send(`not found`);
      })},
      cancelOrder(req, res, next) {
        ConnectMD.then(async () => {
        const { id = null } = req.body
        // Query goes here
        const result = await order.deleteOne({idOrder:id})
        if (result) res.json(result)
        else res.status(404).send('not found')
        })
        .catch(err => {
        console.error('some error occurred', err)
        res.status(500).send(err.message)
        })},
        removeApartment(req, res, next) {
          mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
          .then(async () => {
          const { id = null } = req.body
          // Query goes here
          const result = await apartment.deleteOne({idApartment : id})
          if (result) res.json(result)
          else res.status(404).send('not found')
          })
          .catch(err => {
          console.error('some error occurred', err)
          res.status(500).send(err.message)
          })
          },
          //search
          /*
          searchLocation(req, res, next) {
            ConnectMD.then(async() => {
            const {location= null} = req.params;
            let places =[];
            let URL=url1;
            URL+=location;
            URL+=url2;
            URL+=key;
            fetch(URL)
            .then(res => res.json())
            .then(json => {for (let i=0; i<2; i++) {
              places.push(json.predictions[i].description);}
            console.log(places);
            if(places) res.json(places)
              else res.status(404).send(`empty`);
            })
              
            })
            .catch(err => {
              console.error('some error occurred', err);
              res.status(500).send(err.message);
            })}
            */
           searchLocation(req, res, next) {
            ConnectMD.then(async() => {
            let places =[];
            let URL='https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Israel&types=geocode&language=fr&key=AIzaSyAwSPV4foS-hiuzLV-vPLArQMBWHUJDhdU&sessiontoken=1234567890AIzaSyAwSPV4foS-hiuzLV-vPLArQMBWHUJDhdU&sessiontoken=1234567890';
            //URL+=location;
            fetch(URL)
            .then(res => res.json())
            .then(json => {for (let i=0; i<3; i++) {
              places.push(json.predictions[i].description);}
              console.log(json.predictions.length);
            console.log(places);
            if(places) res.json(places)
              else res.status(404).send(`empty`);
            })
              
            })
            .catch(err => {
              console.error('some error occurred', err);
              res.status(500).send(err.message);
            })}
      
  };
  
  