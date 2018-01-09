//Smugmug API Keys
//API Key: pq4nxcZNwNc8dLc43cK72X27H2Vnt9Q2
//API Secret: NXgM4Z9ZzsBJ6QVKcKTtHqq8VvpTmtXBPsVxj8rq2fMvXkgZqZpXbCw8Mh4SqtZK


//Data for quiz questions
//array = [image location, answer1, answer2, answer3, answer 4, correct answer]
var questionObject = {
  Question1: ['img/TwelveSpottedSkimmer.jpg', 'Twelve-spotted Skimmer', 'Common Whitetail', 'Widow Skimmer', 'Prince Baskettail', 'Twelve-spotted Skimmer'],
  Question2: ['img/BlueCorporal.jpg', 'White Corporal', 'Common Whitetail', 'Blue Corporal', 'Common Baskettail', 'Blue Corporal'],
  Question3: ['img/WhiteCorporal.jpg', 'Common Whitetail', 'Great Blue Skimmer', 'Widow Skimmer', 'White Corporal', 'White Corporal'],
  Question4: ['img/WidowSkimmer.jpg', 'Common Whitetail', 'Widow Skimmer', 'Twelve-spotted Skimmer', 'Black Saddlebags', 'Widow Skimmer'],
  Question5: ['img/TwinSpottedSpiketail.jpg', 'Swift River Cruiser', 'Tiger Spiketail', 'Common Sanddragon', 'Twin-spotted Spiketail', 'Twin-spotted Spiketail']
}

//declare global variable to count number correct
var numberCorrect;

//renders the first page
//pass 0 as the initial page Number to the function that renders each quiz question
//initialize global count correct number variable
function renderHeroPage (){
  $('.js-hero').removeClass('hideMe');
  $('.js-quiz-page').addClass('hideMe');
  $('.js-last-page').addClass('hideMe');
  $('.js-hero-button').click(function(){
    numberCorrect = 0;
    renderQuizPage(0);
  })
};

//renders the page at the end of the quiz
//displays the score on the quiz
function renderLastPage (){
  $('.js-last-page').removeClass('hideMe');
  $('.js-quiz-page').addClass('hideMe');
  $('.js-hero').addClass('hideMe');
  $('.js-total-score').text(numberCorrect + '/5');
  $('.js-last-page-button').click(function(){
    renderHeroPage();
  })
};

//renders each quiz page
//increments page and correct answer counters
//calls last page function when all questions have been diplayed based on if/else condition
function renderQuizPage (pageNumber){
  var newPage;
  if (pageNumber <5) {
    pageNumber = pageNumber + 1;
    $('.js-quiz-page').removeClass('hideMe');
    $('.js-hero').addClass('hideMe');
    $('.js-last-page').addClass('hideMe');
    var currentKey = pageNumber - 1;
    var arrayOfKeys = Object.keys(questionObject);

    //Add image and radio button answers to page
    $('.js-quiz-image').attr('src', questionObject[arrayOfKeys[currentKey]][0]);
    var questionHTML = "";
    for (i=1; i<=4; i++) {
      questionHTML = questionHTML +
        '<input type="radio" name="dragon" value="' + questionObject[arrayOfKeys[currentKey]][i] + '"> ' +
        questionObject[arrayOfKeys[currentKey]][i] + '<br>'
    };
    $('.js-answers').html(questionHTML);

    //Generate the two footers for the page
    $('#left-footer').text('Question ' + pageNumber + '/5');
    $('#right-footer').text(numberCorrect + '/' + (pageNumber-1) + ' Correct');

    //Listen to input and mark Correct or Incorrect
    $('input[type=radio][name=dragon]').change(function() {
      event.preventDefault();
      if (this.value === questionObject[arrayOfKeys[currentKey]][5]) {
        $('.js-correct').removeClass('hideMe');
        $('.js-wrong').addClass('hideMe');
        numberCorrect = numberCorrect + 1;
        console.log(numberCorrect);
      } else {
        $('#js-correct-answer').text(questionObject[arrayOfKeys[currentKey]][5]);
        $('.js-wrong').removeClass('hideMe');
        $('.js-correct').addClass('hideMe');
        $('js-answers').addClass('hideMe');
      }
      $('.js-quiz-button').removeClass('hideMe');
      $('input[type=radio][name=dragon]').off();
    });

    $('.js-quiz-button').click(function(){
      $('.js-wrong').addClass('hideMe');
      $('.js-correct').addClass('hideMe');
      $('.js-quiz-button').addClass('hideMe');
      newPage = pageNumber;
      $('.js-quiz-button').off();
      renderQuizPage(newPage);
    });
  } else {
    renderLastPage();
  };
};

//on ready call the first function to render the first page
$( document ).ready(function() {
  renderHeroPage();
});

