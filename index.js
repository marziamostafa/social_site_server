require('dotenv').config()
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()

// const jwt = require('jsonwebtoken');

//middle ware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kkoxxt5.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const allMedia = client.db('socialism').collection('allmedia');

        const comments = client.db('socialism').collection('comments');

        app.get('/allmedia', async (req, res) => {
            const query = {};
            const options = await allMedia.find(query).toArray();
            res.send(options)

        })

        app.get('/allmedia/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const options = await allMedia.find(query).toArray();
            res.send(options)

        })

        app.post('/allmedia', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await allMedia.insertOne(item)
            res.send(result)
        })


        //delete task
        app.get('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await allMedia.findOne(query);
            res.send(result)
        })

        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(id)
            const result = await allMedia.deleteOne(query);
            res.send(result);
        })

        //comments
        app.post('/comments', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await comments.insertOne(item)
            res.send(result)
        })

        app.get('/comments', async (req, res) => {
            const query = {};
            const options = await comments.find(query).toArray();
            res.send(options)

        })


    }
    finally {

    }
}

run().catch(console.log())


app.get('/', (req, res) => {
    res.send('socialism server is running')
})

app.listen(port, () => {
    console.log(`socialism server is running ${port}`)
})