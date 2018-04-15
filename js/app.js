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
 let timeInterval;
 resetTimer(timeInterval);


 card.addEventListener('click', function (e) {
   if (!(e.target.className === 'deck') && (openedCardsList.length < 2)) {
     if (min === 0 && sec === 0) {
       timeInterval = setInterval(timeCounter, 1000);
       timeCounter();
}
   displaySymbol(e);
   addToOpenCardsList(e);
   if (openedCardsList.length === 2) {
     if (openedCardsList[0].classList.value === openedCardsList[1].classList.value) {
         match();
     } else {
         notMatch();
     }
     moveCounter();
     starsRating();
     if (matchedCardsList.length === 16) {
       starsFinal = stars.innerHTML;
       timeFinal = timer.innerHTML;
       displayModal();
       resetTimer(timeInterval);
     }
   }
 }
 });

 function displaySymbol(e) {
   e.target.className = 'card open show eventOff';
 }

 let openedCardsList = [];
 function addToOpenCardsList(e) {
   openedCardsList.push(e.target.firstElementChild);
 }

 function match() {
   for(i = 0; i < openedCardsList.length; i++) {
     openedCardsList[i].parentNode.classList.remove('open', 'show');
     openedCardsList[i].parentNode.classList.add('match');
    }
    clearArray(openedCardsList);
   }

function clearArray(openedCardsList) {
  openedCardsList.length = 0;
}

function notMatch() {
  for(i = 0; i < openedCardsList.length; i++) {
    openedCardsList[i].parentNode.classList.remove('open', 'show', 'eventOff');
    openedCardsList[i].parentNode.classList.add('notMatch');
   }
  setTimeout(function(){
    for(i = 0; i < openedCardsList.length; i++) {
      openedCardsList[i].parentNode.classList.remove('notMatch');
    }
    clearArray(openedCardsList);
  }, 900);
}

let numberOfMoves = 0;
const moves = document.querySelector('.moves');

 function moveCounter() {
   numberOfMoves++;
   moves.innerText = numberOfMoves;
 }

const stars = document.querySelector('.stars');
const star = '<li><i class="fa fa-star"></i></li>';
function starsRating() {
  if (numberOfMoves >= 0 && numberOfMoves < 10) {
		stars.innerHTML = star.repeat(3);
	}
	else if (numberOfMoves >= 10 && numberOfMoves < 16) {
		stars.innerHTML = star.repeat(2);
	}
	else {
		stars.innerHTML = star.repeat(1);
	}
}

let matchedCardsList = document.getElementsByClassName('match');
 function displayModal() {
   modal.style.display = 'block';
   document.getElementById('stars').innerHTML = starsFinal;
   document.getElementById('stars').innerHTML = 'Stars rating: ' + starsFinal;
   document.getElementById('moves').innerHTML = 'Moves count: ' + numberOfMoves;
   document.getElementById('timer').innerHTML = 'Time spent: ' + timeFinal;
 }

let min = 0;
let sec = 0;
const timer = document.querySelector('.timer');
function timeCounter() {
  sec+=1;
  if(sec === 60) {
    min+=1;
    sec=0;
  }
  if(sec < 10) {
    if (min < 10) {
        timer.innerHTML= ' 0'+min +':0'+sec;
    } else {
      timer.innerHTML= ' '+min +':0'+sec;
    }
  }
    else {
      if (min < 10) {
          timer.innerHTML= ' 0'+min +':'+sec;
      } else {
        timer.innerHTML= ' '+min +':'+sec;
      }
  }
}

function resetTimer() {
  clearInterval(timeInterval);
}
