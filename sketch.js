const cols = 5;
const rows = 5;
const grid = new Array(cols);
const openSet = [];
const closedSet = [];
var w, h;
var start, end;

class NodeSpot {
  constructor(i, j) {
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }

  display(color) {
    fill(color);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

function setup() {
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new NodeSpot(i, j);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  openSet.push(start);
}

function draw() {
  if (openSet.length > 0) {
    const startingIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[startingIndex].f) {
        startingIndex = i;
      }
    }
    let current = openSet[startingIndex];

    if (current === end) {
      console.log('DONE');
    }

    const removeIndex = openSet.indexOf(current);
    if (removeIndex > -1) {
      openSet.splice(removeIndex, 1);
    }

    closedSet.push(current);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].display(color(255));
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].display(color(255, 0, 0));
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].display(color(0, 255, 0));
  }
}
