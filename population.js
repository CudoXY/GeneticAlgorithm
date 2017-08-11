// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population() {
  this.rockets = [];
  this.popsize = 25;
  this.matingpool = [];
  this.averageFitness = 0;

  this.minFitResult;
  this.maxFitResult;


  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {

    // get the maximum fitness
    var maxfit = 0;
    var maxIndex = -1;
    var minfit = 999999;
    var minIndex = -1;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
        maxIndex = i;
      }

      if (this.rockets[i].fitness < minfit)
      {
        minfit = this.rockets[i].fitness;
        minIndex = i;
      }
    }

    console.log('minfit rocket = ' + this.rockets[minIndex].pos.x + ', ' + this.rockets[minIndex].pos.y);
    console.log('minfit = ' + minfit);
    console.log('minfit astar length = ' + this.rockets[minIndex].resultWithDiagonals.length);
    this.minFitResult = this.rockets[minIndex].resultWithDiagonals;
    console.log('maxfit rocket = ' + this.rockets[maxIndex].pos.x + ', ' + this.rockets[maxIndex].pos.y);
    console.log('maxfit = ' + maxfit);
    this.maxFitResult = this.rockets[maxIndex].resultWithDiagonals;
    console.log('maxfit astar length = ' + this.rockets[maxIndex].resultWithDiagonals.length);

    // get the average fitness
    var total = 0;
    for (var i = 0; i < this.rockets.length; i++) {
      total += this.rockets[i].fitness;
    }
    
    // normalization of fitnes
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    console.log(total + " / " + (this.rockets.length));
    this.averageFitness = total / (this.rockets.length);


    ////// for debugging
    var avgAS = 0;
    var total = 0;
    for(var i=0; i<this.rockets.length; i++){
      total += this.rockets[i].resultWithDiagonals.length;
    }
    avgAS = total / (this.rockets.length);


    addRow(generationCount, maxfit, this.averageFitness, minfit, this.maxFitResult.length, this.minFitResult.length, avgAS);
    ////// end - for debugging

    // generate mating pool
    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;

      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.isAllDead = function() {
    for (var i = 0; i < this.popsize; i++) {
      if (!this.rockets[i].crashed && !this.rockets[i].complete)
        return false;
    }
    
    return true;
  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;

      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.draw = function() {

    // var maxIndex = -1;
    // var maxfit = 0;
    // for (var i = 0; i < this.popsize; i++) {
    //   this.rockets[i].calcFitness();
    //   if (this.rockets[i].fitness > maxfit) {
    //     maxfit = this.rockets[i].fitness;
    //     maxIndex = i;
    //   }
    // }

    // for (var i = 0; i < this.popsize; i++) {
    //   this.rockets[i].update();

    //   if (maxIndex == i)
    //     fill(0, 0, 255, 150);
    //   else
    //     fill(255, 150);
    //   this.rockets[i].draw();
    // }



      fill(255, 150);
      for (var i = 0; i < this.popsize; i++) {
        this.rockets[i].update();
        this.rockets[i].draw();
      }

      if (!this.minFitResult)
        return;


      // Draw a-star
      fill('red');
      noStroke();
      for (var i = 0; i < this.minFitResult.length; i++)
        rect(this.minFitResult[i].x, this.minFitResult[i].y, 1, 1);

      fill('green');
      for (var i = 0; i < this.maxFitResult.length; i++)
        rect(this.maxFitResult[i].x, this.maxFitResult[i].y, 1, 1);

  }
}
