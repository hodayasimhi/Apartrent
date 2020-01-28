const message  = require('../Data/message');
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
exports.ctrlMessages = {
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


    Inbox(req, res, next) {
            ConnectMD.then(async() => {
              const {id = null} = req.params;
              if(!checkInput(id))
              res.status(400).send(err.message);
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
                if(!checkInput(id))
                res.status(400).send(err.message);
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
                  messageDate=dateNow
                  }= req.body
                  const Message = new message({fromUser,theMessage,toUser,messageDate})
                  const result = await Message.save()    
                  if(result) res.json(result)
                  else res.status(404).send(`not found`);
                })},
        //Delet from list
        deletMessage(req, res, next) {          
            ConnectMD.then(async () => {
            const { id = null } = req.body
            if(!checkInput(id))
            res.status(400).send(err.message);
            const result = await message.deleteOne({_id : id})
                    if (result) res.json(result)
                    else res.status(404).send('not found')
                    })
                    .catch(err => {
                    console.error('some error occurred', err)
                    res.status(500).send(err.message)
                    })
                    },

                



    
  
}