// Dependencies

const http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var data = require("./ratings.json");


app.use("/libraries", express.static(__dirname + '/libraries'));
app.use("/similarity.js", express.static(__dirname + '/similarity.js'));
app.use("/script-auto-recommender.js", express.static(__dirname + '/script-auto-recommender.js'));


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log("I am in get");
   	console.log("here is the data", data);
});


// ***** ALL ROUTES *****

app.get('/api/data', function(req, res) {
    console.log("I got a request: ", req);
    res.send(data);
});

// ***** ALL ROUTES *****


// // Create an instance of the http server to handle HTTP requests
// let app = http.createServer((req, res) => {  
//     // Set a response type of plain text for the response
//     res.writeHead(200, {'Content-Type': 'text/plain'});

//     // Send back a response and end the connection
//     res.end('Hello World!\n');
// });


// Start the server on port 3000
app.listen(3000, '127.0.0.1');  
console.log('Node server running on port 3000');  

// var sketch = require("sketch.js");



// console.log(data);

// function setup(){


// }


// Data Structure

// { info:
//    'Data from https://github.com/arthur-e/Programming-Collective-Intelligence/blob/master/chapter2/recommendations.py',
//   movies:
//    [ 'Lady in the Water',
//      'Snakes on a Plane',
//      'Just My Luck',
//      'Superman Returns',
//      'You, Me and Dupree',
//      'The Night Listener' ],
//   ratings:
//    { 'Lisa Rose':
//       { 'Lady in the Water': 2.5,
//         'Snakes on a Plane': 3.5,
//         'Just My Luck': 3,
//         'Superman Returns': 3.5,
//         'You, Me and Dupree': 2.5,
//         'The Night Listener': 3 },
//      'Gene Seymour':
//       { 'Lady in the Water': 3,
//         'Snakes on a Plane': 3.5,
//         'Just My Luck': 1.5,
//         'Superman Returns': 5,
//         'The Night Listener': 3,
//         'You, Me and Dupree': 3.5 }
//    }
// }
