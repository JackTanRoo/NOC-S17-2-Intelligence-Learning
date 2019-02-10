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

        console.log("I am in new FILE")
        
        // define data with server data

        data = result;
        
        // create 1 drop down with all critic names


        // setting up all the movie names and dropdown selections
        var movieNames = result.movies;

        // var movieNameSingle;;
        
        var userSelection = {};

        // userSelection = {
            // movie: rating
        // }

        var dropdownSelection = ["No selection", 1,2,3,4,5];

        var allSelectionDropDowns = {};

        for (var i = 0; i < movieNames.length; i++){
           
          movieNameSingle = createP(movieNames[i]);
          
          userSelection[movieNames[i]] = undefined;

          allSelectionDropDowns[movieNames[i]] = createSelect();

          for (var j = 0; j < dropdownSelection.length; j++){
            allSelectionDropDowns[movieNames[i]].option(dropdownSelection[j])
            // console.log("user selection", userSelection);
          
          };
          // console.log("loop end");
        };





        var button = createButton("Submit");
        
        button.mousePressed(function(){

        
        // update userSelection with selected values

          for (var k = 0; k < movieNames.length; k++ ){
            userSelection[movieNames[k]] = allSelectionDropDowns[movieNames[k]].value();
          };

        // console.log(userSelection);

        // console.log("euclidean score", euclideanSimilarity(data, userSelection, "Lisa Rose"))



        // once user submits scores, calculate the similarity score with top 5 other critics for the chosen scores





        // out of the top 5 other critics, work out their ratings for the remaining non rated movies





        // weight the ratings for the non rated ratings for the user


        var final = similarityScoreForAll(data, userSelection)

        console.log("THIS IS FINAL", final)

        


        });







        // var button = createButton("Submit");
        
        // button.mousePressed(function(){

        // // console.log("current value", allSelectionDropDowns["Lady in the Water"].value())

        // //   var critic1 = dropdown1.value();
        // //   var numRecommendations = inputField.value();
        
        // // // work out similarity score all critics relative to the selected critic
        // //   console.log("button pressed")
        // //   console.log("I am the final result array", similarityScoreForAll(data, critic1));

        // //   var screen = similarityScoreForAll(data, critic1);
        // // //
        // //   for (i = 0; i < numRecommendations; i++){
        // //     createP(screen[i])
        // //     console.log("WWWW")
        // //   }
          
        // //   // console.log("button pressed")
        // //   // console.log(critic1);
        // //   // console.log("I am numRecommendations", numRecommendations);


        // });






        // console.log("current value", allSelectionDropDowns["Lady in the Water"].value())
        // console.log(critic1);

        // create input field with number of recommendations wanted
        
        // var inputField = createInput();

        // console.log("score: ", euclideanSimilarity(data, "Michael Phillips","Toby"))

        // create button that submits scores of selected critic
        
        // and returns Euclidean difference


      }
    });
  });
};


// for given userRatings as input, calculate all euclideanSimilarity scores as a sorted array
// return sorted array

function similarityScoreForAll(data, userRatings){
  
  var r = {
    user: userRatings,
    similarCritics : []
  };

  var moviesList = data.movies;
  var allCritics = Object.keys(data.ratings);
  var similarityScore;


  // console.log("in simiarlity similarityScoreForAll, ", data, name1)
  // console.log(" I am allCritics", allCritics)

  for (var z = 0 ; z < allCritics.length; z++) {
    console.log(" I am allCritics", allCritics[z])

    // if criticAssessed = selected Critic, pass
   

    // else calculate the similarity score and push the score to a sorted array
      similarityScore = euclideanSimilarity(data, userRatings, allCritics[z]);

      // console.log("I am similarity score between ", name1, allCritics[i], similarityScore, r);
      
      r.similarCritics = binaryInsert(r.similarCritics, similarityScore, data.ratings[allCritics[z]], allCritics[z]);
    
      // console.log("after binary insert");
      // if result.length > 0 {
      //   result = binaryInsert(result, similarityScore, result[0], result[result.length-1]);
      // } else {
      //   result.push(similarityScore);
      // }
    // else produce similarity score and push to array in sorted way
  }
  return r;

  // r format
  // {
    // user: 
    // similarCritic: [
    // {
      // name: xxx, 
      // similarityScore: xxx, 
      // movieRatings: {
          // movieName: xxx
      // }
    // }
    // ]
  // }
};


// insert an element into a sorted array and return new array

function binaryInsert(array, element, criticObj, criticName, startVal, endVal){

  console.log("array start", array, element, criticObj, criticName, startVal, endVal);
  var length = array.length;

  // array = 
      // [{
      // name: xxx, 
      // similarityScore: xxx, 
      // movieRatings: {
          // movieName: xxx
      // }]

  // propulate array elements as much as possible
  // var criticName = Object.keys(criticObj)[0];

  // console.log("I am the criticObj", criticName, criticObj)
  var arrayElement = {
    name: criticName,
    similarityScore: element,
    movieRatings: criticObj
  };

  // work out start, end and median positions of the array

  // var startPosition = typeof(startVal) != undefined ? startVal : 0;
  // var endPosition = typeof(endVal) != undefined ? endVal: (array.length - 1);

  var startPosition;
  var endPosition;
  
  if (typeof(startVal) == "undefined"){
    startPosition = 0;
    console.log("I am in undefined", startPosition)
  } else {
    startPosition = startVal;
  };

  if (typeof(endVal) == "undefined"){
    endPosition = array.length-1;
    console.log("end position", endPosition);
    // if(array.length <= 1){
    //   endPosition = array.length;
    //       console.log("I am in undefined 2")

    // } else {
    //   endPosition = array.length - 1;
    // }
  } else {
    endPosition = endVal;
  };

  // console.log("2", array, startPosition, endPosition);
// 

  var middlePosition = startPosition + Math.floor((endPosition - startPosition)/2);

  // var result = array;

  console.log("I am in binary insert, here is r", array, criticName, element, startPosition, endPosition, middlePosition);
      
  // if array is empty, then push element into array

  if (array.length == 0){
    array.push(arrayElement)
    // console.log(" I am in 1", array);
    return array;
  };

  // if element is larger or equal than array element in end position, then push to end of array

  if ( element >= array[endPosition].similarityScore){
    array.splice(endPosition+1, 0, arrayElement);
    console.log(" I am in 2", array);
    return array;

  };

  // if element is smaller or equal than array element in start position, then push to start of array

  if ( element <= array[startPosition].similarityScore){
    array.splice(startPosition,0, arrayElement);
    return array;
  };

  // 

  if (array.length == 2 && element <= array[endPosition].similarityScore && element >= array[startPosition].similarityScore) {
    array.splice(startPosition + 1, 0, arrayElement);
    console.log("I am in 4", array)
    return array;
  }

  // if start is >= end then return

  if ( startPosition > endPosition){
    return array;
  };

  // if element is larger or equal to middle
    // recursively run the function again with start and middle

  if ( element <= array[middlePosition].similarityScore ){
    console.log("I am in 3", array, element, middlePosition)
    array = binaryInsert(array, element, criticObj, criticName, startPosition, middlePosition - 1);
    return array;
  };

  // if element is smaller than middle

  if ( element > array[middlePosition].similarityScore ){
    console.log(" I am in 5", array, middlePosition, element, array[middlePosition]);

    array = binaryInsert(array, element, criticObj, criticName, middlePosition, endPosition);
    return array;
  };

  return array;

};






// for given critic name as input + a "top k recommendations", provide the top k recommendations as output







// returns similarity score of 2 critics
// importantly, it only compares the similarity score of movies which overlap

// userRatingsObj = the ratings Obj of the rating
// name2 = comparisonCritic

function euclideanSimilarity(data, userRatingsObj, name2){
        
  // iterate array of movie names of critic1
  var moviesList = data.movies;
  var scoreCritic1;
  var scoreCritic2;
  var movieToCompare;
  var diff;
  var dist;

  var sumSquareDiff = undefined;

  for (var i = 0; i < moviesList.length; i++){  
    movieToCompare = moviesList[i];
    // scoreCritic1 = data.ratings[name1][movieToCompare];

    // user Score
    scoreCritic1 = userRatingsObj[movieToCompare]

    scoreCritic2 = data.ratings[name2][movieToCompare];
    diff = scoreCritic1 - scoreCritic2;
    console.log("movie + diff", name2, movieToCompare, scoreCritic1, scoreCritic2, diff)
 
    if (isNaN(diff)) {
      // console.log("not a number", scoreCritic1, scoreCritic2, diff)
    } else {
      sumSquareDiff = 0;
      sumSquareDiff += diff * diff;
    }
  }
  
  console.log("I am sumSquareDiff ", name2, diff, sumSquareDiff);
  if (sumSquareDiff == undefined){
    dist = 0;
  } else {
    dist = 1 / (1+ sqrt(sumSquareDiff));
  }
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