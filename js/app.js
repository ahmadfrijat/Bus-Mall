'use strict';
//array to hold products
Product.allProducts = [];

//array to prevent previously displayed products
Product.lastShown = [];

//access the images from the DOM
var product1 = document.getElementById('product1');
var product2 = document.getElementById('product2');
var product3 = document.getElementById('product3');


//access the image section; because of the bubbling, it affects the individual images too. 
var picturesFigure = document.getElementById('picturesFigure');

//results element
var ulEl = document.getElementById('results');

//click tracker
Product.totalClicks = 0;

//product constructor
function Product (filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.shown = 0;
  this.clicks = 0;
  Product.allProducts.push(this);
}


//new instances of products
new Product('img/assets/bag.jpg','r2d2-suitcase');
new Product('img/assets/banana.jpg', 'bananaCutter');
new Product('img/assets/bathroom.jpg', 'tPiPad');
new Product('img/assets/boots.jpg', 'noRainBoots');
new Product('img/assets/breakfast.jpg', 'breakfastMaker');
new Product('img/assets/bubblegum.jpg', 'meatGum');
new Product('img/assets/chair.jpg', 'chair');
new Product('img/assets/cthulhu.jpg', 'cthulhu');
new Product('img/assets/dog-duck.jpg', 'dogBeak');
new Product('img/assets/dragon.jpg', 'dragonMeat');
new Product('img/assets/pen.jpg', 'uPencils');
new Product('img/assets/pet-sweep.jpg', 'dogMop');
new Product('img/assets/scissors.jpg', 'pizzaScissors');
new Product('img/assets/shark.jpg','sharkAttack');
new Product('img/assets/sweep.png', 'babyMop');
new Product('img/assets/tauntaun.jpg', 'hothSleepingBag');
new Product('img/assets/unicorn.jpg', 'unicornMeat');
new Product('img/assets/usb.gif', 'tenticleUsb');
new Product('img/assets/water-can.jpg', 'noWaterCan');
new Product('img/assets/wine-glass.jpg', 'wineGlass');



function randomProduct() {
  //create 3 random indices
  var randomProduct1= Math.floor(Math.random()* Product.allProducts.length);
  var randomProduct2= Math.floor(Math.random()* Product.allProducts.length);
  var randomProduct3= Math.floor(Math.random()* Product.allProducts.length);


  while( randomProduct1 === randomProduct2
    || randomProduct2 === randomProduct3
    || randomProduct1 === randomProduct3
    || Product.lastShown.includes(randomProduct1)
    || Product.lastShown.includes(randomProduct2)
    || Product.lastShown.includes(randomProduct3)){
    randomProduct1= Math.floor(Math.random()* Product.allProducts.length);
    randomProduct2= Math.floor(Math.random()* Product.allProducts.length);
    randomProduct3= Math.floor(Math.random()* Product.allProducts.length);
    console.log('duplicate was caught');
  }

  //push images to DOM
  product1.src = Product.allProducts[randomProduct1].filepath;
  product1.alt = Product.allProducts[randomProduct1].name;
  product2.src = Product.allProducts[randomProduct2].filepath;
  product2.alt = Product.allProducts[randomProduct2].name;
  product3.src = Product.allProducts[randomProduct3].filepath;
  product3.alt = Product.allProducts[randomProduct3].name;

  //increment views
  Product.allProducts[randomProduct1].shown++;
  Product.allProducts[randomProduct2].shown++;
  Product.allProducts[randomProduct3].shown++;

  Product.lastShown = [];
  Product.lastShown.push(randomProduct1);
  Product.lastShown.push(randomProduct2);
  Product.lastShown.push(randomProduct3);
}
function productClick(event){
  Product.totalClicks++;
  //use for loop to find image being clicked
  for(var i in Product.allProducts){
    if(event.target.alt === Product.allProducts[i].name){
      Product.allProducts[i].clicks++;
    }
  }
  if (Product.totalClicks > 24){
    picturesFigure.removeEventListener('click', productClick);
    showResults();
  }else{
    randomProduct();
  }
}

function showResults(){
  for(var i in Product.allProducts){
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].name + ' was clicked ' + Product.allProducts[i].clicks + ' out of ' + Product.allProducts[i].shown + ' times shown.';
    ulEl.appendChild(liEl);
  }
}


picturesFigure.addEventListener('click', productClick);

randomProduct();