const app = require('./app');
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

// Handling uncaught Exception
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server`)

    process.exit(1)
})


dotenv.config({path:'backend/config/config.env'});
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`)
})


//Unhandled Promise Rejection
process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})
