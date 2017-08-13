// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Rocket(dna) {
  this.width = 20;
  this.height = 20;
  this.pos = createVector(width - 70, 70);
  this.nextPos = createVector(width - 70, 70);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;

  this.time = 0;
  this.fitness = 0;

  this.resultWithDiagonals = [];

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {

    // var d = dist(this.pos.x, this.pos.y, target.vector.x, target.vector.y);

    // if (this.completed)
    //   d = 1;

    // this.fitness = 1 / d * this.time;
    // // this.fitness = map(d, 0, width, width, 0);

    // if (this.completed) {
    //   this.fitness *= 2;
    // }
    // if (this.crashed) {
    //   this.fitness /= 2;
    // }


    // if (!calculatedPaths) calculatedPaths = [];
    // let distance = aStarDistance(organism.object.pos, target);
    // let fitness = weightedResult(organism, target, distance);
    // return fitness;

    var start = graphDiagonal.grid[floor(this.pos.x)][floor(this.pos.y)];
    var end = graphDiagonal.grid[target.vector.x][target.vector.y];

    if (start != end)
    {
      this.resultWithDiagonals = astar.search(graphDiagonal, start, end, { closest: true });
      this.fitness = 1/ this.resultWithDiagonals.length;
    }
    else
    {
      this.fitness = 1;
    }

    this.fitness /= this.time;

    if (this.completed)
      this.fitness *= 100;

  }

  this.update = function() {

    if (this.completed)
      return;

    try
    {
      var d = dist(this.pos.x, this.pos.y, target.vector.x, target.vector.y);
      if (d < 20) {
        this.completed = true;
        this.pos = target.vector.copy();
        return;
      }

      if (!this.completed) {

        this.applyForce(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.nextPos.add(this.vel);

        var isHit = false;
        for (var i = 0; i < wall.length; i++)
          if (wall[i].isColliding(this.nextPos.x, this.nextPos.y, this.width, this.height))
          {
            isHit = true;
            // this.crashed = true;
            // return;
            break;
          }

        if (isHit)
        {
          this.nextPos = this.pos.copy();
          this.vel.limit(0);
        }
        else
          this.pos.add(this.vel);
        
        this.acc.mult(0);
        this.vel.limit(4);
      }
    }
    finally
    {

      this.time = count;
    }

  }

  this.draw = function() {
    push();
    noStroke();
    // fill(255, 150);
    translate(this.pos.x, this.pos.y);
    // rotate(this.vel.heading());
    // rectMode(CENTER);
    ellipse(0, 0, this.width, this.height);
    pop();

    // Draw a-star
    // fill('yellow');
    // noStroke();

    // for (var i = 0; i < resultWithDiagonals.length; i++)
    //   rect(resultWithDiagonals[i].x, resultWithDiagonals[i].y, 1, 1);
  }

}
