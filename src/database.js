const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI, {})
    .then(db => {
        console.log('Database is connected');
    })
    .catch(err => console.log(err));


// async function start() {
//     try {
//         await mongoose.connect(mongodb.URI, {});
//         console.log('Succeed');
//     } catch (err) {
//         console.log(err)
//     }

// }
// start();