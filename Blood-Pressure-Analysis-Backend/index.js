// Entry Point of the API Server

const express = require('express');

/* Creates an Express application.
The express() function is a top-level
function exported by the express module.
*/
const app = express();
// const Pool = require('pg').Pool;

// // const pool = new Pool({
// // 	user: 'postgres',
// // 	host: 'localhost',
// // 	database: 'gfgbackend',
// // 	password: 'postgres',
// // 	dialect: 'postgres',
// // 	port: 5432
// // });


// /* To handle the HTTP Methods Body Parser
// is used, Generally used to extract the
// entire body portion of an incoming
// request stream and exposes it on req.body
// */
// const bodyParser = require('body-parser');
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));


// // pool.connect((err, client, release) => {
// // 	if (err) {
// // 		return console.error(
// // 			'Error acquiring client', err.stack)
// // 	}
// // 	client.query('SELECT NOW()', (err, result) => {
// // 		release()
// // 		if (err) {
// // 			return console.error(
// // 				'Error executing query', err.stack)
// // 		}
// // 		console.log("Connected to Database !")
// // 	})
// // })

// // app.get('/testdata', (req, res, next) => {
// //     console.log("TEST DATA :");
// //     // pool.query('Select * from test')
// //         .then(testData => {
// //         console.log(testData);
// //         res.send(testData.rows);
// //     })
// // })

// // Require the Routes API
// // Create a Server and run it on the port 3000
// const server = app.listen(3000, function () {
//     let host = server.address().address
//     let port = server.address().port
// Starting the Server at the port 3000
// })

// import the library need to use mongodb
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "enter_the_url_here"

// create client so we connec to database
const client = new MongoClient(url);

// run function is used to connect with collection of database to read the data from database
async function run() {
    try {
        // connect with databaee
        await client.connect();
        // print the message that we successfully connected with database
        console.log("Connected correctly to server");
        // load the countryDatabase and store in db variable
        const db = client.db("CountryDatabase")
        // load the collection named as MyData and store in col variable
        const col = db.collection("MyData")
        // use find function to get all the data, then print the data to on console     
        col.find({}).toArray().then((ans) => { console.log(ans) }).catch();
        // find one function used to get only one document or data and print it on console
        const data = await col.findOne()
        console.log(data)

    }
    // if we catch error then print the error on console
    catch (err) {
        console.log(err.stack);
    }
    // at last, we nned to close the client
    finally {
        await client.close();
    }
}
// call the run function
run().catch(console.dir);

const Express = require("express");
const BodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.listen(5000, () => { });