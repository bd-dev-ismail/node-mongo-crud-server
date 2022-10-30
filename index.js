const express = require('express');
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json()); //post request er jonno lagbe!

//username: dbuser2
//password: eBOs7iykNV5SqKgw

const uri =
  "mongodb+srv://dbuser2:eBOs7iykNV5SqKgw@cluster0.nbna82s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
    try{
        const userCollection = client.db('NodeMongoCrud').collection('users');
        
        app.post("/users", async(req, res) => {
          const user = req.body;
          console.log(user);
          const result = await userCollection.insertOne(user);
          console.log(result);
          res.send(result)
        });
    }
    finally{
        //  await client.close();
    }
}
run().catch(error=> console.log(error))



app.get('/', (req, res)=>{
    res.send('Node Mongo Crud Server is Running');
})


app.listen(port , ()=>{
    console.log(`Node Mongo Crud server is running on Port ${port}`);
})