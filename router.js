const { Router } = require('express');
const {ctrlUsers} = require('./controllers/Users');
const {ctrlMessages} = require('./controllers/messages');
const {ctrlComments} = require('./controllers/comments');
const {ctrlApartments} = require('./controllers/apartments');
const {ctrlNotice} = require('./controllers/notices');
const {ctrlOrders} = require('./controllers/orders');
const {ctrl} = require('./controller');


const ApartrentRouter = new Router();
//Users
ApartrentRouter.get('/users/all', ctrlUsers.getAllUsers);
ApartrentRouter.get('/users/:id', ctrlUsers.infoUser);
ApartrentRouter.post('/users/remove', ctrlUsers.removeUserAccount);
ApartrentRouter.get('/users/login/:userName', ctrlUsers.logIn);

//Messages
ApartrentRouter.get('/message/all', ctrlMessages.getAllMessage);
ApartrentRouter.get('/message/Inbox/:id', ctrlMessages.Inbox);
ApartrentRouter.get('/message/Outbox/:id', ctrlMessages.Outbox);
ApartrentRouter.post('/message/send', ctrlMessages.sendMessage);
ApartrentRouter.post('/message/remove', ctrlMessages.deletMessage);
//Comments 
ApartrentRouter.get('/comments/all', ctrlComments.getAllComment);
ApartrentRouter.get('/comments/:id', ctrlComments.ApartmentReviews);
ApartrentRouter.post('/comments/new', ctrlComments.addComment);
ApartrentRouter.post('/comments/remove', ctrlComments.removeComment);
//Apartments CRUD
ApartrentRouter.get('/apartments/all', ctrlApartments.getAllApartments);
ApartrentRouter.get('/apartments/:id', ctrlApartments.infoApartment);
ApartrentRouter.put('/apartments/edit/:id', ctrlApartments.editApartment);
ApartrentRouter.post('/apartments/new', ctrlApartments.addApartment);
ApartrentRouter.post('/apartments/remove', ctrlApartments.removeApartment);
//Notice CRUD
ApartrentRouter.get('/notice/all', ctrlNotice.getAllNotice);
ApartrentRouter.get('/notice/:id', ctrlNotice.noticeToPublish);
ApartrentRouter.post('/notice/new', ctrlNotice.addNotice);
ApartrentRouter.put('/notice/edit', ctrlNotice.editNotice);
ApartrentRouter.post('/notice/remove', ctrlNotice.removeNotice);
//Orders
ApartrentRouter.get('/orders/all', ctrlOrders.getAllOrders);
ApartrentRouter.post('/orders/new', ctrlOrders.finishOrder);
ApartrentRouter.post('/orders/cancel', ctrlOrders.cancelOrder);
ApartrentRouter.get('/places/all', ctrl.searchLocation);

module.exports = {
    ApartrentRouter
};