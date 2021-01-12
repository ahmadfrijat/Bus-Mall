'use strict'
//========================================================================================================================
// VAIRIABLS AND DATA 
//=========================================================================================================================




var imagePaths  = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "usb.gif",
  "water-can.jpg",
  "wine-glass.jpg"
];
var counter = 0;
var leftImage = document.querySelector("#left");
var middleImage = document.querySelector("#middle");
var rightImage = document.querySelector("#right");
var imageSection = document.querySelector("#imageSection");
var showing = document.querySelector("#showing");
Product.all = [];
// creat constructor function to the bus mall project:
function Product(path) {
  var pathArr = path.split(".");
  this.name = pathArr[0];
  this.imagePath = `img/${this.name}.${pathArr[1]}`;
  this.voting = 0;
  this.views = 0;
  Product.all.push(this);
}


for (var i = 0; i < imagePaths .length; i++) {
  new Product(imagePaths [i]);
}
//========================================================================================================================
// FUNCTIONALITY
//=========================================================================================================================
var previousIndexs = [];
function getUniqueIndex() {
  var index = randomNumber(0, Product.all.length - 1);
  while (previousIndexs.includes(index)) {
    index = randomNumber(0, Product.all.length - 1);
  }
  previousIndexs.push(index);
  if (previousIndexs.length > 3) {
    previousIndexs.shift();
  }
  return index;
}

function render() {
  var leftSales = Product.all[getUniqueIndex()];
  var middleSales = Product.all[getUniqueIndex()];
  var rightSales = Product.all[getUniqueIndex()];
  
  leftSales.views++;
  middleSales.views++;
  rightSales.views++;

  leftImage.setAttribute("src", leftSales.imagePath);
  leftImage.setAttribute("alt", leftSales.name);
  leftImage.setAttribute("title", leftSales.name);

  middleImage.setAttribute("src", middleSales.imagePath);
  middleImage.setAttribute("alt", middleSales.name);
  middleImage.setAttribute("title", middleSales.name);

  rightImage.setAttribute("src", rightSales.imagePath);
  rightImage.setAttribute("alt", rightSales.name);
  rightImage.setAttribute("title", rightSales.name);


}
var button = document.getElementById('but');
render();
function handleClick(e) {
  counter++;
  if (counter < 25) {
    if (e.target.id !== "imageSection") {
      for (let x = 0; x < Product.all.length; x++) {
        if (e.target.title === Product.all[x].name) {
          Product.all[x].voting++;
        }
      }
      updateList();
      render();
    }
  }
  if (counter == 25) {
    button.addEventListener('click', showChartAndList);
    button.addEventListener('click', updateList);
    //showChartAndList();
   // updateList();
  }
}

imageSection.addEventListener("click", handleClick);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function showChartAndList() {
  var votes = [];
  var view = [];
  var labels = [];
  var container = document.getElementById("showing");
  var ulEl = document.createElement("ul");
  container.appendChild(ulEl);
  for (let z = 0; z < Product.all.length; z++) {
    var liEl = document.createElement("li");
    ulEl.appendChild(liEl);
    liEl.textContent = `${Product.all[z].name} had ${Product.all[z].voting} clicks and was shown ${Product.all[z].views} times`;
    labels.push(Product.all[z].name)
    votes.push(Product.all[z].voting);
    view.push(Product.all[z].views);
  }

  var ctx = document.getElementById("myChart").getContext('2d');
  var voteData = {
    label: "# of clicks",
    data: votes,
    backgroundColor: '#404040',
  };

  var viewsData = {
    label: "# of Views",
    data: view,
    backgroundColor: '#0040ff',
  };

  var labelsInfo = {
    labels: labels ,
    datasets: [voteData, viewsData]
  };

  var chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: labelsInfo,
    options: chartOptions,
  });
}

function updateList(){
  var listString = JSON.stringify(Product.all);
  localStorage.setItem("productOrders",listString);
}
function getList(){
  var listString = localStorage.getItem("productOrders");
  if(listString){
    Product.all = JSON.parse(listString);
  }
}


getList();