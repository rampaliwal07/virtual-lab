// Main JS for Fourier Series Virtual Lab
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
    
    if (currentPage === 'simulation.html') initFourierSim();
    if (currentPage === 'pretest.html') initPretest();
    if (currentPage === 'posttest.html') initPosttest();
    if (currentPage === 'feedback.html') initFeedback();
});

// ---------- FOURIER SIMULATION (GRAPH) ----------
function evaluateFourierSeries(expr, nStart, nEnd, x) {
    let sanitized = expr.replace(/\^/g, '**');
    let total = 0;
    for (let n = nStart; n <= nEnd; n++) {
        let exprWithN = sanitized.replace(/\bn\b/g, n.toString());
        try {
            const fn = new Function('x', `return (${exprWithN})`);
            total += fn(x);
        } catch(e) {
            throw new Error(`Error at n=${n}: ${e.message}`);
        }
    }
    return total;
}

function initFourierSim() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
        script.onload = () => setupChart();
        document.head.appendChild(script);
    } else setupChart();

    function setupChart() {
        const ctx = document.getElementById('fourierChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'line',
            data: { labels: [], datasets: [{ label: 'Fourier Approximation', data: [], borderColor: '#f97316', borderWidth: 2, fill: false }] },
            options: { responsive: true, maintainAspectRatio: true }
        });

        function update() {
            const expr = document.getElementById('custom-expr').value.trim();
            if (!expr) { alert('Enter an expression, e.g., sin(n*x)/n'); return; }
            let nStart = parseInt(document.getElementById('n-start').value) || 1;
            let nEnd = parseInt(document.getElementById('harmonics').value) || 5;
            let xMin = parseFloat(document.getElementById('xmin').value) || -Math.PI;
            let xMax = parseFloat(document.getElementById('xmax').value) || Math.PI;
            const points = 400;
            const step = (xMax - xMin) / points;
            let xVals = [], yVals = [];
            for (let i = 0; i <= points; i++) {
                let x = xMin + i * step;
                try {
                    let y = evaluateFourierSeries(expr, nStart, nEnd, x);
                    xVals.push(x.toFixed(4));
                    yVals.push(y);
                } catch(err) {
                    alert(err.message);
                    return;
                }
            }
            chart.data.labels = xVals;
            chart.data.datasets[0].data = yVals;
            chart.data.datasets[0].label = `∑ ${expr} (n=${nStart} to ${nEnd})`;
            chart.update();
            document.getElementById('result-info').innerHTML = `<strong>✅ Updated</strong><br>Expression: ${expr}<br>n ∈ [${nStart}, ${nEnd}] | x ∈ [${xMin.toFixed(2)}, ${xMax.toFixed(2)}]`;
        }

        document.getElementById('compute-fourier').addEventListener('click', update);
        document.getElementById('custom-expr').value = 'sin(n*x)/n';
        update();
    }
}

// ---------- PRETEST (5 basic questions) ----------
function initPretest() {
    const questions = [
        { q: "Who introduced Fourier series?", opts: ["Newton", "Fourier", "Laplace", "Euler"], correct: 1 },
        { q: "The Fourier series of an even function contains only:", opts: ["Sine terms", "Cosine terms", "Both", "Constant only"], correct: 1 },
        { q: "The coefficient a₀ represents:", opts: ["Average value", "Fundamental frequency", "Harmonic amplitude", "Phase"], correct: 0 },
        { q: "Dirichlet conditions are for:", opts: ["Convergence", "Divergence", "Integration", "Differentiation"], correct: 0 },
        { q: "Gibbs phenomenon occurs at:", opts: ["Discontinuities", "Smooth points", "Infinity", "Zero"], correct: 0 }
    ];
    renderQuiz(questions, 'pretest-container', 'pretest-score');
}

// ---------- POSTTEST (5 advanced questions) ----------
function initPosttest() {
    const questions = [
        { q: "For a square wave, Fourier coefficients decay as:", opts: ["1/n", "1/n²", "1/√n", "exponentially"], correct: 0 },
        { q: "Parseval's theorem relates:", opts: ["Time and frequency energy", "Phase and magnitude", "Convolution", "Derivatives"], correct: 0 },
        { q: "Complex Fourier series uses:", opts: ["e^(jnω₀t)", "sin(nω₀t)", "cos(nω₀t)", "tan"], correct: 0 },
        { q: "A function with period 2π has fundamental frequency:", opts: ["1", "2π", "π", "1/2π"], correct: 0 },
        { q: "The series ∑ (sin(nx))/n represents:", opts: ["Square wave", "Sawtooth", "Triangle", "Sine wave"], correct: 0 }
    ];
    renderQuiz(questions, 'posttest-container', 'posttest-score');
}

function renderQuiz(questions, containerId, scoreSpanId) {
    const container = document.getElementById(containerId);
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
    container.appendChild(submitBtn);
    submitBtn.addEventListener('click', () => {
        let score = 0;
        questions.forEach((q, idx) => {
            const selected = document.querySelector(`input[name="q${idx}"]:checked`);
            if (selected && parseInt(selected.value) === q.correct) score++;
        });
        document.getElementById(scoreSpanId).innerText = `${score} / ${questions.length}`;
        alert(`You scored ${score}/${questions.length}`);
    });
}

// ---------- FEEDBACK ----------
function initFeedback() {
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
}
