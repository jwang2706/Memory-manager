// ------------------- P5.js -------------------
let canvasWidth = 900;
let canvasHeight = 250;
let margin = 40;

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');
    noStroke();
    textFont('Arial');
    textSize(14);
    textAlign(CENTER, CENTER);

    document.getElementById('allocateBtn').addEventListener('click', () => {
        let input = document.getElementById('processSize');
        let dim = parseInt(input.value, 10);
        if (!isNaN(dim)) {
            alloca(dim);
            aggiornaStatistiche();
        }
    });
}

function draw() {
    background('#2d2d2d');

    let barY = 80;
    let barH = 60;

    for (let b of blocchi) {
        let x = margin + map(b.inizio, 0, MEMORIA_TOTALE, 0, width - 2 * margin);
        let w = map(b.dimensione, 0, MEMORIA_TOTALE, 0, width - 2 * margin);

        if (b.libero) fill(0, 200, 100, 200);  // verde
        else fill(255, 150, 0, 200);           // arancione

        rect(x, barY, w, barH, 5);

        fill(255);
        if (w > 40) {
            if (b.libero) text(b.dimensione + " KB", x + w/2, barY + barH/2);
            else text("P " + b.dimensione + " KB", x + w/2, barY + barH/2);
        }
    }

    // Linea scala
    stroke(150);
    line(margin, barY + barH + 5, width - margin, barY + barH + 5);
    noStroke();
    fill(200);
    textAlign(LEFT);
    text("0", margin - 5, barY + barH + 25);
    textAlign(RIGHT);
    text(MEMORIA_TOTALE + " KB", width - margin + 5, barY + barH + 25);
}

function mouseClicked() {
    if (mouseY > 80 && mouseY < 140) { // barra verticale
        for (let i = 0; i < blocchi.length; i++) {
            let b = blocchi[i];
            let xInizio = margin + map(b.inizio, 0, MEMORIA_TOTALE, 0, width - 2 * margin);
            let xFine = xInizio + map(b.dimensione, 0, MEMORIA_TOTALE, 0, width - 2 * margin);
            if (mouseX >= xInizio && mouseX <= xFine) {
                if (!b.libero) {
                    libera(i);
                    aggiornaStatistiche();
                }
                break;
            }
        }
    }
}

// Carica un esempio iniziale
window.addEventListener('load', () => {
    setTimeout(() => {
        alloca(80);
        alloca(50);
        alloca(30);
        aggiornaStatistiche();
    }, 100);
});
