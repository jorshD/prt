let font;
let vehicles = [];
let r, k, n, d;
// let sliderN, sliderD;


function setup() {

  createCanvas(500, 500);

  colorMode(HSB);
  // sliderN = createSlider(0, 10, 4, 1);
  // sliderD = createSlider(0, 10, 8, 1);
  n = floor(random(0, 20));
  d = floor(random(1, 20));
  k = n/d;
  show();


  }

function show(){
  for (var angle = 0; angle < TWO_PI*d; angle += 0.023) {
    r = 100 * cos(k*angle);
    let x = r * cos(angle);
    let y = r * sin(angle);
    let vehicle = new Vehicle(x+width/2, y+height/2, r);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(5);
  for (var i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.update();

    v.show();
    v.behaviors();

  }

}
