// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Data set and code based on
// https://github.com/arthur-e/Programming-Collective-Intelligence/blob/master/chapter2/recommendations.py

// All the data from the JSON file


// Get DATA from server

// // {
//     "info": "Data from https://github.com/arthur-e/Programming-Collective-Intelligence/blob/master/chapter2/recommendations.py",
//     "movies": ["Lady in the Water", "Snakes on a Plane", "Just My Luck", "Superman Returns", "You, Me and Dupree", "The Night Listener"],
//     "ratings": {
//         "Lisa Rose": {
//             "Lady in the Water": 2.5,
//             "Snakes on a Plane": 3.5,
//             "Just My Luck": 3.0,
//             "Superman Returns": 3.5,
//             "You, Me and Dupree": 2.5,
//             "The Night Listener": 3.0
//         },
//         "Gene Seymour": {
//             "Lady in the Water": 3.0,
//             "Snakes on a Plane": 3.5,
//             "Just My Luck": 1.5,
//             "Superman Returns": 5.0,
//             "The Night Listener": 3.0,
//             "You, Me and Dupree": 3.5
//         },
//         "Michael Phillips": {
//             "Lady in the Water": 2.5,
//             "Snakes on a Plane": 3.0,
//             "Superman Returns": 3.5,
//             "The Night Listener": 4.0
//         },
//         "Claudia Puig": {
//             "Snakes on a Plane": 3.5,
//             "Just My Luck": 3.0,
//             "The Night Listener": 4.5,
//             "Superman Returns": 4.0,
//             "You, Me and Dupree": 2.5
//         },
//         "Mick LaSalle": {
//             "Lady in the Water": 3.0,
//             "Snakes on a Plane": 4.0,
//             "Just My Luck": 2.0,
//             "Superman Returns": 3.0,
//             "The Night Listener": 3.0,
//             "You, Me and Dupree": 2.0
//         },
//         "Jack Matthews": {
//             "Lady in the Water": 3.0,
//             "Snakes on a Plane": 4.0,
//             "The Night Listener": 3.0,
//             "Superman Returns": 5.0,
//             "You, Me and Dupree": 3.5
//         },
//         "Toby": {
//             "Snakes on a Plane": 4.5,
//             "You, Me and Dupree": 1.0,
//             "Superman Returns": 4.0
//         }
//     }
// }


var data;

function setup() {
  console.log("i am in set up")
  noCanvas();

  // get data
  $(document).ready(function (){
    $.ajax({
      url: "/api/data",
      type: "GET",
      success: function(result){
        
        // define data with server data

        data = result;

        // create 2 dropdowns with criticNames

        var criticNames = Object.keys(data.ratings);
        console.log(criticNames);

        var dropdown1 = createSelect("");
        var dropdown2 = createSelect("");
        for (var i = 0; i < criticNames.length; i++){
          dropdown1.option(criticNames[i]);
          dropdown2.option(criticNames[i]);
        };

        // work out Euclidean Similarity Score of 2 inputs

        var critic1 = dropdown1.value();
        var critic2 = dropdown2.value();
      // create button that submits scores of selected critic
      // and returns Euclidean difference

        var button = createButton("Submit");
        button.mousePressed(findNearestNeighbour);
      }
    });
  });
};

// returns similarity score of 2 numbers

function euclideanSimilarity(data, name1, name2){
        
  // iterate array of movie names of critic1
  var moviesList = data.movies;
  var scoreCritic1;
  var scoreCritic2;
  var movieToCompare;
  var diff;

  var sumSquareDiff = 0;

  for (var i = 0; i < moviesList.length; i++){  
    movieToCompare = moviesList[i];
    scoreCritic1 = data.ratings[name1][movieToCompare];
    scoreCritic2 = data.ratings[name2][movieToCompare];
    diff = scoreCritic1 - scoreCritic2;
    console.log("movie + diff", movieToCompare, diff)
    if (isNaN(diff)) {
      console.log("not a number")
    } else {
      sumSquareDiff += diff * diff;
    }
  }
  var dist = 1 / (1+ sqrt(sumSquareDiff));
  return dist;
};


// for given input critic name, find all 





// module.exports = {

//   var data;
//   // Movie ratings by person
//   var ratings;
//   // A list of all the movies
//   var allMovies;


//   // Preload all the data
//   // function preload() {
//   //   data = loadJSON('ratings.json');
//   // }

//   function preload(){
//      // var nytg = nytg || {};
//      $.getJSON("ratings.json", function(data) {
//       data = data
//       console.log(data)
//      })
//    }


//   preload();

//   console.log("data: ", data);





//   // function setup() {
//   //   noCanvas();

//   //   // Get the bits out of the data we want
//   //   ratings = data.ratings;
//   //   allMovies = data.movies;

//   //   // This generates an interface for a user to rate some movies
//   //   var dropdowns = [];
//   //   for (var i = 0; i < allMovies.length; i++) {
//   //     // Make a DIV for each movie
//   //     var div = createDiv(allMovies[i] + ' ');
//   //     div.style('padding','4px 0px');
//   //     div.parent('#interface');
//   //     // Create a dropdown menu for each movie
//   //     var dropdown = createSelect();
//   //     dropdown.option('not seen');
//   //     // 1 to 5 stars
//   //     for (var stars = 1; stars < 6; stars++) {
//   //       dropdown.option(stars);
//   //     }
//   //     dropdown.parent(div);
//   //     // Connect the dropdown with the movie title
//   //     dropdown.movie = allMovies[i];
//   //     dropdowns.push(dropdown);
//   //   }


//   //   // This is a submit button
//   //   var submit = createButton('submit');
//   //   submit.parent('#interface');
//   //   submit.style('margin','4px 0px');
//   //   submit.style('padding','4px');

//   //   // When the button is clicked
//   //   submit.mousePressed(function() {
//   //     // Make a new user
//   //     var user = {};
//   //     // Attach all the ratings
//   //     for (var i = 0; i < dropdowns.length; i++) {
//   //       var value = dropdowns[i].value();
//   //       if (value != 'not seen') {
//   //         var movie = dropdowns[i].movie;
//   //         // Make sure they are numbers!
//   //         user[movie] = Number(value);
//   //       }
//   //     }
//   //     // Put it in the data
//   //     ratings['user'] = user;
//   //     // Call the get Recommendations function!
//   //     // We can use either "euclidean" distance or "pearson" score
//   //     getRecommendations('user', euclidean);
//   //   });
//   // }

//   // // A function to get recommendations
//   // function getRecommendations(person, similarity) {

//   //   // Clear the div
//   //   select("#results").html('');

//   //   // This will be the object to store recommendations
//   //   var recommendations = {};

//   //   // Let's get all the people in the database
//   //   var people = Object.keys(ratings);

//   //   // For every person
//   //   for (var i = 0; i < people.length; i++) {
//   //     var other = people[i];

//   //     // Don't use yourself for a recommendation!
//   //     if (other != person) {
//   //       // Get the similarity score
//   //       var sim = similarity(person, other);
//   //       // If it's 0 or less ignore!
//   //       if (sim <= 0) continue;
//   //       // What movies did the other person rate?
//   //       var movies = Object.keys(ratings[other]);
//   //       for (var j = 0; j < movies.length; j++) {
//   //         var movie = movies[j];
//   //         // As long as I have not already rated the movie!
//   //         if (!ratings[person][movie]) {
//   //           // Have we not seen this movie before with someone else?
//   //           if (recommendations[movie] == undefined) {
//   //             recommendations[movie] = {
//   //               total: 0,
//   //               simSum: 0,
//   //               ranking: 0
//   //             }
//   //           }
//   //           // Add up the other persons rating weighted by similarity
//   //           recommendations[movie].total += ratings[other][movie] * sim;
//   //           // Add up all similarity scores
//   //           recommendations[movie].simSum += sim;
//   //         }
//   //       }
//   //     }
//   //   }

//   //   // Ok, now we can calculate the estimated star rating for each movie
//   //   var movies = Object.keys(recommendations);
//   //   for (var i = 0; i < movies.length; i++) {
//   //     var movie = movies[i];
//   //     // Total score divided by total similarity score
//   //     recommendations[movie].ranking = recommendations[movie].total / recommendations[movie].simSum;
//   //   }

//   //   // Sore movies by ranking
//   //   movies.sort(byRanking);
//   //   function byRanking(a, b) {
//   //     return recommendations[b].ranking - recommendations[a].ranking;
//   //   }

//   //   // Display everything in sorted order
//   //   for (var i = 0; i < movies.length; i++) {
//   //     var movie = movies[i];
//   //     var stars = recommendations[movie].ranking;
//   //     var rec = createP(movie + ' ' + nf(stars,1,1) + '⭐');
//   //     rec.parent('#results');
//   //   }
//   // }

// }