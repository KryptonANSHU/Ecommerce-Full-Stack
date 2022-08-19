const mongoose = require('mongoose');


const connectDatabase = ()=>{

    
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log(`MongoDB connected with server`)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDatabase;