const Comment = require('../Data/comment');
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
exports.ctrlComments = {
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

    //comments abuot apartment
    ApartmentReviews(req, res, next) {
         ConnectMD.then(async() => {
            const {id = null} = req.params;
            if(!checkInput(id))
              res.status(400).send(err.message);
                
            const result = await Comment.find({_id:id});
            if(result) res.json(result)
              else res.status(400).send(`empty`);
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
                  commentDate=dataNow,
                  }= req.body
                  const comment = new Comment({idUser,idUApartment,theComment,commentDate})
                  const result = await comment.save()    
                  if(result) res.json(result)
                  else res.status(404).send(`not found`);
                  })},
    removeComment(req, res, next) {
            ConnectMD.then(async () => {
                const { id = null } = req.body
                const result = await Comment.deleteOne({_id : id})
                if (result) res.json(result)
                        else res.status(404).send('not found')
                })
                .catch(err => {
                console.error('some error occurred', err)
                res.status(500).send(err.message)
                })
                }







}