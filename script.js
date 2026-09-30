
const pieces = document.querySelectorAll('.piece-box > [class^="piece"]');
const slots = document.querySelectorAll('.puzzle-slot');
const successMsg = document.getElementById('success-message');
const nextBtn = document.getElementById('next-button');

nextBtn.addEventListener('click', () => {
    window.location.href = 'result.html';
});

let draggedPiece = null;

function randomizePieces() {
    const pieceBox = document.querySelector('.piece-box');

   const positions = [
    [-280, 0],
    [1120, 30],
    [-400, 300],
    [960, 300],
    [-200, 600],
    [1020, 600],
    [-40, 100],
    [-100, 380],
    [860, -60]
    ];

    positions.sort(() => Math.random() - 0.5);

    pieces.forEach((piece, index) => {
        piece.style.left = positions[index][0] + 'px';
        piece.style.top = positions[index][1] + 'px';
    });
}

randomizePieces();


pieces.forEach(piece => {
    piece.addEventListener('dragstart', (e) => {
        draggedPiece = e.target;
    });
    
});

slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    slot.addEventListener('drop', (e) => {
        e.preventDefault();

        if (slot.children.length === 0) {
            slot.appendChild(draggedPiece);
            
            checkPuzzleComplete();
        }
    });
});


function checkPuzzleComplete() {
    let correctCount = 0;

    slots.forEach((slot,index) => {
        if (slot.children.length>0) {
            const piece=slot.children[0];

            const expectID = 'piece' + (index +1);
            if (piece.id === expectID) {
                correctCount++;
            }
        }
    });

    console.log("제자리에 들어간 조각 개수:", correctCount);

    if (correctCount===9) {
        successMsg.style.display = 'block';
        nextBtn.style.display = 'block';
        alert('퍼즐 맞추기 성공!');
    }
    
    
}

const pieceBox = document.querySelector('.piece-box');
pieceBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (draggedPiece) {
        pieceBox.appendChild(draggedPiece);
        checkPuzzleComplete();
    }
});


slots.forEach(slot=> {
    slot.addEventListener('click', () => {
        if (slot.children.length >0) {
            const piece = slot.children[0];

            const pieceBox = document.querySelector('.piece-box');

            if(pieceBox) {
                pieceBox.appendChild(piece);

            checkPuzzleComplete();
            }
        }
    })
});




        
 