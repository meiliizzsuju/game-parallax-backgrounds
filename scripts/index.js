const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800; // matched with CSS
const CANVAS_HEIGHT = canvas.height = 700; // matched with CSS
console.log(ctx)


let gameSpeed = 5; // allow dynamic update

const bg_layer1 = new Image(); // JS build-in constructor == <img>, now blank
bg_layer1.src = './assets/layer-1.png';
const bg_layer2 = new Image();
bg_layer2.src = './assets/layer-2.png';
const bg_layer3 = new Image();
bg_layer3.src = './assets/layer-3.png';
const bg_layer4 = new Image();
bg_layer4.src = './assets/layer-4.png';
const bg_layer5 = new Image();
bg_layer5.src = './assets/layer-5.png';


/* comment out the manual way
let x = 0;
let x2 = 2400;

function animate(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT) // clear draw from top left to the with and hight ended

  // put first image on top left
  ctx.drawImage(bg_layer4, x , 0) // building Canvas method, take image and put it to Canvas
  //x--; // bg will keep moving to the left(-x) by 1px per frame, we can still see all the frame > need to clear prev frame to be able to see the bg movment

  ctx.drawImage(bg_layer4,x2,0) // to make it seamless
  if(x < -2400){ // 2400 == image width
    x = 2400 + x2 - gameSpeed // reset
  } else {
    x = x - gameSpeed;
  }

  if(x2 < -2400){ 
    x2 = 2400 + x - gameSpeed
  } else {
    x2 = x2 - gameSpeed;
  }
  // ^ this will run forever but still see the blank frame, so we need to have another of the same image to make seemless bg
  requestAnimationFrame(animate) // make animate run over and over
}

animate()
*/


// create a class as blueprint for BG objects
class Layer {
  constructor(image,speedModifier){
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image; // pass from constructoe
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier;
  }

  update(){
    this.speed = gameSpeed * this.speedModifier;
    if(this.x <= -this.width){
      this.x = this.width + this.x2 - this.speed;
    }
    if(this.x2 <= -this.width){
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }

  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image,this.x2,this.y,this.width,this.height);
  }
}

const layer1 = new Layer(bg_layer1,0.2);
const layer2 = new Layer(bg_layer2,0.4);
const layer3 = new Layer(bg_layer3,0.6);
const layer4 = new Layer(bg_layer4,0.8);
const layer5 = new Layer(bg_layer5,1);

const gameObjects = [layer1,layer2,layer3,layer4,layer5]

function animate(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  gameObjects.forEach( obj =>{
    obj.update();
    obj.draw();
  });
  requestAnimationFrame(animate);
}

animate();