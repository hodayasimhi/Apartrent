const Users  = require('../Data/User');
const mongoose = require('mongoose');
const mongodb = require('../connectMoDB');
var ConnectMD= mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions);

function checkInput(input) {
  if(!(input === null ))
  {
    return (true)
  }
    console.log("fill the review")
    return (false)
}

//function
exports.ctrlUsers = {
    //view all Users in system
    
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
        

   
    //view info about user (landlord view about tenant)    
    infoUser(req, res, next) {
        ConnectMD.then(async() => {
           const {id = null} = req.params;
           if(!checkInput(id))
              res.status(400).send(err.message);
            const result = await Users.find({_id:id});
              if(result) res.json(result)
                else res.status(404).send(`empty for ${id}`);
            })
            .catch(err => {
              console.error('some error occurred', err);
              res.status(500).send(err.message);
            })},
    //Delete
    removeUserAccount(req, res, next) {
        ConnectMD.then(async () => {
            const { id = null } = req.body
            const result = await apartment.deleteOne({_id : id})
            if (result) res.json(result)
                else res.status(404).send('not found')
                })
                .catch(err => {
                console.error('some error occurred', err)
                res.status(500).send(err.message)
                })
                },
            logIn(req,res,next){
                  ConnectMD.then(async() => {
                  const {UserName = null} = req.params;
                  const {pass = null} = req.body;
                  if(!checkInput(id))
                   res.status(400).send(err.message);
                  const result = await Users.find({userName:UserName});
                  if(result&result[2]) res.send(`hey ${userName}`)
                  else res.status(404).send(`Wrong`);
                    })
                    .catch(err => {
                    console.error("Some error occured", err);
                    res.status(500).send(err);
                    })
                    }
                


}