function Target(vector, w, h)
{
	this.width = w;
	this.height = h;
	this.vector = vector;

  	this.draw = function()
  	{
        noStroke();
		fill(255);
		ellipse(this.vector.x, this.vector.y, this.width, this.height);
	}
}