// const { urlencoded } = require("express");
const express = require("express");
const fs = require("fs");
const filePath = "teacher.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//template for reading file
const ReadingFile = (path_file, encod) => {
  return fs.readFileSync(path_file, encod, (err, data) => {
    if (!data) {
      console.log(err);
    } else {
      return data;
    }
  });
};

//template for writing file
const WriterrFile = (path_file, data, encod) => {
  fs.writeFileSync(path_file, data, encod);
};

//random no.
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

// getting the data from the server
app.get("/teachers", (req, res) => {
  const data = ReadingFile(filePath, "utf-8");
  console.log(data);
  res.send("object returned");
  // console.log("object returned");
});

// get the data of particular id
app.get("/teacher/:id", (req, res) => {

  const require_id = req.params["id"];
  // console.log(require_id);
  let data = ReadingFile(filePath, "utf-8");
  data = JSON.parse(data);
  // console.log("data ",data);

  let data2 = [];
  for (i in data) {
    if (data[i].id == require_id) {
      data2.push(data[i]);
    }
    // console.log(data[i].id);
  }

  let result = {
    id: data2[0].id,
    name : data2[0].name,
    department : data2[0].department
  }
  console.log(data2);
  console.log(result);
  res.send(result);
});


// deleting the id from the data
app.delete("/teacher/:id", (req, res) => {
  const require_id = req.params["id"];
  let data = ReadingFile(filePath, "utf-8");
  data = JSON.parse(data);
  console.log(data);
  let data2 = [];
  // console.log("type ",typeof(data));
  // console.log("type ",typeof(data2));
  for (i in data) {
    if (data[i].id != require_id) {
      data2 = JSON.parse(data2);

      data2.push(data[i]);
      // console.log(data2);
    }
    // console.log(data[i].id);
    data2 = JSON.stringify(data2);
    // console.log(data2);
    WriterrFile(filePath, data2, "utf-8");
  }

  res.end();
});

//write data 
let arr_id = [];
app.post("/teacher", (req, res) => {
  let gen_id = getRandomIntInclusive(1, 1000);
  let request_body = req.body;
  console.log(request_body);

  let data2 = ReadingFile(filePath, "utf-8");
  let data = JSON.parse(data2);
  let temp = [];
  let flag = true;
  // while (flag) {
  for (let i in data) {
    temp.push(data[i].id);
  }
  console.log(temp);
  while (flag) {
    let present = temp.find((check_id) => {
      return check_id == gen_id;
    });

    if (present != undefined) {
      gen_id = getRandomIntInclusive(1, 1000);
      console.log("gen_id ",gen_id);
    } else {
      flag = false;
      console.log("present ",present);
    }
  }
request_body["id"] = gen_id;
    data = [...data,request_body];
    // console.log(data);
    data = JSON.stringify(data);

    WriterrFile(filePath,data);
  // }
  res.end();
});


// updating the existing values
app.put("/teacher/:id", (req, res) => {
  let get_id = req.params["id"];
  console.log("get_id", get_id);
  let data2 = ReadingFile(filePath, "utf-8");
  let data = JSON.parse(data2);
  
  let requestBody = req.body;
  console.log("requestBody " , requestBody);
  for(let i of data)
  {
    // console.log("i",i);
    
    console.log(requestBody["name"]);
    console.log(requestBody["dept"]);
    console.log( requestBody["age"]);
    console.log( requestBody["address"]);
    if(i.id == get_id)
    { 
      i.name = requestBody.name;
      i.dept = requestBody.dept;
      i.age = requestBody.age;
      i.address = requestBody.address;
    }
  }

  // console.log(data);
  data = JSON.stringify(data);
  WriterrFile(filePath,data);

  res.end();
});

app.listen(8000, (err) => {
  console.log("Listening to port 8000", err);
});
