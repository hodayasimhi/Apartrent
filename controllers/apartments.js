const apartment  = require('../Data/apartment');
const mongoose = require('mongoose');
const mongodb = require('../connectMoDB');
var ConnectMD= mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions);

const fetch = require('node-fetch');
let url1 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='
let url2='&types=geocode&language=fr&'
let key = 'key=AIzaSyAwSPV4foS-hiuzLV-vPLArQMBWHUJDhdU&sessiontoken=1234567890'
let Arr=[];

function checkInput(input) {
  if(!(input === null ))
  {
    return (true)
  }
    console.log("fill the review")
    return (false)
}


//function
exports.ctrlApartments = {
    //view all Apartments in system apartment
    getAllApartments(req, res, next) {
        ConnectMD.then(async() => {
          const result = await apartment.find({})
          if(result) res.json(result)
          else res.status(404).send('not found')
          })
          .catch(err => { 
          console.error('some error occurred', err)
          res.status(500).send(err.message)
          });},
      
    //Information on an apartment      
    infoApartment(req, res, next) {
            mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
              .then(async() => {
              const {id = null} = req.params;
              const result = await apartment.findOne({_id:id});
              if(!checkInput(id))
                res.status(400).send(err.message);
              if(result) res.json(result)
              else res.status(404).send(`${id} has not been found`);
              })
              .catch(err => {
              console.error('some error occurred', err);
              res.status(500).send(err.message);
              })},

    addApartment(req,res,next){
                ConnectMD.then(async() => {
                const{
                    idlandLord = null,
                    coordinate=null,
                    numberOfRooms=null,
                    isFurnished=null,
                    numOfParking=null,
                }= req.body
                const Apartment = new apartment({idlandLord,coordinate,numberOfRooms,isFurnished,numOfParking})
                const result = await Apartment.save()    
                if(result) res.json(result)
                else res.status(404).send(`not found`);
              })},
     //for landlord         
    editApartment(req,res,next){
            ConnectMD.then(async() => {
              const {idApartment = null} = req.params;
                if(!checkInput(id))
                  res.status(400).send(err.message);
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
              //remove apartment from system (DB)
        removeApartment(req, res, next) {
                mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions)
                .then(async () => {
                const { id = null } = req.body
                if(!checkInput(id))
                  res.status(400).send(err.message);
                const result = await apartment.deleteOne({_id : id})
                if (result) res.json(result)
                else res.status(404).send('not found')
                })
                .catch(err => {
                console.error('some error occurred', err)
                res.status(500).send(err.message)
                })
                },
            searchLocation(req, res, next) {
                ConnectMD.then(async() => {
                    const {location= null} = req.params;
                    let URL=url1;
                    URL+=location;
                    URL+=url2;
                    URL+=key;
                    fetch(URL)
                    .then(res => res.json())
                    .then(json => {json.forEach(function(json){Arr.push(json.predictions.description)})});
                    if(result) res.json(result)
                        else res.status(404).send('not found')
                })
                      .catch(err => { 
                      console.error('some error occurred', err)
                      res.status(500).send(err.message)
                      });}


}