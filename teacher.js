// const { Router } = require('express')
const express = require("express");
// const path= require('path')
const fs = require("fs");
const port = 8000;
const teacher= 'TeacherData.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/teachere/:id', (req,res)=>{
    console.log(req.body)
    console.log(req.params)
    res.send("Hi");

})


const read= (filePath, encode)=>{
    return fs.readFileSync(filePath, encode, (err,data) =>{
        if (!data) {
            console.log(err);
      
          } else {
            return data;
          }
    })

}
//get entire data of teachers

app.get("/teachers", (req, res) => {
  // res.sendFile(path.join(__dirname, '../data/TeacherData.js'))
   fs.readFile("TeacherData.js", "utf8", (err, data) => {
    if (!data) {
      console.log(err);
      res.send("Error");

    } else {
    //   return data;
    //   console.log(data);
    //   res.send(data)
    // const data2= JSON.parse(data);
    //  res.send(JSON.stringify(data));
    res.send(data);
    }
});
});

//get data of specified id
app.get('/teacher/:id', (req,res)=>{
    let obj1 = read(teacher , 'utf8')
    console.log(obj1);
    console.log(typeof(obj1));

    obj1=JSON.parse(obj1)
    // res.send(req.params)
    const data= obj1.filter((e)=>{
        if(e.id == req.params["id"]){
            // console.log(e.data)
            // res.send(e.data);
            return e;
        }
    })
    // console.log(data);
    res.send(data);

    // let arr=[];
    // for(i in obj1){
    //     if(obj1[i].id == req.params["id"]){
    //         arr.push(obj1[i]);
    //     }
    // }
    // console.log(arr);
    // res.send('Hi');
})

// module.exports = app

// app.use('/', require(path.join(__dirname, "teacher.js")))

app.listen(port, (err) => {
  console.log(`Example app listening on port ${port}, ${err}`);
});
