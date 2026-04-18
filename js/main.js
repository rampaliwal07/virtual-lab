// Shared utilities and simulation logic

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialize simulation if on simulation page
    if (currentPage === 'simulation.html' && window.initMatrixSim) {
        window.initMatrixSim();
    }
    // Pretest & Posttest handlers
    if (currentPage === 'pretest.html' && window.initPretest) window.initPretest();
    if (currentPage === 'posttest.html' && window.initPosttest) window.initPosttest();
    if (currentPage === 'feedback.html' && window.initFeedback) window.initFeedback();
});

// ---------- MATRIX RANK SIMULATION (GAUSSIAN ELIMINATION) ----------
function computeRank(matrix) {
    // Make a deep copy
    let A = matrix.map(row => [...row]);
    const rows = A.length, cols = A[0].length;
    let rank = 0;
    let row = 0;
    for (let col = 0; col < cols && row < rows; col++) {
        // Find pivot
        let maxRow = row;
        for (let i = row; i < rows; i++) {
            if (Math.abs(A[i][col]) > Math.abs(A[maxRow][col])) maxRow = i;
        }
        if (Math.abs(A[maxRow][col]) < 1e-9) continue;
        // Swap rows
        [A[row], A[maxRow]] = [A[maxRow], A[row]];
        const pivot = A[row][col];
        // Normalize row
        for (let k = col; k < cols; k++) {
            A[row][k] /= pivot;
        }
        // Eliminate below and above
        for (let i = 0; i < rows; i++) {
            if (i !== row && Math.abs(A[i][col]) > 1e-9) {
                const factor = A[i][col];
                for (let k = col; k < cols; k++) {
                    A[i][k] -= factor * A[row][k];
                }
            }
        }
        rank++;
        row++;
    }
    return rank;
}

window.initMatrixSim = () => {
    const container = document.getElementById('matrix-dynamic');
    if (!container) return;
    const sizeSelect = document.getElementById('matrix-size');
    const matrixGrid = document.getElementById('matrix-grid');
    const computeBtn = document.getElementById('compute-rank');
    const rankDisplay = document.getElementById('rank-value');

    function buildMatrix(size) {
        matrixGrid.innerHTML = '';
        matrixGrid.style.display = 'grid';
        matrixGrid.style.gridTemplateColumns = `repeat(${size}, 90px)`;
        matrixGrid.style.gap = '12px';
        matrixGrid.style.justifyContent = 'center';
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.value = (i === j) ? '1' : '0';
                input.classList.add('matrix-cell');
                input.dataset.row = i;
                input.dataset.col = j;
                matrixGrid.appendChild(input);
            }
        }
    }

    sizeSelect.addEventListener('change', (e) => {
        buildMatrix(parseInt(e.target.value));
    });

    computeBtn.addEventListener('click', () => {
        const size = parseInt(sizeSelect.value);
        const inputs = document.querySelectorAll('#matrix-grid .matrix-cell');
        let matrix = Array(size).fill().map(() => Array(size).fill(0));
        inputs.forEach(inp => {
            const row = parseInt(inp.dataset.row);
            const col = parseInt(inp.dataset.col);
            let val = parseFloat(inp.value);
            if (isNaN(val)) val = 0;
            matrix[row][col] = val;
        });
        const rank = computeRank(matrix);
        rankDisplay.innerText = rank;
        // Animate result
        rankDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => rankDisplay.style.transform = 'scale(1)', 200);
    });

    buildMatrix(3); // default 3x3
};

// ---------- PRETEST & POSTTEST QUIZ LOGIC ----------
window.initPretest = () => {
    const questions = [
        { q: "What is the rank of a zero matrix of order 3x4?", opts: ["0", "3", "4", "12"], correct: 0 },
        { q: "If a matrix has a non-zero minor of order r and all minors of order r+1 are zero, then rank is:", opts: ["r-1", "r", "r+1", "depends"], correct: 1 },
        { q: "Rank of identity matrix of order 5 is:", opts: ["5", "1", "0", "None"], correct: 0 },
        { q: "For a 3x3 matrix with determinant = 0, the maximum possible rank is:", opts: ["3", "2", "1", "0"], correct: 1 },
        { q: "Rank of matrix [[1,2],[2,4]] is:", opts: ["2", "1", "0", "3"], correct: 1 }
    ];
    renderQuiz(questions, 'pretest-container', 'pretest-score');
};

window.initPosttest = () => {
    const questions = [
        { q: "If the rank of a 4x5 matrix is 3, then nullity is:", opts: ["1", "2", "3", "4"], correct: 1 },
        { q: "Row rank and column rank are always:", opts: ["Equal", "Different", "Row rank > column rank", "None"], correct: 0 },
        { q: "Which operation does NOT change the rank?", opts: ["Row scaling", "Row addition", "Row swap", "All of these"], correct: 3 },
        { q: "Matrix [[1,0,0],[0,0,1],[0,0,0]] has rank:", opts: ["3", "2", "1", "0"], correct: 1 },
        { q: "For a square matrix of order n, full rank means determinant is:", opts: ["Zero", "Non-zero", "1", "None"], correct: 1 }
    ];
    renderQuiz(questions, 'posttest-container', 'posttest-score');
};

function renderQuiz(questions, containerId, scoreSpanId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    questions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.classList.add('quiz-question');
        div.innerHTML = `<p style="font-weight:600; margin:16px 0 8px">${idx+1}. ${q.q}</p>`;
        q.opts.forEach((opt, optIdx) => {
            const label = document.createElement('label');
            label.style.display = 'block';
            label.style.margin = '8px 0 0 20px';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `q${idx}`;
            radio.value = optIdx;
            radio.style.marginRight = '10px';
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            div.appendChild(label);
        });
        container.appendChild(div);
    });
    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Submit Answers';
    submitBtn.classList.add('btn-submit');
    submitBtn.style.marginTop = '30px';
    container.appendChild(submitBtn);

    submitBtn.addEventListener('click', () => {
        let score = 0;
        questions.forEach((q, idx) => {
            const selected = document.querySelector(`input[name="q${idx}"]:checked`);
            if (selected && parseInt(selected.value) === q.correct) score++;
        });
        const scoreSpan = document.getElementById(scoreSpanId);
        if (scoreSpan) scoreSpan.innerText = `${score} / ${questions.length}`;
        alert(`You scored ${score}/${questions.length}`);
    });
}

// Feedback form
window.initFeedback = () => {
    const form = document.getElementById('feedback-form-real');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('student-name').value;
            const rating = document.querySelector('input[name="rating"]:checked');
            const comments = document.getElementById('comments').value;
            if (!rating) {
                alert('Please select a rating ⭐');
                return;
            }
            alert(`✨ Thank you ${name || 'Student'} for your feedback! ✨\nRating: ${rating.value}⭐\nComment: ${comments.slice(0,100)}`);
            form.reset();
        });
    }
};
