
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const port = 5000


const app = express()
app.use(cors());
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hrwsd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const orders = client.db("agency").collection("orders");
  const services = client.db("agency").collection("services");
  const reviews = client.db("agency").collection("review");
  console.log('success')
  app.post('/addOrders',(req, res) => {
    const newOrders = req.body;
    orders.insertOne(newOrders)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
    
  })
  app.post('/addServices',(req, res) => {
    const newServices = req.body;
    services.insertOne(newServices)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
   
  })
  app.get('/services', (req,res)=>{
    services.find({})
    .toArray((err,documents) =>{
      res.send(documents);
    })
  })

  


  app.post('/addReview',(req, res) => {
    const newReviews = req.body;
    reviews.insertOne(newReviews)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
    
  })

  app.get('/reviews', (req,res)=>{
    reviews.find({})
    .toArray((err,documents) =>{
      res.send(documents);
    })
  })


  
  

  app.get('/orders', (req,res)=>{
    orders.find({email: req.query.email})
    .toArray((err,documents) =>{
      res.send(documents);
    })
  })
  app.get('/ordersforadmin', (req,res)=>{
    orders.find({})
    .toArray((err,documents) =>{
      res.send(documents);
    })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
});



app.listen(process.env.PORT || port)






