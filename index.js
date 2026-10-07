const express = require('express');
const app = express()
require('dotenv').config()
const cors = require('cors');
app.use(cors())
const port = process.env.PORT

// mongodb
const { MongoClient, ObjectId }= require('mongodb');

const client = new MongoClient(process.env.DB_URI);

async function connectToMongoDB() {
  try {
    await client.connect();
    // mongodb database
    const db = client.db("mentoradb")
    const coursesCollection = db.collection("courses")

    // get all data
    app.get('/courses', async(req, res)=>{
       const result = await coursesCollection.find().toArray()
       res.send(result)
    })
    //get a single corse
    app.get('/courses/:courseId', async(req, res)=>{
       const courseId = req.params.courseId;
       const query = {_id: new ObjectId(courseId)}
       const result = await coursesCollection.findOne(query)
       res.send(result)
    })






    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB()



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})