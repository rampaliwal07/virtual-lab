<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fourier Series Simulator – Virtual Labs</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header Styles */
        header {
            background: linear-gradient(135deg, #2c3e50, #1a2530);
            color: white;
            padding: 15px 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 25px;
            flex-wrap: wrap;
        }

        .pcce-logo-container {
            display: flex;
            align-items: center;
            gap: 15px;
            padding-right: 25px;
            border-right: 2px solid rgba(255, 255, 255, 0.2);
        }

        .pcce-logo-img {
            width: 60px;
            height: 60px;
            object-fit: contain;
            border-radius: 8px;
            background-color: white;
            padding: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .pcce-logo-text .main {
            font-size: 20px;
            font-weight: 700;
            color: #fff;
            line-height: 1.2;
        }

        .pcce-logo-text .sub {
            font-size: 12px;
            color: #ecf0f1;
            opacity: 0.9;
            margin-top: 2px;
        }

        .virtual-labs-logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .virtual-labs-logo i {
            font-size: 32px;
            color: #3498db;
        }

        .virtual-labs-logo h1 {
            font-size: 26px;
            font-weight: 600;
        }

        .virtual-labs-logo span {
            color: #3498db;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255,255,255,0.1);
            padding: 8px 16px;
            border-radius: 40px;
        }

        .user-info i {
            font-size: 20px;
            color: #3498db;
        }

        /* Main Content */
        .content {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            padding: 30px;
            margin: 40px auto;
        }

        .content-header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }

        .content-header h2 {
            font-size: 28px;
            color: #2c3e50;
            font-weight: 600;
        }

        .content-header p {
            color: #7f8c8d;
            margin-top: 5px;
        }

        /* Simulation Controls */
        .sim-panel {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
        }

        .control-group {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            gap: 25px;
            margin-bottom: 20px;
        }

        .input-field {
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-width: 180px;
        }

        .input-field label {
            font-weight: 600;
            color: #2c3e50;
        }

        select, input {
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 1rem;
            background: white;
        }

        button {
            background: linear-gradient(to right, #3498db, #2c80b9);
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.2s;
            font-weight: 500;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(52,152,219,0.3);
        }

        .result-box {
            background: #1e2a36;
            color: #f1f5f9;
            border-radius: 12px;
            padding: 25px;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
        }

        .result-title {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 15px;
            color: #f39c12;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .fourier-eq {
            font-size: 1rem;
            line-height: 1.6;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .coeff-details {
            margin-top: 20px;
            border-top: 1px solid #3a4a5a;
            padding-top: 15px;
            font-size: 0.9rem;
            color: #cbd5e6;
        }

        footer {
            margin-top: 40px;
            padding: 20px 0;
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
            border-top: 1px solid #eee;
        }

        @media (max-width: 700px) {
            .control-group { flex-direction: column; align-items: stretch; }
            .content { padding: 20px; }
        }
    </style>
</head>
<body>

<header>
    <div class="container header-container">
        <div class="logo-section">
            <div class="pcce-logo-container">
                <img src="https://raw.githubusercontent.com/dineshkute90/virtual_lab_LAUC/main/pccoe.png" 
                     alt="PCOE Logo" class="pcce-logo-img"
                     onerror="this.src='https://via.placeholder.com/60x60/2c3e50/ffffff?text=PCOE';">
                <div class="pcce-logo-text">
                    <div class="main">APPLIED SCIENCES & HUMANITIES</div>
                    <div class="sub">Pimpri Chinchwad College of Engineering</div>
                </div>
            </div>
            <div class="virtual-labs-logo">
                <i class="fas fa-waveform"></i>
                <h1>Fourier <span>Series Lab</span></h1>
            </div>
        </div>
        <div class="user-info">
            <i class="fas fa-user-circle"></i>
            <span>Simulation Mode</span>
        </div>
    </div>
</header>

<main class="container">
    <div class="content">
        <div class="content-header">
            <h2>📐 Fourier Series Simulator</h2>
            <p>Select a periodic function, define the half‑period L, and get the exact Fourier expansion (no graph).</p>
        </div>

        <div class="sim-panel">
            <div class="control-group">
                <div class="input-field">
                    <label><i class="fas fa-waveform"></i> Waveform f(x)</label>
                    <select id="functionSelect">
                        <option value="square">Square wave (±1, odd)</option>
                        <option value="sawtooth">Sawtooth wave (f(x)=x/L)</option>
                        <option value="triangle">Triangle wave (even, peaks at 1)</option>
                        <option value="halfrect">Half‑rectified sine</option>
                    </select>
                </div>
                <div class="input-field">
                    <label><i class="fas fa-arrows-left-right"></i> Half‑period L (period = 2L)</label>
                    <input type="number" id="Lvalue" value="1.0" step="0.5">
                </div>
                <div>
                    <button id="generateBtn"><i class="fas fa-sync-alt"></i> Generate Fourier Series</button>
                </div>
            </div>
        </div>

        <div class="result-box" id="resultBox">
            <div class="result-title">
                <i class="fas fa-chalkboard-teacher"></i> Fourier Series Expansion
            </div>
            <div id="fourierDisplay" class="fourier-eq">
                <!-- output will appear here -->
            </div>
        </div>
    </div>
</main>

<footer class="container">
    <p>Fourier Series Virtual Lab &copy; 2025 | Applied Sciences & Humanities | Pimpri Chinchwad College of Engineering</p>
</footer>

<script>
    // Helper: format number with 4 decimal places, remove trailing zeros
    function fmt(x) {
        if (Math.abs(x) < 1e-8) return "0";
        let s = x.toFixed(4);
        s = s.replace(/\.?0+$/, '');
        return s;
    }

    // Square wave: f(x) = 1 for 0<x<L, -1 for -L<x<0
    function getSquareSeries(L) {
        let a0 = 0;
        let bn = (n) => (n % 2 === 1) ? 4 / (n * Math.PI) : 0;
        let an = () => 0;
        return { a0, an, bn, description: "Square wave (odd, ±1)" };
    }

    // Sawtooth: f(x) = x/L  on (-L, L)
    function getSawtoothSeries(L) {
        let a0 = 0;
        let an = () => 0;
        let bn = (n) => 2 * Math.pow(-1, n+1) / (n * Math.PI);
        return { a0, an, bn, description: "Sawtooth wave f(x)=x/L" };
    }

    // Triangle wave: even, f(x)=1-|x|/L on [-L,L] (peak 1 at 0)
    function getTriangleSeries(L) {
        let a0 = 1;   // average value = 0.5? Actually a0 = 1 ensures correct DC.
        let an = (n) => {
            if (n % 2 === 1) return 8 / (Math.pow(n,2) * Math.pow(Math.PI,2));
            return 0;
        };
        let bn = () => 0;
        return { a0, an, bn, description: "Triangle wave (even, cosine series)" };
    }

    // Half-rectified sine: f(x)= sin(πx/L) for 0<x<L, 0 for -L<x<0
    function getHalfRectSeries(L) {
        let a0 = 2 / Math.PI;
        let an = (n) => {
            if (n === 1) return 0.5;
            if (n % 2 === 0) return 0;
            return -2 / (Math.PI * (n*n - 1));
        };
        let bn = (n) => {
            if (n === 1) return 0.5;
            return 0;
        };
        return { a0, an, bn, description: "Half‑rectified sine wave" };
    }

    function generateAndDisplay() {
        const funcType = document.getElementById('functionSelect').value;
        let L = parseFloat(document.getElementById('Lvalue').value);
        if (isNaN(L) || L <= 0) {
            document.getElementById('fourierDisplay').innerHTML = '<span style="color:#ffaa66;">⚠️ Please enter a positive half‑period L.</span>';
            return;
        }

        let series;
        switch(funcType) {
            case 'square': series = getSquareSeries(L); break;
            case 'sawtooth': series = getSawtoothSeries(L); break;
            case 'triangle': series = getTriangleSeries(L); break;
            case 'halfrect': series = getHalfRectSeries(L); break;
            default: series = getSquareSeries(L);
        }

        const a0 = series.a0;
        const anFunc = series.an;
        const bnFunc = series.bn;

        // Build series expression up to n=5 for readability
        let constantTerm = (a0 / 2).toFixed(4);
        if (Math.abs(parseFloat(constantTerm)) < 1e-6) constantTerm = "0";
        else constantTerm = fmt(parseFloat(constantTerm));

        let cosTerms = [];
        let sinTerms = [];

        for (let n = 1; n <= 5; n++) {
            let a_n = anFunc(n);
            let b_n = bnFunc(n);
            if (Math.abs(a_n) > 1e-6) {
                let sign = (a_n > 0 && cosTerms.length === 0 && constantTerm === "0") ? "" : (a_n > 0 ? "+" : "-");
                let val = fmt(Math.abs(a_n));
                cosTerms.push(`${sign} ${val} · cos(${n}πx/${fmt(L)})`);
            }
            if (Math.abs(b_n) > 1e-6) {
                let sign = (b_n > 0 && sinTerms.length === 0 && constantTerm === "0" && cosTerms.length === 0) ? "" : (b_n > 0 ? "+" : "-");
                let val = fmt(Math.abs(b_n));
                sinTerms.push(`${sign} ${val} · sin(${n}πx/${fmt(L)})`);
            }
        }

        let seriesStr = `f(x) = ${constantTerm}`;
        if (cosTerms.length) seriesStr += ` ${cosTerms.join(' ')}`;
        if (sinTerms.length) seriesStr += ` ${sinTerms.join(' ')}`;
        if (cosTerms.length === 0 && sinTerms.length === 0 && constantTerm === "0") seriesStr = "f(x) = 0";

        // Also display general formulas for coefficients
        let coeffHtml = "";
        if (funcType === 'square') {
            coeffHtml = `a₀ = 0,  aₙ = 0,  bₙ = <span style="color:#f39c12;">4/(nπ)</span> for odd n (zero for even n)`;
        } else if (funcType === 'sawtooth') {
            coeffHtml = `a₀ = 0,  aₙ = 0,  bₙ = <span style="color:#f39c12;">2·(-1)^{n+1} / (nπ)</span>`;
        } else if (funcType === 'triangle') {
            coeffHtml = `a₀ = 1,  bₙ = 0,  aₙ = <span style="color:#f39c12;">8/(n²π²)</span> for odd n (cosine only)`;
        } else if (funcType === 'halfrect') {
            coeffHtml = `a₀ = 2/π,  a₁ = 1/2,  b₁ = 1/2,  aₙ (odd n>1) = -2/(π(n²-1))`;
        }

        const displayHtml = `
            <div style="margin-bottom: 12px;">📌 <strong>${series.description}</strong> &nbsp; | &nbsp; Period = 2L = ${fmt(2*L)}</div>
            <div style="font-size: 1.1rem; font-weight: 500; background: #0f172a; padding: 12px; border-radius: 8px;">${seriesStr}</div>
            <div class="coeff-details">
                <i class="fas fa-calculator"></i> <strong>Coefficients summary:</strong><br>
                ${coeffHtml}
            </div>
        `;
        document.getElementById('fourierDisplay').innerHTML = displayHtml;
    }

    document.getElementById('generateBtn').addEventListener('click', generateAndDisplay);
    window.addEventListener('load', generateAndDisplay);
</script>

</body>
</html>
