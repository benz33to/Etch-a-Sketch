// Initialization
const sketchGrid = document.querySelector('.sketch-grid');
const resetButton = document.querySelector('#reset-button');
const squareNumberButton = document.querySelector('#square-number-button');
let shade = 0;
let squareColor = '';

// Functions
// Calculates a random color rgb value and applies shade on each brush stroke, when shade = 1 color is black
function getRandomColor() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const g = randomBetween(0, 255) * (1 - shade);
    const b = randomBetween(0, 255) * (1 - shade);
    const r = randomBetween(0, 255) * (1 - shade);
    if (shade < 1) shade+=0.1; // Increase shade value
    return `rgb(${r},${g},${b})`;
}

function draw(event) {
    if (!event.target.classList.contains('square')) return; // Do nothing if target event is not a square
    const square = event.target;
    square.style.backgroundColor = squareColor;
    sketchGrid.addEventListener('mouseover', draw);
};

function endDraw() {
    squareColor = getRandomColor();
    sketchGrid.removeEventListener('mouseover', draw);
};

function initColors() {
    shade = 0.1;
    squareColor = getRandomColor();
}

function resetDrawing() {
    Array.from(sketchGrid.children).forEach(square => {
        square.style.backgroundColor = 'white';
    });
    initColors();
};

function changeGrid() {
    const squareNumber = Number(prompt('How many squares should the sketch have?', ''));
    if (isNaN(squareNumber) || squareNumber === 0) return; // Do nothing if squareNumber is null or not a number
    if (squareNumber > 100) return alert(`This grid has a limit of ${squareNumber} cells per side!`); // Show warning if squareNumber surpasses limit
    rebuildGrid(squareNumber);
    alert(`Grid now has ${squareNumber} cells per side!`);
}

function rebuildGrid(squareNumber) {
    while (sketchGrid.firstChild) {
        sketchGrid.firstChild.remove();
    }
    buildGrid(squareNumber);
    initColors();
}

function buildGrid (cells = 16) {
    sketchGrid.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
    for (let rowCell = 0; rowCell < cells; rowCell++) {
        for (let colCell = 0; colCell < cells; colCell++) {
            const newDiv = document.createElement('div');
            newDiv.addEventListener('mousedown', (e) => e.preventDefault()); // Prevents drag pointer to appear
            newDiv.classList.add('square');
            sketchGrid.appendChild(newDiv);
            sketchGrid.addEventListener('mousedown', draw);
            sketchGrid.addEventListener('mouseup', endDraw);
        };
    };
}

// Listeners
resetButton.addEventListener('click', resetDrawing);
squareNumberButton.addEventListener('click', changeGrid);

// Build grid
initColors();
buildGrid();

