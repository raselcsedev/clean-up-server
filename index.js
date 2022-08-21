const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
// user_rasel
// yIpuQIRS51VkFm5h

//! Warning: Do not use in production
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


const uri = "mongodb+srv://user_rasel:yIpuQIRS51VkFm5h@cluster0.dy5yx99.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const servicesCollection = client.db("cleanUp").collection("service");

      // get-service
      app.get("/service", async (req, res) => {
        const services = await servicesCollection.find({}).toArray();
        console.log(services);
        res.send(services);
      });

      // post-service
      app.post("/service", async (req, res) => {
        const data = req.body;
        const result = await servicesCollection.insertOne(data);
        res.send(result);
      });

      // update-service
      app.put("/service/:id", async (req, res) => {
        const { id } = req.params;
        const data = req.body;
  
        const filter = { _id: ObjectId(id) };
        const updateDoc = { $set: data };
        const option = { upsert: true };
  
        const result = await servicesCollection.updateOne(
          filter,
          updateDoc,
          option
        );
  
        res.send(result);
      });

      // delete-service
      app.delete("/service/:id", async (req, res) => {
        const { id } = req.params;
        const query = { _id: ObjectId(id) };
        const result = await servicesCollection.deleteOne(query);
  
        res.send(result);
      });


      /* app.get("/user/:id", async (req, res) => {
        const id = req.params;

        const services = await servicesCollection.find({}).toArray();
        console.log(services);
        res.send(services);
      }); */
      
      
    } finally {
      
    }
  }
  run().catch(console.dir);


app.get("/", async (req, res) => {
    res.send("Hello");
  });
  
  app.listen(port, () => {
    console.log(`Ami Dowracchi port ${port}`);
  });