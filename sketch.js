const cols = 5;
const rows = 5;
const grid = new Array(cols);

class NodeSpot {
  constructor() {
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new NodeSpot();
    }
  }
}

function draw() {
  background(0);
}
