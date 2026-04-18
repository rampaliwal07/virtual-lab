// Main JS for Fourier Virtual Lab - Fully working simulation with custom expressions
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
    if (currentPage === 'simulation.html' && window.initFourierSim) window.initFourierSim();
    if (currentPage === 'quiz.html' && window.initFourierQuiz) window.initFourierQuiz();
    if (currentPage === 'feedback.html' && window.initFeedback) window.initFeedback();
});

// ---------- FOURIER SIMULATION (CUSTOM EXPRESSION + GRAPH) ----------
function evaluateCustomSeries(expr, nStart, nEnd, x) {
    let sanitized = expr.replace(/\^/g, '**');
    // Allow only safe math functions and variables
    if (!/^[\d\s\+\-\*\/\(\)\*\*\,\.a-zA-Z_]+$/.test(sanitized.replace(/sin|cos|tan|exp|log|pow|abs/g, ''))) {
        throw new Error('Invalid characters in expression');
    }
    let total = 0;
    for (let n = nStart; n <= nEnd; n++) {
        // Replace standalone 'n' (not inside a word like sin) with current n
        let exprWithN = sanitized.replace(/\bn\b/g, n.toString());
        try {
            const fn = new Function('x', `return (${exprWithN})`);
            total += fn(x);
        } catch(e) {
            throw new Error(`Evaluation error at n=${n}: ${e.message}`);
        }
    }
    return total;
}

window.initFourierSim = () => {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
        script.onload = () => setup();
        document.head.appendChild(script);
    } else setup();

    function setup() {
        const ctx = document.getElementById('fourierChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'line',
            data: { labels: [], datasets: [{ label: 'Fourier Approximation', data: [], borderColor: '#f97316', borderWidth: 2, fill: false, tension: 0.1 }] },
            options: { responsive: true, maintainAspectRatio: true, scales: { x: { title: { display: true, text: 'x' } }, y: { title: { display: true, text: 'f(x)' } } } }
        });

        function update() {
            const expr = document.getElementById('custom-expr').value.trim();
            if (!expr) {
                alert('Please enter a Fourier series expression (e.g., sin(n*x)/n)');
                return;
            }
            let nStart = parseInt(document.getElementById('n-start').value);
            let nEnd = parseInt(document.getElementById('harmonics-custom').value);
            if (isNaN(nStart)) nStart = 1;
            if (isNaN(nEnd)) nEnd = 5;
            let xMin = parseFloat(document.getElementById('xmin').value);
            let xMax = parseFloat(document.getElementById('xmax').value);
            if (isNaN(xMin)) xMin = -Math.PI;
            if (isNaN(xMax)) xMax = Math.PI;
            
            const points = 400;
            const step = (xMax - xMin) / points;
            let xVals = [], yVals = [];
            let errorMsg = null;
            
            for (let i = 0; i <= points; i++) {
                let x = xMin + i * step;
                try {
                    let y = evaluateCustomSeries(expr, nStart, nEnd, x);
                    xVals.push(x.toFixed(4));
                    yVals.push(y);
                } catch (err) {
                    errorMsg = err.message;
                    break;
                }
            }
            
            if (errorMsg) {
                alert(`Error in expression: ${errorMsg}`);
                return;
            }
            
            chart.data.labels = xVals;
            chart.data.datasets[0].data = yVals;
            chart.data.datasets[0].label = `Fourier: Σ ${expr} (n=${nStart} to ${nEnd})`;
            chart.update();
            
            document.getElementById('result-info').innerHTML = `<strong>✅ Series computed</strong><br>Expression: ${expr}<br>n ∈ [${nStart}, ${nEnd}] | x ∈ [${xMin.toFixed(2)}, ${xMax.toFixed(2)}]`;
        }
        
        const computeBtn = document.getElementById('compute-fourier');
        if (computeBtn) computeBtn.addEventListener('click', update);
        
        // Initial plot with default expression
        document.getElementById('custom-expr').value = 'sin(n*x)/n';
        update();
    }
};

// ---------- FOURIER QUIZ (8 questions) ----------
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

// ---------- FEEDBACK FORM ----------
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
