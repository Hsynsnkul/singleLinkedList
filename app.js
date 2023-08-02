const express=require('express');


const app=express(); 


app.use(express.static("./public"));

const port = process.env.POST || 3000;

app.listen(port,()=>{
    console.log(`Server is listening port:${port}`);
});