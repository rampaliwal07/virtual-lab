// Main JS for Fourier Virtual Lab (no graph – only equation problems)
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
    if (currentPage === 'simulation.html' && window.initFourierProblemSolver) window.initFourierProblemSolver();
    if (currentPage === 'quiz.html' && window.initFourierQuiz) window.initFourierQuiz();
    if (currentPage === 'feedback.html' && window.initFeedback) window.initFeedback();
});

// ---------- FOURIER SERIES PROBLEM SOLVER (No Graph) ----------
const problemBank = [
    {
        functionDef: "f(x) = { 1, for 0 < x < π;  -1, for -π < x < 0 } (square wave, period 2π)",
        correctAnswer: "∑_{n=1,3,5,…} (4/(nπ)) sin(nx)",
        alternativeAnswers: ["(4/π) Σ sin(nx)/n", "4/π (sin x + sin3x/3 + sin5x/5+…)"],
        hint: "Odd function, only sine terms, coefficients = 4/(nπ) for odd n."
    },
    {
        functionDef: "f(x) = x, for -π < x < π, periodic with period 2π (sawtooth)",
        correctAnswer: "∑_{n=1}^{∞} (2(-1)^{n+1}/n) sin(nx)",
        alternativeAnswers: ["2(sin x - sin2x/2 + sin3x/3 - …)", "2∑ (-1)^{n+1} sin(nx)/n"],
        hint: "Odd function, bₙ = 2(-1)^{n+1}/n."
    },
    {
        functionDef: "f(x) = |x|, for -π < x < π (triangle wave, even function)",
        correctAnswer: "π/2 - (4/π) ∑_{n odd} cos(nx)/n²",
        alternativeAnswers: ["π/2 - (4/π)(cos x + cos3x/9 + cos5x/25+…)"],
        hint: "Even function → cosine series. a₀ = π, aₙ = -4/(π n²) for odd n."
    },
    {
        functionDef: "f(x) = 0 for -π < x < 0, and f(x)=1 for 0 < x < π (half‑rectified)",
        correctAnswer: "1/2 + (2/π) ∑_{n odd} sin(nx)/n",
        alternativeAnswers: ["0.5 + (2/π)(sin x + sin3x/3 + sin5x/5+…)"],
        hint: "Average value = 1/2, sine series for odd n."
    }
];

window.initFourierProblemSolver = () => {
    const container = document.getElementById('problem-container');
    if (!container) return;

    let currentProblem = null;
    let currentIndex = 0;

    function loadProblem(index) {
        currentProblem = problemBank[index % problemBank.length];
        currentIndex = index;
        container.innerHTML = `
            <div class="problem-card">
                <h3><i class="fas fa-question-circle"></i> Problem ${currentIndex+1}</h3>
                <div class="function-def">
                    ${currentProblem.functionDef}
                </div>
                <p><strong>📝 Enter the Fourier series expansion:</strong></p>
                <textarea id="user-answer" rows="3" class="answer-input" placeholder="Example: (4/π) * (sin(x) + sin(3x)/3 + sin(5x)/5) or Σ notation"></textarea>
                <div class="feedback-msg" id="feedback-msg">
                    <i class="fas fa-lightbulb"></i> Hint: ${currentProblem.hint}
                </div>
                <button id="check-answer" class="btn-check"><i class="fas fa-check-circle"></i> Check Answer</button>
                <button id="show-solution" class="btn-next" style="background:#475569;"><i class="fas fa-eye"></i> Show Solution</button>
            </div>
        `;

        document.getElementById('check-answer').addEventListener('click', () => {
            const userInput = document.getElementById('user-answer').value.trim().toLowerCase().replace(/\s/g, '');
            const correct = currentProblem.correctAnswer.toLowerCase().replace(/\s/g, '');
            const alternatives = currentProblem.alternativeAnswers.map(s => s.toLowerCase().replace(/\s/g, ''));
            const isCorrect = (userInput === correct) || alternatives.includes(userInput) ||
                              (userInput.includes('4/π') && currentProblem.correctAnswer.includes('4/(nπ)')) ||
                              (userInput.includes('2(-1)^') && currentProblem.correctAnswer.includes('2(-1)^{n+1}'));
            
            const feedbackDiv = document.getElementById('feedback-msg');
            if (isCorrect) {
                feedbackDiv.innerHTML = `<i class="fas fa-check-circle" style="color:green"></i> ✅ Correct! Great job.`;
                feedbackDiv.style.background = '#d1fae5';
            } else {
                feedbackDiv.innerHTML = `<i class="fas fa-times-circle" style="color:red"></i> ❌ Not quite. Hint: ${currentProblem.hint}<br><strong>Expected form:</strong> ${currentProblem.correctAnswer}`;
                feedbackDiv.style.background = '#fee2e2';
            }
        });

        document.getElementById('show-solution').addEventListener('click', () => {
            const feedbackDiv = document.getElementById('feedback-msg');
            feedbackDiv.innerHTML = `<i class="fas fa-book-open"></i> <strong>Solution:</strong> ${currentProblem.correctAnswer}<br><em>${currentProblem.hint}</em>`;
            feedbackDiv.style.background = '#eef2ff';
        });
    }

    loadProblem(0);
    const nextBtn = document.getElementById('next-problem');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            loadProblem(currentIndex + 1);
        });
    }
};

// ---------- FOURIER QUIZ (8 questions, unchanged) ----------
window.initFourierQuiz = () => {
    const questions = [
        { q: "What is the fundamental period of the Fourier series of a function with fundamental frequency ω₀?", opts: ["2π/ω₀", "ω₀/2π", "π/ω₀", "2πω₀"], correct: 0 },
        { q: "The Fourier series of an odd function contains only:", opts: ["Cosine terms", "Sine terms", "Constant term", "Both sine and cosine"], correct: 1 },
        { q: "Dirichlet conditions are related to:", opts: ["Convergence of Fourier series", "Laplace transform", "Z-transform", "None"], correct: 0 },
        { q: "The coefficient a₀ in Fourier series represents:", opts: ["Average value", "Fundamental frequency", "Harmonic amplitude", "Phase shift"], correct: 0 },
        { q: "Gibbs phenomenon occurs near:", opts: ["Discontinuities", "Smooth points", "Zero crossings", "Infinite intervals"], correct: 0 },
        { q: "For a square wave, the Fourier coefficients decay as:", opts: ["1/n", "1/n²", "1/√n", "exponentially"], correct: 0 },
        { q: "The complex exponential form of Fourier series uses:", opts: ["e^(jnω₀t)", "sin(nω₀t)", "cos(nω₀t)", "tan(nω₀t)"], correct: 0 },
        { q: "Parseval's theorem relates:", opts: ["Energy in time and frequency domains", "Time shift and phase", "Convolution", "Differentiation"], correct: 0 }
    ];
    const container = document.getElementById('quiz-container');
    if (!container) return;
    container.innerHTML = '';
    questions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'quiz-question';
        div.innerHTML = `<p style="font-weight:600;">${idx+1}. ${q.q}</p>`;
        q.opts.forEach((opt, optIdx) => {
            const label = document.createElement('label');
            label.style.display = 'block';
            label.style.margin = '6px 0 0 20px';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `q${idx}`;
            radio.value = optIdx;
            radio.style.marginRight = '8px';
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            div.appendChild(label);
        });
        container.appendChild(div);
    });
    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Submit Answers';
    submitBtn.className = 'btn-submit';
    submitBtn.style.marginTop = '24px';
    container.appendChild(submitBtn);
    submitBtn.addEventListener('click', () => {
        let score = 0;
        questions.forEach((q, idx) => {
            const selected = document.querySelector(`input[name="q${idx}"]:checked`);
            if (selected && parseInt(selected.value) === q.correct) score++;
        });
        const scoreSpan = document.getElementById('quiz-score');
        if (scoreSpan) scoreSpan.innerText = `${score} / ${questions.length}`;
        alert(`You scored ${score}/${questions.length}`);
    });
};

// Feedback form
window.initFeedback = () => {
    const form = document.getElementById('feedback-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('student-name').value;
            const rating = document.querySelector('input[name="rating"]:checked');
            const comments = document.getElementById('comments').value;
            if (!rating) { alert('Please select a rating'); return; }
            alert(`Thank you ${name || 'Student'}! Rating: ${rating.value}⭐\nComment: ${comments.slice(0,100)}`);
            form.reset();
        });
    }
};
