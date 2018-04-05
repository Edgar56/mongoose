const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
    .once('open', () => console.log('Connected'))
    .on('error', (err) => {
        console.log('could not connect', err);
    });

app.get('/', (req, res) => {
    res.send('ROOT');
});

app.post('/users', (req, res) => {

    const newUser = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive
    });

    newUser.save().then(savedUser => {

        res.send('USER SAVED BY ME')
    }).catch(err => {
        res.status(404).send('User not save because...');
    });

});
app.get('/users', (req, res) => {

    User.find({}).then(users => {

        res.status(200).send(users);

    });

});

//Patch

// app.patch('/users/:id', (req,res)=>{
//
//     const id = req.params.id;
//
//     const firstName = req.body.firstName;
//
//     User.findByIdAndUpdate(id, {$set: {firstName: firstName }},{new:true}).then(saveUser=>{
//        res.send('USER SAVE BY PATCH AGAIN');
//     });
//
// });

//PUT

// app.put('/users/:id', (req,res)=>{
//
//     const id = req.params.id;
//
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//
//     User.findByIdAndUpdate(id, {$set: {firstName: firstName, lastName:lastName }},{new:true}).then(saveUser=>{
//         res.send('USER SAVE BY PATCH AGAIN');
//     });
//
// });

//Second put example

// app.put('/users/:id', (req,res)=>{
//
//     User.findOne({_id:req.params.id}).then(user=>{
//         user.firstName = req.body.firstName;
//         user.lastName = req.body.lastName;
//         user.save().then(userSaved=>{
//             res.send(userSaved);
//         })
//     });
//
// });


// First Delete data example
//
// app.delete('/users/:id', (req,res)=>{
//
//     User.findOne({_id:req.params.id}).then(user=>{
//        user.remove().then(userRemoved=>{
//            res.send('USER REMOVE' + userRemoved);
//        });
//
//     });
//
// });

// Second Delete data example

// app.delete('/users/:id', (req, res) => {
//
//     User.findByIdAndRemove(req.params.id).then(userRemoved => {
//         res.send(`User ${userRemoved.firstName} removed`);
//
//     });
//
// });

//Third delete data example

app.delete('/users/:id', (req, res) => {

    User.remove({_id:req.params.id}).then(userRemoved => {
        res.send(`User ${userRemoved.firstName} removed`);

    });

});


const port = 4444 || process.env.PORT;

app.listen(port, () => {

    console.log(`Listening on ${port}`);

});