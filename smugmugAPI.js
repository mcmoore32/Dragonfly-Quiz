//Smugmug API Keys
//API Key: pq4nxcZNwNc8dLc43cK72X27H2Vnt9Q2
//API Secret: NXgM4Z9ZzsBJ6QVKcKTtHqq8VvpTmtXBPsVxj8rq2fMvXkgZqZpXbCw8Mh4SqtZK
//The endpoint is
//"https://www.smugmug.com/api/v2/user/mcmoore!imagesearch?Order=Popular&q=white"


//Endpoint URL
var SMUGMUG_SEARCH_URL = 'https://www.smugmug.com/api/v2/user/mcmoore!imagesearch';


//State variable that holds all information pertinent to the current quetion being generated
var quizState = {
  jsonText: [],
  quizImage: "",
  returnedAlbumUri: "",
  returnedRawImageEndpoint: "",
  correctAnswer: "",
  imageArrayNumber: 0,
  questionAnswers: [],
  currentQuestionNumberKey: 0,
  questionNumberArray: ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10']
}

var questionObject = {
  'question1': [],
  'question2': [],
  'question3': [],
  'question4': [],
  'question5': [],
  'question6': [],
  'question7': [],
  'question8': [],
  'question9': [],
  'question10': []
}

var incr = 0;

//array of all possible answers
//used to generate wrong answers for a particular question
var answers = ['Sparkling Jewelwing', 'Ebony Jewelwing', 'American Rubyspot', 'Great Spreadwing', 'Southern Spreadwing', 'Spotted Spreadwing', 'Amber-winged Spreadwing', 'Sweetflag Spreadwing', 'Elegant Spreadwing', 'Slender Spreadwing', 'Swamp Spreadwing', 'Eastern Red Damsel', 'Blue-fronted Dancer', 'Seepage Dancer', 'Variable Dancer', 'Powdered Dancer', 'Blue-ringed Dancer', 'Blue-tipped Dancer', 'Dusky Dancer', 'Aurora Damsel', 'Azure Bluet', 'Double-striped Bluet', 'Familiar Bluet', 'Attenuated Bluet', 'Turquoise Bluet', 'Atlantic Bluet', 'Burgundy Bluet', 'Big Bluet', 'Stream Bluet', 'Skimming Bluet', 'Pale Bluet', 'Orange Bluet', 'Slender Bluet', 'Vesper Bluet', 'Blackwater Bluet', 'Citrine Forktail', 'Lilypad Forktail', 'Fragile Forktail', 'Furtive Forktail', 'Ramburs Forktail', 'Eastern Forktail', 'Sphagnum Sprite', 'Southern Sprite', 'Duckweed Firetail', 'Gray Petaltail', 'Black-tipped Darner', 'Shadow Darner', 'Green-striped Darner', 'Spatterdock Darner', 'Common Green Darner', 'Comet Darner', 'Springtime Darner', 'Fawn Darner', 'Regal Darner', 'Swamp Darner', 'Taper-tailed Darner', 'Harlequin Darner', 'Twilight Darner', 'Cyrano Darner', 'Unicorn Clubtail', 'Black-shouldered Spinyleg', 'Banner Clubtail', 'Lancet Clubtail', 'Midland Clubtail', 'Ashy Clubtail', 'Sable Clubtail', 'Dragonhunter', 'Southern Pygmy Clubtail', 'Appalachian Snaketail', 'Common Sanddragon', 'Eastern Least Clubtail', 'Lauras Clubtail', 'Russet-tipped Clubtail', 'Arrow Clubtail', 'Brown Spiketail', 'Delta-spotted Spiketail', 'Tiger Spiketail', 'Twin-spotted Spiketail', 'Arrowhead Spiketail', 'Stream Cruiser', 'Illinois Swift River Cruiser', 'Georgia Swift River Cruiser', 'Royal River Cruiser', 'Petite Emerald', 'Slender Baskettail', 'Common Baskettail', 'Prince Baskettail', 'Mantled Baskettail', 'Robust Baskettail', 'Selys Sundragon', 'Umber Shadowdragon', 'Stygian Shadowdragon', 'Fine-lined Emerald', 'Coppery Emerald', 'Mocha Emerald', 'Treetop Emerald', 'Clamp-tipped Emerald', 'Four-spotted Pennant', 'Calico Pennant', 'Halloween Pennant', 'Banded Pennant', 'Marthas Pennant', 'Double-ringed Pennant', 'Eastern Pondhawk', 'Seaside Dragonlet', 'Little Blue Dragonlet', 'Blue Corporal', 'Dot-tailed Whiteface', 'Golden-winged Skimmer', 'Bar-winged Skimmer', 'Spangled Skimmer', 'Yellow-sided Skimmer', 'Slaty Skimmer', 'Widow Skimmer', 'Needhams Skimmer', 'Twelve-spotted Skimmer', 'Painted Skimmer', 'Great Blue Skimmer', 'Elfin Skimmer', 'Roseate Skimmer', 'Blue Dasher', 'Wandering Glider', 'Spot-winged Glider', 'Eastern Amberwing', 'Common Whitetail', 'Blue-faced Meadowhawk', 'Cherry-faced Meadowhawk', 'Ruby Meadowhawk', 'Band-winged Meadowhawk', 'Autumn Meadowhawk', 'Striped Saddlebags', 'Carolina Saddlebags', 'Black Saddlebags', 'Red Saddlebags'];



//get initial JSON data using search term
function getImageFromApi() {
  var query = {
    APIKey: 'pq4nxcZNwNc8dLc43cK72X27H2Vnt9Q2',
    q: 'male',
    count: 2000
  }
  $.getJSON(SMUGMUG_SEARCH_URL, query, function(returnedText) {
    console.log(returnedText);
    quizState.jsonText = returnedText;
    getEndPoints();
    incr = 0;
  });
}


//BEGINNING OF LOOP TO GENERATE MULTIPLE QUETIONS



//Original JSON file contains endpoints that have to be used to get the adtual image URLs and name of the album to use as the correct answer.  This functions makes additional JSON requests to those endpoints
function getEndPoints () {
  //This is the number of images returned in the JSON file (currently 1056)
  var numberImages = quizState.jsonText.Response.Image.length;
  //this do loop gets a random image and checks that it comes the Delmarva folder using the .search method
  //If not, it fetches another image
  do {
    quizState.imageArrayNumber = Math.floor((Math.random() * numberImages) + 1);
    var n = quizState.jsonText.Response.Image[quizState.imageArrayNumber].WebUri.search('Delmarva');
  }
  while (n < 0);
  //These extract the new endpoints and completes them by adding smugmug.com
  quizState.returnedRawImageEndpoint = 'https://www.smugmug.com' + quizState.jsonText.Response.Image[quizState.imageArrayNumber].Uris.ImageSizeDetails.Uri;
  quizState.returnedAlbumUri = quizState.jsonText.Response.Image[quizState.imageArrayNumber].Uris.ImageAlbum.Uri;
  quizState.returnedAlbumUri = 'https://www.smugmug.com' + quizState.returnedAlbumUri;
  getImageUrl();
}

//This getS the URL for the image in XLarge size using the endpoint from getEndPoints
function getImageUrl () {
  var query3 = {
    APIKey: 'pq4nxcZNwNc8dLc43cK72X27H2Vnt9Q2'
  }
  $.getJSON(quizState.returnedRawImageEndpoint, query3, function(returnedText) {
    quizState.quizImage = returnedText.Response.ImageSizeDetails.ImageSizeXLarge.Url;
    //testing
    questionObject[quizState.questionNumberArray[incr]].push(quizState.quizImage);
    getAlbumNameFromApi();
  });
}

//This gets the folder name for the image using the endpoint from getEndPoints - this is the corret answer
function getAlbumNameFromApi () {
  var query2 = {
    APIKey: 'pq4nxcZNwNc8dLc43cK72X27H2Vnt9Q2'
  }
  $.getJSON(quizState.returnedAlbumUri, query2, function(returnedText) {
    quizState.correctAnswer = returnedText.Response.Album.Title;
    renderResult();
  });
}

//Adds image and correct answer to HTML template
function renderResult() {
  $('.js-results').text("Correct Answer: " + quizState.correctAnswer);
  $('.js-image').attr("src", quizState.quizImage);
  getRandomAnswers();
}

//Generates a set of 10 possible answers for the muliple choice question in random order
//uses the answers array which has the name of all possible species
function getRandomAnswers () {
  quizState.questionAnswers = [];
  //Generates 10 unique random numbers in the range from 0-133
  while (quizState.questionAnswers.length < 10){
    var randomnumber = Math.floor(Math.random()*133);
    if(quizState.questionAnswers.indexOf(randomnumber) > -1) continue;
    quizState.questionAnswers[quizState.questionAnswers.length] = randomnumber;
  }
  //uses the unique random numbers to assign names from the answers array to questionsArray rather than numbers
  //checks if the correct answer is already in the set of 10 names
  //if not, assigns the correct answer to one fo the randomly selected array elements
  //results in an array of 10 possible answers inlcuding the correct answer in random order
  for (var i=0; i<quizState.questionAnswers.length; i++) {
    quizState.questionAnswers[i] = answers[quizState.questionAnswers[i]];
  };
  for (i = 0; i < quizState.questionAnswers.length; i++) {
    var containsCorrectAnswer = false;
    if (quizState.questionAnswers[i] === quizState.correctAnswer) {
      containsCorrectAnswer = true;
    }
  }
  if (containsCorrectAnswer === false) {
    randomnumber = Math.floor(Math.random()*10);
    quizState.questionAnswers[randomnumber] = quizState.correctAnswer;
  }
  for (i=0; i<quizState.questionAnswers.length; i++) {
    console.log(i + ": " + quizState.questionAnswers[i]);
    questionObject[quizState.questionNumberArray[incr]].push(quizState.questionAnswers[i]);
  };
  questionObject[quizState.questionNumberArray[incr]].push(quizState.correctAnswer);
  console.log('question is: ' + questionObject[quizState.questionNumberArray[incr]]);
  incr++;
  if (incr < 10) {
    getEndPoints();
  }
}

// END OF FOR LOOP FOR EACH QUESTION

//Event listener for submit, gets user search term and assigns it to variable
/*function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}*/

//Onload starts the first function
$(getImageFromApi);

