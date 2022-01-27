let express = require('express');
let bodyParser = require('body-parser');
let app = express();
// let apiRoutes = require("./api-routes");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.raw());
const { MongoClient } = require("mongodb");
app.use(bodyParser.json());

const url = "mongodb+srv://ashish:ashisharora@cluster0.r89am.mongodb.net/BloodPressureAnalysis?retryWrites=true&w=majority"
const client = new MongoClient(url);

let db;
client.connect(async function (err) {
    console.log("Connected correctly to server");
    db = client.db("BloodPressureAnalysis")
    const col = db.collection("data")
    // const data = await col.find({}).toArray();
    // console.log(data)
    // client.close();
});


var port = process.env.PORT || 5000;
app.get('/get-data', async function (req, res) {
    const col = db.collection("data");
    const data = await col.find({}).toArray();
    console.log(data)
    res.json({
        status: true,
        result: data
    })
});

app.post('/add-data', async function (req, res) {
    const col = db.collection("data");
    console.log(req.body.data);
    console.log(req.body.date);
    col.insertOne(
        {
            "date": req.body.date,
            "BloodPressure": req.body.data
        }
    )
    res.json({
        status: true,
        message: "Insert Successfully"
    })
});



app.listen(port, function () {
    console.log("Running RestHub on port " + port);

});




// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));
// const { MongoClient } = require("mongodb");

// const url = "mongodb+srv://ashish:ashisharora@cluster0.r89am.mongodb.net/BloodPressureAnalysis?retryWrites=true&w=majority"

// // create client so we connec to database
/// const client = new MongoClient(url);
// let db;
// // run function is used to connect with collection of database to read the data from database

// // call the run function
// run().catch(console.dir);




// app.route("/get-data").get(async function (req, res) {

//     db
//         .collection("data")
//         .find({})
//         .toArray(function (err, result) {
//             if (err) {
//                 res.status(400).send("Error fetching listings!");
//             } else {
//                 res.json({ status: true, data: result });
//             }
//         });
// });

// // const MongoClient = require("mongodb").MongoClient;
// // const ObjectId = require("mongodb").ObjectID;
// // app.use(BodyParser.json());
// app.listen(5000, () => {
//     console.log("Hello World 5000!");
// });


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://ashish:<ashisharora>@cluster0.r89am.mongodb.net/BloodPressureAnalysis?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(async function (err) {
//     console.log("Connected !!");
//     const collection = client.db("BloodPressureAnalysis").collection("data");
//     const filteredDocs = await collection.find({}).toArray();
//     console.log('Found documents filtered by { a: 3 } =>', filteredDocs);// perform actions on the collection object
//     client.close();
// });
