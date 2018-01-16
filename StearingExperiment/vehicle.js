
function Vehicle(x, y, h){

  this.pos = createVector(x, y);
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxSpeed = 6;
  this.maxForce = 1;
  this.h = map(h, 0, width, 0, 255);

}

Vehicle.prototype.bounce = function(){
  if (this.pos.x < 0 || this.pos.x > width) {
    this.vel.mult(-1);
  }if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.mult(-1);
  }
}

Vehicle.prototype.behaviors = function(){
  let arrive = this.arrive(this.target);
  let mouse = createVector(mouseX, mouseY);
  let flee = this.flee(mouse);

  arrive.mult(random(0,2.9));
  flee.mult(random(0,12));

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f){
  this.acc.add(f);
}

Vehicle.prototype.update = function(){
  this.bounce();
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}


Vehicle.prototype.show = function(){


  //stroke(this.h, 100, 200, 10);
  //strokeWeight(2);

  fill(this.h, 65, 90);
  noStroke();
  ellipse(this.pos.x, this.pos.y, 2, 2);


}

Vehicle.prototype.arrive = function(target){
  let desired = p5.Vector.sub(target, this.pos);
  let d = desired.mag();
  let speed = this.maxSpeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  let steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

Vehicle.prototype.seek = function(target){
  let desired = p5.Vector.sub(target, this.pos);
  desired.setMag(this.maxSpeed);
  let steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

Vehicle.prototype.flee = function(target){
  let desired = p5.Vector.sub(target, this.pos);
  let d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }else {
    return createVector(0, 0);
  }
}
