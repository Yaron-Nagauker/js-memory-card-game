

const $audio = document.getElementById('audio');
const $container = document.getElementById('container');
const $dashbord =  document.getElementById('dashbord');
const $bord = document.getElementById('bord');
const $match = document.getElementById('match');
const $timer = document.getElementById('timer');
const $steps = document.getElementById('step');
const cards = ['💗','💗','🐞','🐞','☘️','☘️','🌀','🌀','🔔','🔔','💲','💲'];

let steps = 0;
let match = 0;
let timer = 120;
const comperCards = [];


const shuffle = (arrayOfItems) => {
    let counter = arrayOfItems.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = arrayOfItems[counter];
        arrayOfItems[counter] = arrayOfItems[index];
        arrayOfItems[index] = temp;
    }
    return arrayOfItems;
}

const diployCards = (arr) => {
var i = 0;
arr.forEach(element => {
    var card = document.createElement('li');
    card.innerHTML = element;
    card.id = i;
    card.querySelector.className = element;
    card.className = 'close';              
    $bord.appendChild(card);
    i++;
    });
}

const comper = (Cards) => {
    setTimeout(() => {
        const card_1 = Cards[0];
        const card_2 = Cards[1];
        if (card_1.innerHTML === card_2.innerHTML) {
            card_1.classList.replace('flip','open');
            card_2.classList.replace('flip','open');
            steps++;
            match++;
            checkIfGameStatus();
        } else {
            card_1.classList.replace('flip','close');
            card_2.classList.replace('flip','close');
            steps++;
        }
        $bord.classList.remove('comper');
        $steps.innerText = steps;
        $match.innerText = match;
        Cards.pop();
        Cards.pop();
    },800) 
}

const countTime = () => {
    timerInterval = setInterval(() => {
        --timer;
        $timer.innerText = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            $bord.removeEventListener('click',selectCard);
            
        }
    }, 1000);
}

const checkIfGameStatus = () => {
    openCard = document.getElementsByClassName('open').length;
    x = document.querySelectorAll('li');
    if (openCard === 12) {
        clearInterval(timerInterval);
        // $bord.removeEventListener('click',selectCard);
        steps = 0;
        match = 0;
        Swal.fire({
            title: 'Game Over',
            icon: 'success',
            footer: '<a href>back to github</a>',
            showConfirmButton: true,
            confirmButtonText: 'Play Again',
        }).then((result) => {
            if (result.isConfirmed) {
                timer = 120;
                match = 0;
                steps = 0;
                $bord.innerHTML = '';
                clearInterval('timerInterval');
                runGame();
            }
        })
    }
}

const selectCard = ($event) =>{
    const isCard = $event.target.localName === 'li';
    const isOpenedCard = $event.target.classList.contains('open');
    const isFlippedCard = $event.target.classList.contains('flip');
    if (!isCard && !isOpenedCard && !isFlippedCard) {
        return;
    }
    const cardIndex = $event.target.id;
    const card = document.querySelectorAll('li')[cardIndex];
    card.classList.replace('close','flip');
    comperCards.push(card);
    if (comperCards.length === 2) {
       $bord.classList.add('comper');
       comper(comperCards);
    }
}

$bord.addEventListener('click',selectCard);


runGame = () => {
    shuffle(cards);
    diployCards(cards);
    countTime();
}

runGame();









