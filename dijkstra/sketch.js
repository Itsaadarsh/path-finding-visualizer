const cols = 50;
const rows = 50;
const grid = new Array(cols);
var w, h, start, end, path;

class NodeSpot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.previous = null;
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
    if (this.wall) {
      fill('#222831');
    }
    stroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
}

function setup() {
  let cnv = createCanvas(800, 800);
  cnv.position(120, 60);
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
  noLoop();
}

function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].display(color('#ececec'));
    }
  }

  end.display(color('#ff0000'));
}

const dijkstraAlgo = () => {};

const start_finder = () => {
  loop();
};

const stop_finder = () => {
  noLoop();
};

const reset_finder = () => {
  location.reload();
};
