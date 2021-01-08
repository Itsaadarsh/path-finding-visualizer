const cols = 30;
const rows = 30;
const grid = new Array(cols);
var w, h, start, end, path;

class NodeSpot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.dist = Infinity;
    this.neighbors = [];
    this.previous = null;
    this.isWall = false;
    this.isVisited = false;
    if (random(1) > 0.7) this.isWall = true;
  }

  addNeighbors(grid) {
    // Up, Down, Left, Right
    if (this.i < cols - 1) this.neighbors.push(grid[this.i + 1][this.j]);
    if (this.i > 0) this.neighbors.push(grid[this.i - 1][this.j]);
    if (this.j < rows - 1) this.neighbors.push(grid[this.i][this.j + 1]);
    if (this.j > 0) this.neighbors.push(grid[this.i][this.j - 1]);

    // Diagonal
    // if (this.i > 0 && this.j > 0) this.neighbors.push(grid[this.i - 1][this.j - 1]);
    // if (this.i < cols - 1 && this.j > 0) this.neighbors.push(grid[this.i + 1][this.j - 1]);
    // if (this.i > 0 && this.j < rows - 1) this.neighbors.push(grid[this.i - 1][this.j + 1]);
    // if (this.i < cols - 1 && this.j < rows - 1) this.neighbors.push(grid[this.i + 1][this.j + 1]);
  }

  display(color) {
    fill(color);
    if (this.isWall) {
      fill('#222831');
    }
    stroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
}

var Q = [];
function setup() {
  let cnv = createCanvas(800, 800);
  cnv.position(120, 60);
  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new NodeSpot(i, j);
      Q.push(grid[i][j]);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  end.isWall = false;
  start.isWall = false;
  noLoop();
}
function draw() {
  // Dijkstra Algorithm
  for (let i = 0; i < start.neighbors.length; i++) {
    start.neighbors[i].isWall = false;
    end.neighbors[i].isWall = false;
  }

  const visitedNodes = dijkstraAlgo();
  path = [];
  let temp = end;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].display(color('#ececec'));
    }
  }

  end.display(color('#ff0000'));

  for (let i = 0; i < visitedNodes.length; i++) {
    visitedNodes[i].display(color('pink'));
  }

  for (let i = 0; i < path.length; i++) {
    path[i].display(color('green'));
  }
}

const dijkstraAlgo = () => {
  const visited = [];
  start.dist = 0;
  while (Q.length != 0) {
    Q.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
    const current = Q.shift();
    if (current.isWall) continue;
    if (current.dist === Infinity) {
      console.log('1 here');
      return visited;
    }
    current.isVisited = true;
    visited.push(current);
    if (current === end) {
      console.log('2 here');
      return visited;
    }
    const unvisitedNei = current.neighbors.filter(nei => !nei.isVisited);
    for (const nei of unvisitedNei) {
      nei.dist = current.dist + 1;
      nei.previous = current;
    }
  }
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
