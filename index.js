//Chalenge One - CRUD in  Array

//Setting variables:

const express = require('express'); 
const PORT = 3333
const app = express();
const projects =  []
let NumberOfRequests = 0
app.use(express.json());


// Creating a middleware for check if the ID exist:

function checkid (req, res, next) {
  const { id } = req.params
  for (let i in projects) {
      if(projects[i].id !== id) {
          return res.status(400).json({ message: "Projeto nao existe" })
      }
      return next()
  }
}
//Creating a Global  Middleware for counting the requests:

app.use((req,res, next) =>{
  NumberOfRequests++; 
  console.log(`${NumberOfRequests} requests have been made
  ições`)

return next();
})


  // "C"reate: new projets (by Id and Title)
app.post('/projects', (req, res) =>{
  const {id, title}= req.body;

  projects.push({id, title});

  return res.json(projects);
  
})

  // "R"ead : all the projects
  app.get('/projects', (req, res)=>{
    return res.json(projects);
  })


// Alterar Título pelo o ID do objeto:

  app.put('/projects/:id', checkid, (req, res) =>{
    const {title} = req.body;
    const {id} = req.params;
    const project = projects.find(p => p.id == id);
  
    project.title = title;

    return res.json(projects)

})

// Deletar Projeto pelo ID

  app.delete('/projects/:id', checkid, (req ,res) =>{
  
    const { id } = req.params;
    const myindex = projects.findIndex(p => p.id == id);
  
    projects.splice(myindex, 1);
    
    return res.json(projects);

  })

// Creating Tasks for the projects:
  
  app.post('/projects/:id/tasks', checkid, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;  
    const project = projects.find(p => p.id == id);
  
    project.tasks.push(title);
  
    return res.json(project);
    
  })

// Server 
  app.listen(3333)