let line1;
let line2;

function setup() {
  pixelDensity(1);
  canvasIMG = createCanvas(window.windowWidth, window.windowHeight);

line1 = {x1: 10, y1: 10, x2: width-10, y2: height-10};
line2 = {x1: 10, y1: height-10, x2: width-10, y2: 10};

}

function draw() {
  background(255, 0, 0);


//fixed line
  line(line1.x1,line1.y1, line1.x2, line1.y2);

//update end points

line2.x2 = mouseX;
line2.y2 = mouseY;

//moving line
line(line2.x1, line2.y1, line2.x2, line2.y2);

let posi = intersect(line1.x1,line1.y1, line1.x2, line1.y2,
  line2.x1, line2.y1, line2.x2, line2.y2);

if(posi){
circle(posi.x, posi.y, 50);
}
}

function windowResized() {
  resizeCanvas(window.windowWidth, window.windowHeight);
  resetCanvas();
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return {x, y}
}