const cols = 60;
const rows = 60;
const grid = new Array(cols);
const openSet = [];
const closedSet = [];
var w, h, start, end, path;

class NodeSpot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.parent = null;
    this.wall = false;
    if (random(1) > 0.5) this.wall = true;
  }

  addNeighbors(grid) {
    // Up, Down, Left, Right
    if (this.i < cols - 1) this.neighbors.push(grid[this.i + 1][this.j]);
    if (this.i > 0) this.neighbors.push(grid[this.i - 1][this.j]);
    if (this.j < rows - 1) this.neighbors.push(grid[this.i][this.j + 1]);
    if (this.j > 0) this.neighbors.push(grid[this.i][this.j - 1]);

    // Diagonal
    if (this.i > 0 && this.j > 0) this.neighbors.push(grid[this.i - 1][this.j - 1]);
    if (this.i < cols - 1 && this.j > 0) this.neighbors.push(grid[this.i + 1][this.j - 1]);
    if (this.i > 0 && this.j < rows - 1) this.neighbors.push(grid[this.i - 1][this.j + 1]);
    if (this.i < cols - 1 && this.j < rows - 1) this.neighbors.push(grid[this.i + 1][this.j + 1]);
  }

  display(color) {
    fill(color);
    if (this.wall) fill(0);
    stroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
}

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
  end = grid[cols - 1][rows - 1];
  end.wall = false;
  start.wall = false;
  openSet.push(start);
  noLoop();
}

const heuristic = (a, b) => {
  return abs(a.i - b.i) + abs(a.j - b.j);
};

const start_finder = () => {
  loop();
};

const stop_finder = () => {
  noLoop();
};

const reset_finder = () => {
  location.reload();
};

function mousePressed() {}

function draw() {
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

    for (let i = 0; i < start.neighbors.length; i++) {
      start.neighbors[i].wall = false;
      end.neighbors[i].wall = false;
    }

    const neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      if (!closedSet.includes(neighbors[i]) && !neighbors[i].wall) {
        const tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbors[i])) {
          if (tempG < neighbors[i].g) {
            neighbors[i].g = tempG;
            newPath = true;
          }
        } else {
          neighbors[i].g = tempG;
          openSet.push(neighbors[i]);
          newPath = true;
        }
        if (newPath) {
          neighbors[i].h = heuristic(neighbors[i], end);
          neighbors[i].f = neighbors[i].g + neighbors[i].h;
          neighbors[i].parent = current;
        }
      }
    }
  } else {
    noLoop();
    return;
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

  end.display(color(251, 112, 20));

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
