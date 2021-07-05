"use strict";
let attemptEl=document.getElementById("attempts");
let containerEl=document.getElementById("container");
let leftImgEl=document.getElementById("leftImg");

let middleImgEl=document.getElementById("middleImg");
let rightImgEl=document.getElementById("rightImg");
let ulEl=document.getElementById("results");
let products=[];

let attempt = 1;
let maxAttempts = 10;

function Product(productName) {
    
    this.pName = productName.split('.')[0];
    this.img = 'images/' + productName;
    this.votes = 0;
    this.views = 0;
    products.push(this);
}

let ProductImges=["bag.jpg","banana.jpg","bathroom.jpg","boots.jpg","breakfast.jpg","bubblegum.jpg","chair.jpg","cthulhu.jpg","dog-duck.jpg","dragon.jpg","pen.jpg","pet-sweep.jpg","scissors.jpg","shark.jpg","sweep.png","tauntaun.jpg","unicorn.jpg","water-can.jpg","wine-glass.jpg"]


for (let i = 0; i < ProductImges.length; i++) {
    new Product(ProductImges[i]);
}

function randomIndex() {
    return Math.floor(Math.random() * products.length);
}

let leftIndex ;
let middleIndex;
let rightIndex ;

function renderRandomImg() {

     leftIndex = randomIndex();
     middleIndex=randomIndex();
     rightIndex = randomIndex();
     while (leftIndex === rightIndex ||leftIndex === middleIndex || middleIndex === rightIndex) {
        leftIndex = randomIndex();
        middleIndex=randomIndex();
    }

    leftImgEl.setAttribute('src', products[leftIndex].img);
    middleImgEl.setAttribute('src', products[middleIndex].img);
    
    rightImgEl.setAttribute('src', products[rightIndex].img);

    leftImgEl.setAttribute('alt', products[leftIndex].pName);
    middleImgEl.setAttribute('alt', products[middleIndex].pName);
    rightImgEl.setAttribute('alt', products[rightIndex].pName);

    leftImgEl.setAttribute('title', products[leftIndex].pName);
    middleImgEl.setAttribute('title', products[middleIndex].pName);
    rightImgEl.setAttribute('title', products[rightIndex].pName);

    products[leftIndex].views++;
    products[middleIndex].views++;
    products[rightIndex].views++;


}

renderRandomImg();

leftImgEl.addEventListener('click', handelClicks);
middleImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);
let buttonEl=document.createElement("button")
function handelClicks(event) {
    if (attempt <= maxAttempts) {
        let clickedImg = event.target.id;
        if (clickedImg === 'leftImg') {
            products[leftIndex].votes++;
        }
        else if (clickedImg === 'rightImg') {
            products[rightIndex].votes++;
        }else if (clickedImg === 'middleImg') {
            products[middleIndex].votes++;
        }
        renderRandomImg();
        // console.log(clickedImg);
        
        
       
    } else { ;
            buttonEl.addEventListener("click",listEl);
            buttonEl.textContent='View results';
            containerEl.appendChild(buttonEl);

        leftImgEl.removeEventListener('click', handelClicks);
        middleImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
        
        
    }
    
    attempt++;
    
}

function listEl(){
let ulEl = document.getElementById('results');
        for (let i = 0; i < products.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${products[i].pName} has ${products[i].votes} votes and ${products[i].views} views .`
            ulEl.appendChild(liEl);
           
        }
        buttonEl.removeEventListener("click",listEl);

}