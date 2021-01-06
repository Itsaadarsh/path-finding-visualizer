function setup() {
    createCanvas(1400, 800);
    
}

function draw() {
    for (let i = 0; i < 70; i++) {
        for (let j = 0; j < 80; j++) {
            strokeWeight(1);
            stroke(51);
            rect(i*20,j*10,140,80);
        }
    }
}