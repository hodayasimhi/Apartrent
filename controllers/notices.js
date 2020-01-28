const notice  = require('../Data/notice');
const mongoose = require('mongoose');
const mongodb = require('../connectMoDB');
var ConnectMD= mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions);
var dataNow = Date();
function checkInput(input) {
  if(!(input === null ))
  {
    return (true)
  }
    console.log("fill the review")
    return (false)
}


//function
exports.ctrlNotice = {
    //view all Apartments  
    getAllNotice(req, res, next) {
        ConnectMD.then(async() => {
          const result = await notice.find({})
          if(result) res.json(result)
          else res.status(404).send('not found')
          })
          .catch(err => { 
          console.error('some error occurred', err)
          res.status(500).send(err.message)
          });},

    addNotice(req,res,next){
            ConnectMD.then(async() => {
            const{
              idApartment = null,
              priceForDay=null,
              noticeDate=null,
              checkIn=null,
              checkOut=null,
            }= req.body
            if(checkOut-checkIn<0)
              res.status(400).send(err.message);
            const Notice = new notice({idOrder,idApartment,priceForDay,noticeDate,checkIn,checkOut})
            const result = await Notice.save()    
            if(result) res.json(result)
            else res.status(404).send(`not found`);
          })},

          noticeToPublish(req, res, next) {
            mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
              .then(async() => {
              const {id = null} = req.params;
              if(!checkInput(id))
                res.status(400).send(err.message);
              const result = await notice.findOne({_id:id});
              if(result) res.json(result)
              else res.status(404).send(`${id} has not been found`);
              })
              .catch(err => {
              console.error('some error occurred', err);
              res.status(500).send(err.message);
              })},

          editNotice(req,res,next){
            ConnectMD.then(async() => {
              const {idNotice = null} = req.params;
              const {idApartment = null} = req.body;
              const {priceForDay = null} = req.body;
              const {checkIn = null} = req.body;
              const {checkOut = null} = req.body;
              const result = await notice.updateOne({idNotice},{idApartment},{priceForDay},{checkIn},{checkOut})
                          
              if(result) res.json(result)
              else res.status(404).send(`${id} has not been found`);
              })
              .catch(err => {
              console.error("Some error occured", err);
              res.status(500).send(err);
              })
              },

              //Busy notice
              removeNotice(req, res, next) {
                mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
                .then(async () => {
                const { id = null } = req.body
                // Query goes here
                const result = await notice.deleteOne({_id : id})
                if (result) res.json(result)
                else res.status(404).send('not found')
                })
                .catch(err => {
                console.error('some error occurred', err)
                res.status(500).send(err.message)
                })
                }


}