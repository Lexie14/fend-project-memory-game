/*
 * Create a list that holds all of your cards
 */
 const iconList = ['fa fa-diamond',
 'fa fa-paper-plane-o',
 'fa fa-anchor',
 'fa fa-bolt',
 'fa fa-cube',
 'fa fa-anchor',
 'fa fa-leaf',
 'fa fa-bicycle',
 'fa fa-diamond',
 'fa fa-bomb',
 'fa fa-leaf',
 'fa fa-bomb',
 'fa fa-bolt',
 'fa fa-bicycle',
 'fa fa-paper-plane-o',
 'fa fa-cube'];

 /*
  * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
  */
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }


/*
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 const card = document.querySelector('.deck');


 card.addEventListener('click', function (e) {
   if (!(e.target.className === 'deck')) {
   displaySymbol(e);
   addToOpenCardsList(e);
   if (openedCardsList.length === 2) {
     if (openedCardsList[0].classList.value === openedCardsList[1].classList.value) {
         match();
     } else {
         notMatch();
     }
     moveCounter();
     allMatched();
   }
 }
 });

 function displaySymbol(e) {
   e.target.className = 'card open show';
 }

 let openedCardsList = [];
 function addToOpenCardsList(e) {
   openedCardsList.push(e.target.firstElementChild);
 }

 function match() {
   for(var i = 0; i < openedCardsList.length; i++) {
        openedCardsList[i].classList.add('match');
      }
   }
