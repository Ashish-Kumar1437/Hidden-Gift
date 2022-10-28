const cards = document.getElementsByClassName("card");
const frontside = document.getElementsByClassName("front");
const giftBoxes = document.querySelectorAll('.gifts > div > img');
let BoxesOpened = 0;
let noOfclick=0;
let BoxesValue = [];
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => { show(i) })
}
const noOfGifts = Math.sqrt(cards.length) + 1;

// Start Game
function startGame() {
    noOfclick=0;
    const light = setInterval(() => {
        for (var i = 0; i < cards.length; i++) {
            frontside[i].style.background = `rgb(${Math.random()*255} ${Math.random()*255} ${Math.random()*255})`;
        }
    }, 100);

    setTimeout(() => {
        clearInterval(light)
        for (var i = 0; i < cards.length; i++) {
            frontside[i].style.background = `linear-gradient(90deg, yellow, orange)`;
        }
    }, 1500)
    makegrid(noOfGifts)
}

// Reset lives
function resetlives() {
    BoxesOpened = 0;
    for (let i = 0; i < giftBoxes.length; i++) {
        giftBoxes[i].setAttribute('src', '../img/giftbox.png')
    }
}

// reset grid

function resetGrid() {
    noOfclick=0;
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.transform = "rotateY(0deg)"
    }
}
// Make Grid
function makegrid(n) {
    noOfclick=0;
    const boxvalue = new Array(cards.length);
    resetlives();
    let count = 0;
    while (count != n) {
        const index = Math.floor(Math.random() * noOfGifts)
        const img = cards[index].querySelector('img');
        if (boxvalue[index] == undefined && count < n - 1) {
            img.setAttribute('src', './img/gift.png')
            img.setAttribute('alt', 'gift')
            boxvalue[index] = "gift"
            count++;
        } else if (boxvalue[index] == undefined && count == n - 1) {
            img.setAttribute('src', './img/virus.png')
            img.setAttribute('alt', 'danger')
            boxvalue[index] = "danger"
            count++;
        }
    }
    for (var i = 0; i < cards.length; i++) {
        const img = cards[i].querySelector('img');
        if (boxvalue[i] == undefined) {
            img.setAttribute('src', './img/decline.png')
            img.setAttribute('alt', 'miss')
            boxvalue[i] = "miss"
        }
    }
    BoxesValue = boxvalue;
}

// show button
function show(i) {
    noOfclick++;
    const img = cards[i].querySelector('img')
   // img.style.display = "inline";
    cards[i].style.transform = "rotateY(180deg)"
    const alt = img.getAttribute('alt')
    if (alt == "danger") {
        setTimeout(() => {
            document.getElementById('message').querySelector(".stars").style.display="none";
            document.getElementById('message').querySelector(".btn").style.display="none";
            document.getElementById('text').innerHTML="OOPS WRONG CLICK !!"
            document.getElementById('messageBox').style.display = 'flex';
        }, 400)
        setTimeout(() => {
            resetGrid();
        }, 2000);
        setTimeout(() => {
            makegrid(noOfGifts)
            document.getElementById('messageBox').style.display = 'none';
        }, 2500);
    } else if (alt == "gift") {
        giftBoxes[BoxesOpened].setAttribute('src', './img/gift.png');
        img.setAttribute('alt', 'openedGift');
        BoxesOpened++;
        if(BoxesOpened===giftBoxes.length){
            let stars=0;
            console.log(noOfclick);
            if(noOfclick <= giftBoxes.length+1){
                stars=3;
            }
            else if(noOfclick <= giftBoxes.length+2){
                stars=2
            }
            else{
                stars=1;
            }
            win(stars);
        }
    }
}
// win

function win(stars){
    const star=document.querySelectorAll(".stars > div");
    let i=0;
    while(i<3){
        if(stars>i){
            star[i].classList="fill";
        }
        else
        star[i].classList="nofill";
        i++;
    }
    setTimeout(()=>{
        document.getElementById('message').querySelector(".stars").style.display="flex";
            document.getElementById('message').querySelector(".btn").style.display="flex";
        document.getElementById('text').innerHTML="VICTORY";
        document.getElementById('messageBox').style.display = 'flex';
    },400)

}
// reset button
// document.querySelector('.reset').addEventListener('click', () => {
//     resetGrid();
//     setTimeout(() => {
//         startGame();
//     }, 200);
// })
document.querySelector('.reset > button').addEventListener('click', () => {
    const input=document.getElementById("index");
    const value=input.value.toLowerCase();
    let no;
    const number=parseInt(value[1]);
    const alphabate=value.charCodeAt(0) - 97;
    no=(alphabate)*(noOfGifts-1)+parseInt(value[1]);
    if((number>noOfGifts-1 || alphabate>noOfGifts-1) ||no-1>=cards.length || isNaN(no)){
        alert("Out of range");
    }
    else if(!isNaN(no)) {
        show(no-1);
    }
    input.value="";
})
startGame()