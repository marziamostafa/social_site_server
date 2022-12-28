require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()

// const jwt = require('jsonwebtoken');

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middle ware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('socialism server is running')
})

app.listen(port, () => {
    console.log(`socialism server is running ${port}`)
})