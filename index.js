const startBtn = document.getElementById('startBtn');
const moves = document.getElementById('movesCount');
const time = document.getElementById('time');
const cards = document.getElementById('cards');
const card = document.querySelectorAll('.card');
const back = document.querySelectorAll('.back');
const finalMessageContain = document.getElementById('finalMessageContain');
const finalMessage = document.getElementById('finalMessage');
const resultMoves = document.getElementById('resultMoves');
const resultTime = document.getElementById('resultTime');
const playAgainBtn = document.getElementById('playAgain');

let playable = false;
let interval;

let initialTime = 50;
let initialMoves = 0;

time.innerText = initialTime;
moves.innerText = initialMoves;

let images = [];

startBtn.addEventListener('click', gameStart);

function gameStart() {
    clearInterval(interval);

    card.forEach((item) => {
        return item.classList.remove('open');
    })

    finalMessageContain.style.display = 'none';
    playable = true;

    time.innerText = initialTime;
    moves.innerText = initialMoves;

    images = [
        './images/c++.png',
        './images/css.png',
        './images/html.png',
        './images/kotlin.png',
        './images/python.png',
        './images/ruby.png',
        './images/swift.png',
        './images/typescript.png',
        './images/c++.png',
        './images/css.png',
        './images/html.png',
        './images/kotlin.png',
        './images/python.png',
        './images/ruby.png',
        './images/swift.png',
        './images/typescript.png'
    ];
    
    shuffleCards();
    countDown();
    cards.addEventListener('click', compareCards);
}

function shuffleCards() {
    back.forEach(item => {
        let image = images[Math.floor(Math.random() * images.length)];
        images.splice(images.indexOf(image), 1);

        return item.src = image;
    })
}

function countDown() {
    interval = setInterval(() => {
        time.innerText -= 1;

        if (+time.innerText === 0) {
            openedCards = 0;
            playable = false;

            clearInterval(interval);
            
            finalMessageContain.style.display = 'block';
            finalMessage.innerText = 'Unfortunately You Lost 😔';
        } 
    }, 1000)
}

let sources = [];
let openedCards = 0;

function compareCards(e) {
    if (playable) {
        if (e.target.classList.contains('front')) {
            sources.push(e.target.nextElementSibling);
            e.target.parentElement.classList.add('open');

            if (sources.length === 2) {
                playable = false;

                if (sources[0].src !== sources[1].src) {
                    moves.innerText++;
                    setTimeout(() => {
                        sources[0].parentElement.classList.remove('open');
                        sources[1].parentElement.classList.remove('open');

                        sources = [];

                        playable = true;

                    }, 1500)
                } else {
                    moves.innerText++;
                    sources = [];

                    openedCards++;
                    console.log(openedCards);

                    playable = true;

                    if (openedCards === 8) {
                        openedCards = 0;
                        playable = false;

                        clearInterval(interval);

                        resultMoves.innerText = moves.innerText;
                        resultTime.innerText = time.innerHTML;
                        
                        setTimeout(() => {
                            finalMessageContain.style.display = 'block';
                            finalMessage.innerText = 'Congratulations You Won 🏆';
                        }, 1200)
                    } 
                } 
                
            } 
        }
    }
}

playAgainBtn.addEventListener('click', gameStart);