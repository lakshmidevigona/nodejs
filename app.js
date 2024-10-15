const express = require("express");
const nodemon = require("nodemon");
const morgan = require("morgan");
const app = express();

const PORT =3000;
// Middlewares
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 

let students = [
    { name: "Vinitha", rollNo: '5c7' },
    { name: "Poojitha", rollNo: 522 },
    { name: "Lakshmi Devi", rollNo: 552}
];
/**Middle wares End */

app.get('',(req,res)=>{
    res.send(students);
});

app.post("",(req,res)=>{
    let body = req.body;
    if(body!=null && body['name'] && body['rollNo']){
        students.push(body);
        res.status(200).send(body)
    } else {
        res.status(400).send("Invalid Request Body");
    }
});

app.put("/:id",(req,res)=>{
    let rollNo = req.params.id;
    let body = req.body;
    if(rollNo!==null && body['name'] && body['rollNo']){
        let index =(students.findIndex(x=>x.rollNo==rollNo));
        const student = structuredClone(students[index]);
        student['name']=body['name'];
        students.splice(index,1,student);
        res.status(202).send(student)
    } else {
        res.status(400).send("Invalid Body")
    }
});

app.delete("/:id",(req,res)=>{
    let id = req.params.id;
    if(id!==null){
        let index =(students.findIndex(x=>x.rollNo==id));
        const student = structuredClone(students[index]);
         students.splice(index,1);
         res.status(200).send(`Deleted the reocrd by ${id}`)
    } else {
        res.status(500).send("Invalid id")
    }
})

app.listen(PORT,()=>{
    console.log(`Server is listening on Port no ${PORT} -> http://localhost:${PORT}`)
})