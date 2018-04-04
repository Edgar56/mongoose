const mongoose = require('mongoose');
const express = require('express');

const User = require ('./models/User');


mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
    .once('open', ()=>console.log('Connected'))
    .on('error', (err)=>{
        console.log('could not connect', err);
    });

const newUser = new User ({

    firstName:'E',
    lastName: 'Chalilov'

});

newUser.save(function (err,dataSaved)
{

    if(err) return console.log(err);

    console.log(dataSaved);


});