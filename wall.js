function Wall(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.margin = 10;

  	this.draw = function()
  	{
      noStroke();
	  fill('red');
	  rectMode(CORNER);
	  rect(x, y, w, h);
	}

	this.isColliding = function(x, y, width, height)
	{
		return collideRectRect(
			this.x,this.y,this.width, this.height,
			x - this.margin, y - this.margin, width + this.margin * 2, height + this.margin * 2);
	}
}