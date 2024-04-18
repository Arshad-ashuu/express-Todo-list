const express = require("express")//importing express
const app = express();//using express as app everytime we need
//server port 3000
const PORT = 3000;
//middle ware
const bodyParser = require("body-parser"); //to read body 
const uuid = require("uuid")  //for unique id used to generate a new id for new todo
app.use(bodyParser.json())
//todo list with to lists/objects
const todos =[
  {
    id:1,
    desc:"code daily",
    completed:false
  },
  {
    id:2,
    desc:"Mern daily",
    completed:false
  }
]
//route to home page '/'
app.get('/',(req,res)=>{
  res.send("<h1>Todo List</h1>")
})
//route to get all list of todos 
app.get('/todos',(req,res)=>{
  res.json(todos)
})
//route to get a single todo based on id
app.get('/todos/:id',(req,res)=>{
  console.log(req.params.id);
  const todo = todos.filter((todo)=>todo.id == req.params.id)
  res.json(todo)
})
//route to add new todo 
app.post('/todos',(req,res)=>{
  let body = req.body;//accessing body
  console.log(body)
  todos.push({id:uuid.v4(),...body})//push new todo with unique id and the rest of body 
  res.json(todos)
})
//route to edit a todo based on id
app.put('/todos/:id',(req,res)=>{
  let todo = todos.find(todo =>todo.id == req.params.id)//using find method to match a id with req.params.id
  if(todo){ //if the id matches the req.body.id 
    todo.desc = req.body.desc //chnage the desc to new desc 
    todo.completed = req.body.completed //change status of completed to new status
    res.json([todos]) //send that todo 
  }
  else{ //else raise an error
    res.send("Todo with given dosen't exist")
  }
  
})
//route to delete a todo
app.delete('/todos/:id',(req,res)=>{
  let index = todos.findIndex(todo=>todo.id==req.params.id) //find index to match the index and req.params.id
  todos.splice(index,1) //using splice to remove that id 
  res.json(todos)
})
app.listen(PORT,()=>{ //listening to port at 3000
  console.log(`server running on ${PORT}`);
})