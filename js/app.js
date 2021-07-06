"use strict";
let attemptEl=document.getElementById("attempts");
let containerEl=document.getElementById("container");
let leftImgEl=document.getElementById("leftImg");

let middleImgEl=document.getElementById("middleImg");
let rightImgEl=document.getElementById("rightImg");
let ulEl=document.getElementById("results");
let products=[];
let productLabels=[];
let votesNumbers=[];
let previousImages=[[-1,-1,-1]];


let funcattempt=0;

let attempt = 1;
let maxAttempts = 5;

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
    productLabels[i]=products[i].pName;
    
}

function randomIndex() {
    return Math.floor(Math.random() * ProductImges.length);
}

let leftIndex ;
let middleIndex;
let rightIndex ;
let index=0;

//cheking if the index of any new image is similar to the previous iteration
function checkIndex(imageIndexCheck,previousIndex)
{
    for(let x=0;x<3;x++){
        
        if(imageIndexCheck==previousImages[previousIndex][x]){
           
        return true;}
        else {
        continue;}

        
    }
return false;
}
function checkSameIrritation(){
    // console.log('number of while times',funcattempt);
    
    leftIndex = randomIndex();
     middleIndex=randomIndex();
     rightIndex = randomIndex();
      
     while (leftIndex === rightIndex ||leftIndex === middleIndex || middleIndex === rightIndex) {
        leftIndex = randomIndex();
        middleIndex=randomIndex();
        rightIndex= randomIndex();
        console.log('inside the while of first function',leftIndex,middleIndex,rightIndex);
       

    }
}

function checkSameIrritation1(){
    console.log("index is before comparison",index)

    //cheking if the any index of any new image is similar to the previous iteration
    console.log(leftIndex,middleIndex,rightIndex);
        console.log("chking left index",checkIndex(leftIndex,index),leftIndex,previousImages[index]);
        console.log("chking middle index",checkIndex(middleIndex,index),middleIndex,previousImages[index]);
        console.log("chking right index",checkIndex(rightIndex,index),rightIndex,previousImages[index]);
        console.log("chking if while should work",checkIndex(leftIndex,index)||checkIndex(middleIndex,index)||checkIndex(rightIndex,index));
        console.log("index is before comparison",index)
    while(checkIndex(leftIndex,index)||checkIndex(middleIndex,index)||checkIndex(rightIndex,index)){
        console.log("while is working",leftIndex,middleIndex,rightIndex);
        console.log("cheking the while inside the while",checkIndex(leftIndex,index)||checkIndex(middleIndex,index)||checkIndex(rightIndex,index));
        checkSameIrritation();
        console.log('inside the while',leftIndex,middleIndex,rightIndex);
        funcattempt++;
    

    }

}

function renderRandomImg() {
    checkSameIrritation();
    checkSameIrritation1();
    readFromLocalStorage();
    
   
    previousImages.push([leftIndex,middleIndex,rightIndex]);
    
    


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

    index++;
}

renderRandomImg();

leftImgEl.addEventListener('click', handelClicks);
middleImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);
let buttonEl=document.createElement("button")
function handelClicks(event) {
    console.log("index click",index);
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
        
        
       
    } else { 
            buttonEl.addEventListener("click",listEl);
            buttonEl.textContent='View results';
            containerEl.appendChild(buttonEl);

        leftImgEl.removeEventListener('click', handelClicks);
        middleImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
        
        
    }
    
    attempt++;
    
    console.log(previousImages);
   
    
}
//table functions and list   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function listEl(){
let ulEl = document.getElementById('results');
        for (let i = 0; i < products.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${products[i].pName} has ${products[i].votes} votes and ${products[i].views} views .`
            ulEl.appendChild(liEl);
            
           
        }
        
        for (let i = 0; i < products.length; i++) {
            votesNumbers[i]=products[i].votes;



        }
        var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productLabels,
        datasets: [{
            label: '# of Votes',
            data: votesNumbers,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})

saveToLocalStorage();
buttonEl.removeEventListener("click",listEl);
}

function saveToLocalStorage() {
    let data = JSON.stringify(products);
    localStorage.setItem('products', data);

    
}

function readFromLocalStorage() {
    let stringObj = localStorage.getItem('products');
    // console.log(stringObj);
    let normalObj = JSON.parse(stringObj);
    
    // console.log(normalObj);
    if (normalObj !== null) {
        products = normalObj;
      
    }
    // console.log(Coffee.drinks);
}

//chart


