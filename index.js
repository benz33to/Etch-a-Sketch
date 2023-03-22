const sketchGrid = document.querySelector('.sketch-grid');
const resetButton = document.querySelector('#reset-button');
const squareNumberButton = document.querySelector('#square-number-button');
let squareColor = getRandomColor();

function getRandomColor() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
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

function resetDrawing() {
    Array.from(sketchGrid.children).forEach(square => {
        square.style.backgroundColor = 'white';
    })
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
buildGrid()

