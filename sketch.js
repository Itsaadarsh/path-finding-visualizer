const cols = 20;
const rows = 20;
const grid = new Array(cols);
const openSet = [];
const closedSet = [];
var w, h;
var start, end, path;

class NodeSpot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.parent = null;
  }

  addNeighbors(gird) {
    if (this.i < cols - 1) this.neighbors.push(grid[this.i + 1][this.j]);
    if (this.i > 0) this.neighbors.push(grid[this.i - 1][this.j]);
    if (this.j < rows - 1) this.neighbors.push(grid[this.i][this.j + 1]);
    if (this.j > 0) this.neighbors.push(grid[this.i][this.j - 1]);
  }

  display(color) {
    fill(color);
    stroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
}

const heuristic = (a, b) => {
  // return dist(a.i, a.j, b.i, b.j); // Uclidiean Distance
  return abs(a.i - b.i) + abs(a.j - b.j);
};

function setup() {
  createCanvas(800, 800);
  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new NodeSpot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  // end = grid[cols - 1][rows - 1];
  end = grid[15][15];
  openSet.push(start);
}

function draw() {
  console.log(1);
  if (openSet.length > 0) {
    let startingIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[startingIndex].f) {
        startingIndex = i;
      }
    }
    var current = openSet[startingIndex];

    if (current === end) {
      noLoop();
    }

    const removeIndex = openSet.indexOf(current);
    if (removeIndex > -1) {
      openSet.splice(removeIndex, 1);
    }

    closedSet.push(current);

    const neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      if (!closedSet.includes(neighbors[i])) {
        const tempG = current.g + 1;
        if (openSet.includes(neighbors[i])) {
          if (tempG < neighbors[i].g) {
            neighbors[i].g = tempG;
          }
        } else {
          neighbors[i].g = tempG;
          openSet.push(neighbors[i]);
        }
        neighbors[i].h = heuristic(neighbors[i], end);
        neighbors[i].f = neighbors[i].g + neighbors[i].h;
        neighbors[i].parent = current;
      }
    }
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

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }
  for (let i = 0; i < path.length; i++) {
    path[i].display(color(0, 0, 255));
  }
}
