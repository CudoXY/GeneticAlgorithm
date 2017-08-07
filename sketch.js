// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
var lifespan = 400;
var count = 0;
var target;
var maxforce = 0.2;
var mutationRate = 0.01;
var generationCount = 1;
var averageFitness = 0;

var canvasWidth = 800;
var canvasHeight = 450;

var rw = 20;
var rh = 250;

var rx = 0;
var ry = 0;

var rx2 = 800 / 1.5;
var ry2 = 0;

var rx3 = 800 / 2.8;
var ry3 = 200;

var lifeP;
var totalGenerationsP;
var mutationRateP;
var totalPopulationP;
var averageFitnessP;

var graphDiagonal;
var resultWithDiagonals;
var resultWithDiagonals2;

var wall = [];


function setup() {
  createCanvas(canvasWidth, canvasHeight);

  population = new Population();

  lifeP = createP();
  totalGenerationsP = createP();
  averageFitnessP = createP();
  mutationRateP = createP();
  totalPopulationP = createP();

  target = new Target(createVector(80, 425), 50, 50);

  wall.push(new Wall(rx, ry, rw, rh));
  wall.push(new Wall(rx2, ry2, rw, rh));
  wall.push(new Wall(rx3, ry3, rw, rh));

  // Bounds
  wall.push(new Wall(-10, 0, 10, canvasHeight));
  wall.push(new Wall(canvasWidth + 20, 0, 10, canvasHeight));
  wall.push(new Wall(0, -10, canvasWidth, 10));
  wall.push(new Wall(0, canvasHeight + 20, canvasWidth, 10));

  // configure a-star
  var stage = [];

  for (var x = 0; x < 800; x++)
  {
    var row = [];
    for (var y = 0; y < 450; y++)
    {
      var isHit = false;
      for (var i = 0; i < wall.length; i++)
      {
        if (!wall[i].isColliding(x, y, 1, 1))
          continue;

        isHit = true;
        break;
      }

      row.push(isHit ? 0 : 1);
    }
    stage.push(row);
  }
  graphDiagonal = new Graph(stage, { diagonal: false });

  var start = graphDiagonal.grid[100][20];
  var start2 = graphDiagonal.grid[350][300];
  var end = graphDiagonal.grid[target.vector.x][target.vector.y];
  resultWithDiagonals = astar.search(graphDiagonal, start, end);
  resultWithDiagonals2 = astar.search(graphDiagonal, start2, end, { heuristic: astar.heuristics.diagonal });

  console.log(resultWithDiagonals);
  console.log(resultWithDiagonals2);

}

function draw() {
  background(0);
  population.draw();

  totalGenerationsP.html("Total Generations: " + generationCount);
  lifeP.html("Iterations: " + count);
  averageFitnessP.html("Average Fitness: " + averageFitness);
  mutationRateP.html("Mutation Rate: " + (mutationRate * 100) + "%");
  totalPopulationP.html("Total Population: " + population.popsize);

  var isAllDead = population.isAllDead();
  count++;

  if (isAllDead || count == lifespan) {
    population.evaluate();
    population.selection();
    averageFitness = nf(population.averageFitness);
    //population = new Population();
    count = 0;
    generationCount++;

  }

  // Draw wall
  for (var i = 0; i < wall.length; i++)
    wall[i].draw();

  // Draw target
  target.draw();

  // Draw a-star
  fill('yellow');
  noStroke();

  for (var i = 0; i < resultWithDiagonals.length; i++)
    rect(resultWithDiagonals[i].x, resultWithDiagonals[i].y, 1, 1);

  for (var i = 0; i < resultWithDiagonals2.length; i++)
    rect(resultWithDiagonals2[i].x, resultWithDiagonals2[i].y, 1, 1);
}
