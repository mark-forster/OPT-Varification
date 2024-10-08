const app =require('./src/app')
require('dotenv').config();
const connectDb= require('./db/connectDb');

connectDb();
app.listen(process.env.PORT,()=>{
    console.log('Server is running on port 8000')  // This will print in the terminal when the server starts
});