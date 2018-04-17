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
    'fa fa-cube'
];

// Declare variables
const stars = document.querySelector('.stars');
const starEmpty = '<li><i class="fa fa-star-o"></i></li>';
const cardsArray = document.querySelectorAll('.deck li');
const card = document.querySelector('.deck');
let timeInterval;
let openedCardsList = [];
let numberOfMoves = 0;
const moves = document.querySelector('.moves');
const star = '<li><i class="fa fa-star"></i></li>';
let matchedCardsList = document.getElementsByClassName('match');
let min = 0;
let sec = 0;
const timer = document.querySelector('.timer');
const resume = document.querySelector('.resume');
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');

// Start new game when HTML document loaded
document.addEventListener('DOMContentLoaded', startGame);

// Function to start new game
function startGame() {
    stars.innerHTML = starEmpty.repeat(3);
    moves.innerText = '';
    numberOfMoves = 0;
    timer.innerText = '';
    resetTimer();
    min = 0;
    sec = 0;
    clearArray(openedCardsList);
    clearArray(matchedCardsList);
    // Shuffle the list of icons
    let shuffledIconList = shuffle(iconList);
    // Add shuffled list to the HTML
    cardsArray.forEach(function(card) {
        for (let i = 0; i < shuffledIconList.length; i++) {
            cardsArray[i].firstElementChild.className = shuffledIconList[i];
        }
        card.className = 'card';
    });
}
// Function to mix the array of icons
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Event listener for a card
card.addEventListener('click', function(e) {
    // Listen to events only when the card is clicked
    if (!(e.target.className === 'deck') && (openedCardsList.length < 2)) {
        // Set timeCount function
        if (min === 0 && sec === 0) {
            timeInterval = setInterval(timeCounter, 1000);
            timeCounter();
        }
        // Display card's symbol
        displaySymbol(e);
        // Add the card to a list of opened cards
        addToOpenCardsList(e);
        if (openedCardsList.length === 2) {
            // Set the function when cards match
            if (openedCardsList[0].classList.value === openedCardsList[1].classList.value) {
                match();
            }
            // Set the function when cards don't match
            else {
                notMatch();
            }
            // Start counting moves when two cards are opened
            moveCounter();
            // Set Stars rating depending on the bumber of moves
            starsRating();
            // Set further actions when all the cards are matched
            if (matchedCardsList.length === 16) {
                starsFinal = stars.innerHTML;
                timeFinal = timer.innerHTML;
                resetTimer();
                setTimeout(function() {
                    displayModal();
                }, 1200);
            }
        }
    }
});

function displaySymbol(e) {
    e.target.className = 'card open show eventOff';
}

function addToOpenCardsList(e) {
    openedCardsList.push(e.target.firstElementChild);
}

function match() {
    for (i = 0; i < openedCardsList.length; i++) {
        openedCardsList[i].parentNode.classList.remove('open', 'show');
        openedCardsList[i].parentNode.classList.add('match');
    }
    clearArray(openedCardsList);
}

function clearArray(cards) {
    cards.length = 0;
}

function notMatch() {
    for (i = 0; i < openedCardsList.length; i++) {
        openedCardsList[i].parentNode.classList.remove('open', 'show', 'eventOff');
        openedCardsList[i].parentNode.classList.add('notMatch');
    }
    setTimeout(function() {
        for (i = 0; i < openedCardsList.length; i++) {
            openedCardsList[i].parentNode.classList.remove('notMatch');
        }
        clearArray(openedCardsList);
    }, 900);
}

function moveCounter() {
    numberOfMoves++;
    moves.innerText = numberOfMoves;
}

function starsRating() {
    if (numberOfMoves >= 0 && numberOfMoves < 10) {
        stars.innerHTML = star.repeat(3);
    } else if (numberOfMoves >= 10 && numberOfMoves < 16) {
        stars.innerHTML = star.repeat(2);
    } else {
        stars.innerHTML = star.repeat(1);
    }
}

function displayModal() {
    modal.style.display = 'block';
    document.getElementById('stars').innerHTML = starsFinal;
    document.getElementById('stars').innerHTML = 'Stars rating: ' + starsFinal;
    document.getElementById('moves').innerHTML = 'Moves count: ' + numberOfMoves;
    document.getElementById('timer').innerHTML = 'Time spent: ' + timeFinal;
}

function timeCounter() {
    sec += 1;
    if (sec === 60) {
        min += 1;
        sec = 0;
    }
    if (sec < 10) {
        if (min < 10) {
            timer.innerHTML = ' 0' + min + ':0' + sec;
        } else {
            timer.innerHTML = ' ' + min + ':0' + sec;
        }
    } else {
        if (min < 10) {
            timer.innerHTML = ' 0' + min + ':' + sec;
        } else {
            timer.innerHTML = ' ' + min + ':' + sec;
        }
    }
}

function resetTimer() {
    clearInterval(timeInterval);
}

function hideModal() {
    modal.style.display = 'none';
}

resume.addEventListener('click', function() {
    hideModal();
    resetTimer();
});

start.addEventListener('click', function() {
    hideModal();
    startGame();
});

restart.addEventListener('click', function() {
    hideModal();
    startGame();
});
