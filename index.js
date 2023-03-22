const sketchGrid = document.querySelector('.sketch-grid');
const resetButton = document.querySelector('#reset-button');

function draw(event) {
    if(event.target.classList.contains('sketch-grid')) return;
    const cell = event.target;
    cell.classList.add('colored');
    sketchGrid.addEventListener('mouseover', draw);
};

function endDraw() {
    sketchGrid.removeEventListener('mouseover', draw);
};

function reset() {
    Array.from(sketchGrid.children).forEach(cell => {
        cell.classList.remove('colored');
    })
};

for(let rowCell = 0; rowCell < 16; rowCell++) {
    for (let colCell = 0; colCell < 16; colCell++) {
        const newDiv = document.createElement('div');
        sketchGrid.appendChild(newDiv);
        sketchGrid.addEventListener('mousedown', draw);
        sketchGrid.addEventListener('mouseup', endDraw)
    };
};

resetButton.addEventListener('click', reset);
