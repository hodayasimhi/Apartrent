const Express = require('express');

// var ConnectMD= mongoose.connect(mongodb.mongoDbUrl, mongodb.mongoDbOptions);

//const {ctrl} = require('./controller');
//const logger = require('morgan'); // NOTE: for debugging
const {ApartrentRouter} = require('./router');
const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
//app.use(logger('dev'));


app.all('*', (req, res, next) => {
    console.log("A Client is trying to connect.");
    next();
})

app.use('/Apartrent',ApartrentRouter);

//exception catch
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
   });
   
app.listen(port, () => console.log('Express server is running on port ', port));
