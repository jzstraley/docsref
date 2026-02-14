---
title: CICU Hemodynamic Calculators
author: J. Austin Straley, DO
date: 2024-09-21
---

Interactive calculators for cardiac critical care hemodynamics. All calculations update in real-time.

<style>
.calc-container {
    max-width: 1200px;
    margin: 20px auto;
}
.calc-section {
    background: var(--md-code-bg-color);
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
}
.calc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 15px 0;
}
.calc-input {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.calc-input label {
    font-weight: 600;
    font-size: 0.9em;
    color: var(--md-default-fg-color);
}
.calc-input input, .calc-input select {
    padding: 8px;
    border: 1px solid var(--md-default-fg-color--light);
    border-radius: 4px;
    background: var(--md-default-bg-color);
    color: var(--md-default-fg-color);
    font-size: 0.95em;
}
.calc-input input:focus {
    outline: 2px solid var(--md-accent-fg-color);
}
.calc-output {
    background: var(--md-accent-fg-color--transparent);
    border-left: 4px solid var(--md-accent-fg-color);
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
}
.calc-result {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}
.result-item {
    padding: 10px;
    background: var(--md-default-bg-color);
    border-radius: 4px;
}
.result-value {
    font-size: 1.5em;
    font-weight: 700;
    color: var(--md-accent-fg-color);
}
.result-label {
    font-size: 0.85em;
    color: var(--md-default-fg-color--light);
    margin-top: 5px;
}
.result-unit {
    font-size: 0.9em;
    color: var(--md-default-fg-color--light);
}
.alert {
    padding: 10px 15px;
    border-radius: 4px;
    margin: 10px 0;
    font-weight: 500;
}
.alert-warning {
    background: rgba(255, 193, 7, 0.2);
    border-left: 4px solid #ffc107;
}
.alert-danger {
    background: rgba(220, 53, 69, 0.2);
    border-left: 4px solid #dc3545;
}
.normal-range {
    font-size: 0.75em;
    color: var(--md-default-fg-color--light);
    font-style: italic;
}
</style>

<div class="calc-container">

## Patient Demographics

<div class="calc-section">
<div class="calc-grid">
    <div class="calc-input">
        <label for="age">Age (years)</label>
        <input type="number" id="age" value="50" min="0" max="120" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="height">Height (cm)</label>
        <input type="number" id="height" value="170" min="100" max="250" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="weight">Weight (kg)</label>
        <input type="number" id="weight" value="70" min="20" max="300" onchange="calculate()">
    </div>
</div>
</div>

## Vital Signs & Labs

<div class="calc-section">
<div class="calc-grid">
    <div class="calc-input">
        <label for="sbp">SBP (mmHg)</label>
        <input type="number" id="sbp" value="120" min="50" max="250" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="dbp">DBP (mmHg)</label>
        <input type="number" id="dbp" value="80" min="30" max="150" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="hr">Heart Rate (bpm)</label>
        <input type="number" id="hr" value="70" min="20" max="250" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="hgb">Hemoglobin (g/dL)</label>
        <input type="number" id="hgb" step="0.1" value="14" min="5" max="25" onchange="calculate()">
    </div>
</div>
</div>

## ABG/VBG Values

<div class="calc-section">
<div class="calc-grid">
    <div class="calc-input">
        <label for="fio2">FiO2 (%)</label>
        <input type="number" id="fio2" value="21" min="21" max="100" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="sao2">SaO2 (%)</label>
        <input type="number" id="sao2" step="0.1" value="98" min="50" max="100" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="pao2">PaO2 (mmHg)</label>
        <input type="number" id="pao2" value="95" min="30" max="600" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="paco2">PaCO2 (mmHg)</label>
        <input type="number" id="paco2" value="40" min="10" max="150" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="mvo2">mvO2 (%)</label>
        <input type="number" id="mvo2" step="0.1" value="" placeholder="Optional" onchange="calculate()">
    </div>
    <div class="calc-input">
        <label for="pvo2">PvO2 (mmHg)</label>
        <input type="number" id="pvo2" value="" placeholder="Optional" onchange="calculate()">
    </div>
</div>
</div>

## Swan-Ganz/PA Catheter Data

<div class="calc-section">
<div class="calc-grid">
    <div class="calc-input">
        <label for="co">Cardiac Output (L/min)</label>
        <input type="number" id="co" step="0.1" value="" placeholder="Optional" onchange="calculate()">
        <span class="normal-range">Normal: 4.0-8.0 L/min</span>
    </div>
    <div class="calc-input">
        <label for="spa">sPAP (mmHg)</label>
        <input type="number" id="spa" value="" placeholder="Optional" onchange="calculate()">
        <span class="normal-range">Normal: 15-30 mmHg</span>
    </div>
    <div class="calc-input">
        <label for="dpa">dPAP (mmHg)</label>
        <input type="number" id="dpa" value="" placeholder="Optional" onchange="calculate()">
        <span class="normal-range">Normal: 4-12 mmHg</span>
    </div>
    <div class="calc-input">
        <label for="cvp">CVP/RAP (mmHg)</label>
        <input type="number" id="cvp" value="" placeholder="Optional" onchange="calculate()">
        <span class="normal-range">Normal: 2-8 mmHg</span>
    </div>
    <div class="calc-input">
        <label for="pcwp">PCWP (mmHg)</label>
        <input type="number" id="pcwp" value="" placeholder="Optional" onchange="calculate()">
        <span class="normal-range">Normal: 6-12 mmHg</span>
    </div>
    <div class="calc-input">
        <label for="vo2">VO2 (mL/min)</label>
        <input type="number" id="vo2" value="" placeholder="Optional" onchange="calculate()">
    </div>
</div>
</div>

<div class="calc-output" id="results">
    <h3>📊 Calculated Results</h3>
    <div id="basicResults"></div>
    <div id="hemodynamicResults"></div>
    <div id="pulmonaryResults"></div>
    <div id="classificationResults"></div>
</div>

</div>

## References

- [PA Catheter Normative Data - EMCrit][1]
- [CPO in Cardiogenic Shock - JACC][2]
- [PAPI and RV Function - Circulation][3]

[1]: https://emcrit.org/ibcc/pah/
[2]: https://www.jacc.org/doi/10.1016/j.jacc.2018.04.011
[3]: https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.116.023462

<script>
function calculate() {
    // Get all input values
    const age = parseFloat(document.getElementById('age').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const sbp = parseFloat(document.getElementById('sbp').value) || 0;
    const dbp = parseFloat(document.getElementById('dbp').value) || 0;
    const hr = parseFloat(document.getElementById('hr').value) || 0;
    const hgb = parseFloat(document.getElementById('hgb').value) || 0;

    const fio2 = parseFloat(document.getElementById('fio2').value) || 21;
    const sao2 = parseFloat(document.getElementById('sao2').value) || 0;
    const pao2 = parseFloat(document.getElementById('pao2').value) || 0;
    const paco2 = parseFloat(document.getElementById('paco2').value) || 0;
    const mvo2 = parseFloat(document.getElementById('mvo2').value) || null;
    const pvo2 = parseFloat(document.getElementById('pvo2').value) || null;

    const co = parseFloat(document.getElementById('co').value) || null;
    const spa = parseFloat(document.getElementById('spa').value) || null;
    const dpa = parseFloat(document.getElementById('dpa').value) || null;
    const cvp = parseFloat(document.getElementById('cvp').value) || null;
    const pcwp = parseFloat(document.getElementById('pcwp').value) || null;
    const vo2Input = parseFloat(document.getElementById('vo2').value) || null;

    // Calculate BSA (Mosteller formula)
    const bsa = Math.sqrt((weight * height) / 3600);

    // Calculate BMI
    const bmi = weight / Math.pow(height / 100, 2);

    // Calculate MAP
    const map = (sbp + 2 * dbp) / 3;

    // Calculate estimated VO2 (if not provided)
    const vo2 = vo2Input || (age < 70 ? 125 : 110) * bsa;

    // Calculate oxygen content
    const cao2 = hgb > 0 && sao2 > 0 ? (1.34 * hgb * sao2 / 100 + 0.0031 * (pao2 || 0)) : null;
    const cvo2 = hgb > 0 && mvo2 ? (1.34 * hgb * mvo2 / 100 + 0.0031 * (pvo2 || 0)) : null;

    // Calculate Fick CO if we have oxygen data
    let coFick = null;
    if (cao2 && cvo2 && cao2 > cvo2) {
        coFick = vo2 / ((cao2 - cvo2) * 10);
    }

    // Use measured CO if available, otherwise Fick CO
    const cardiacOutput = co || coFick;

    // Calculate CI
    const ci = cardiacOutput && bsa > 0 ? cardiacOutput / bsa : null;

    // Calculate CPO
    const cpo = cardiacOutput && map > 0 ? (map * cardiacOutput) / 451 : null;

    // Calculate SVR and SVRI
    const svr = cardiacOutput && map > 0 && cvp !== null ? ((map - cvp) * 80) / cardiacOutput : null;
    const svri = ci && map > 0 && cvp !== null ? ((map - cvp) * 80) / ci : null;

    // Calculate SV and SVi
    const sv = cardiacOutput && hr > 0 ? (cardiacOutput / hr) * 1000 : null;
    const svi = sv && bsa > 0 ? sv / bsa : null;

    // Calculate RVSWI
    const rvswi = svi && map > 0 && cvp !== null ? (svi * (map - cvp)) * 0.0136 : null;

    // Calculate mPAP
    const mpap = spa !== null && dpa !== null ? (spa / 3 + dpa * 2 / 3) : null;

    // Calculate PAPI
    const papi = spa !== null && dpa !== null && cvp !== null && cvp > 0 ? (spa - dpa) / cvp : null;

    // Calculate TPR
    const tpr = mpap !== null && cardiacOutput ? mpap / cardiacOutput : null;

    // Calculate PA Capacitance
    const paCapacitance = sv && spa !== null && dpa !== null ? sv / (spa - dpa) : null;

    // Calculate PVR
    const pvr = mpap !== null && pcwp !== null && cardiacOutput ? (mpap - pcwp) / cardiacOutput : null;

    // Calculate A-a gradient
    const aaGradient = fio2 > 0 && paco2 > 0 && pao2 > 0 ? ((fio2 / 100) * (760 - 47) - (paco2 / 0.8)) - pao2 : null;
    const aaGradientExpected = age > 0 ? (age / 4) + 4 : null;

    // Display results
    displayResults({
        bsa, bmi, map, vo2, cao2, cvo2, cardiacOutput, ci, cpo, svr, svri,
        sv, svi, rvswi, mpap, papi, tpr, paCapacitance, pvr, aaGradient,
        aaGradientExpected, spa, dpa, cvp, pcwp, coFick, co
    });
}

function displayResults(r) {
    let html = '<div class="calc-result">';

    // Basic calculations
    html += '<div class="result-item">';
    html += '<div class="result-value">' + (r.bsa ? r.bsa.toFixed(2) : '—') + '</div>';
    html += '<div class="result-label">BSA <span class="result-unit">(m²)</span></div>';
    html += '</div>';

    html += '<div class="result-item">';
    html += '<div class="result-value">' + (r.bmi ? r.bmi.toFixed(1) : '—') + '</div>';
    html += '<div class="result-label">BMI <span class="result-unit">(kg/m²)</span></div>';
    html += '</div>';

    html += '<div class="result-item">';
    html += '<div class="result-value">' + (r.map ? r.map.toFixed(0) : '—') + '</div>';
    html += '<div class="result-label">MAP <span class="result-unit">(mmHg)</span></div>';
    html += '<div class="normal-range">Normal: 70-100</div>';
    html += '</div>';

    html += '</div>';
    document.getElementById('basicResults').innerHTML = html;

    // Hemodynamic calculations
    html = '<h4>Hemodynamics</h4><div class="calc-result">';

    if (r.cardiacOutput) {
        html += '<div class="result-item">';
        html += '<div class="result-value">' + r.cardiacOutput.toFixed(2) + '</div>';
        html += '<div class="result-label">CO <span class="result-unit">(L/min)</span></div>';
        html += '<div class="normal-range">Normal: 4.0-8.0</div>';
        if (r.co && r.coFick) {
            html += '<div class="normal-range">Thermodilution: ' + r.co.toFixed(2) + '</div>';
            html += '<div class="normal-range">Fick: ' + r.coFick.toFixed(2) + '</div>';
        }
        html += '</div>';
    }

    if (r.ci) {
        html += '<div class="result-item">';
        html += '<div class="result-value">' + r.ci.toFixed(2) + '</div>';
        html += '<div class="result-label">CI <span class="result-unit">(L/min/m²)</span></div>';
        html += '<div class="normal-range">Normal: 2.5-4.0</div>';
        if (r.ci < 2.0) html += '<div class="alert alert-danger">Shock</div>';
        else if (r.ci < 2.5) html += '<div class="alert alert-warning">Low</div>';
        html += '</div>';
    }

    if (r.cpo) {
        html += '<div class="result-item">';
        html += '<div class="result-value" style="font-size: 2em;">' + r.cpo.toFixed(2) + '</div>';
        html += '<div class="result-label">CPO <span class="result-unit">(Watts)</span></div>';
        html += '<div class="normal-range">Normal: >0.6 W</div>';
        if (r.cpo < 0.4) html += '<div class="alert alert-danger">Critical</div>';
        else if (r.cpo < 0.53) html += '<div class="alert alert-danger">Cardiogenic Shock</div>';
        else if (r.cpo < 0.6) html += '<div class="alert alert-warning">Low</div>';
        html += '</div>';
    }

    if (r.sv) {
        html += '<div class="result-item">';
        html += '<div class="result-value">' + r.sv.toFixed(0) + '</div>';
        html += '<div class="result-label">SV <span class="result-unit">(mL)</span></div>';
        html += '<div class="normal-range">Normal: 60-100</div>';
        html += '</div>';
    }

    if (r.svi) {
        html += '<div class="result-item">';
        html += '<div class="result-value">' + r.svi.toFixed(0) + '</div>';
        html += '<div class="result-label">SVi <span class="result-unit">(mL/m²)</span></div>';
        html += '<div class="normal-range">Normal: 35-55</div>';
        html += '</div>';
    }

    if (r.svr) {
        html += '<div class="result-item">';
        html += '<div class="result-value">' + r.svr.toFixed(0) + '</div>';
        html += '<div class="result-label">SVR <span class="result-unit">(dynes·s/cm⁵)</span></div>';
        html += '<div class="normal-range">Normal: 800-1200</div>';
        if (r.svr > 1200) html += '<div class="alert alert-warning">High</div>';
        else if (r.svr < 800) html += '<div class="alert alert-warning">Low</div>';
        html += '</div>';
    }

    if (r.svri) {
        html += '<div class="result-item">';
        html += '<div class="result-value">' + r.svri.toFixed(0) + '</div>';
        html += '<div class="result-label">SVRi <span class="result-unit">(dynes·s/cm⁵/m²)</span></div>';
        html += '<div class="normal-range">Normal: 1970-2390</div>';
        html += '</div>';
    }

    html += '</div>';
    document.getElementById('hemodynamicResults').innerHTML = html;

    // Pulmonary calculations
    if (r.mpap || r.papi || r.pvr) {
        html = '<h4>Pulmonary Hemodynamics</h4><div class="calc-result">';

        if (r.mpap) {
            html += '<div class="result-item">';
            html += '<div class="result-value">' + r.mpap.toFixed(0) + '</div>';
            html += '<div class="result-label">mPAP <span class="result-unit">(mmHg)</span></div>';
            html += '<div class="normal-range">Normal: 10-20</div>';
            if (r.mpap > 20) html += '<div class="alert alert-warning">PHTN</div>';
            html += '</div>';
        }

        if (r.papi !== null) {
            html += '<div class="result-item">';
            html += '<div class="result-value" style="font-size: 2em;">' + r.papi.toFixed(2) + '</div>';
            html += '<div class="result-label">PAPI</div>';
            html += '<div class="normal-range">Normal: >1.85</div>';
            if (r.papi < 0.9) html += '<div class="alert alert-danger">Severe RV Dysfunction</div>';
            else if (r.papi < 1.0) html += '<div class="alert alert-danger">RV Dysfunction</div>';
            else if (r.papi < 1.85) html += '<div class="alert alert-warning">Borderline RV Function</div>';
            html += '</div>';
        }

        if (r.pvr) {
            html += '<div class="result-item">';
            html += '<div class="result-value">' + r.pvr.toFixed(1) + '</div>';
            html += '<div class="result-label">PVR <span class="result-unit">(Wood Units)</span></div>';
            html += '<div class="normal-range">Normal: <2</div>';
            if (r.pvr > 3) html += '<div class="alert alert-warning">Elevated</div>';
            html += '</div>';
        }

        if (r.tpr) {
            html += '<div class="result-item">';
            html += '<div class="result-value">' + r.tpr.toFixed(1) + '</div>';
            html += '<div class="result-label">TPR <span class="result-unit">(mmHg·min/L)</span></div>';
            html += '</div>';
        }

        if (r.paCapacitance) {
            html += '<div class="result-item">';
            html += '<div class="result-value">' + r.paCapacitance.toFixed(1) + '</div>';
            html += '<div class="result-label">PA Capacitance <span class="result-unit">(mL/mmHg)</span></div>';
            html += '</div>';
        }

        html += '</div>';
        document.getElementById('pulmonaryResults').innerHTML = html;
    }

    // Classification
    if (r.spa !== null && r.pcwp !== null && r.ci && r.pvr) {
        html = '<h4>Classification</h4>';
        let phType = '';
        if (r.pcwp <= 15 && r.ci >= 3) {
            phType = 'Pre-Capillary PH';
        } else if (r.pcwp > 15 && r.pvr < 3) {
            phType = 'Isolated Post-Capillary PH';
        } else if (r.pcwp > 15 && r.pvr >= 3) {
            phType = 'Mixed (Pre + Post) PH';
        }

        if (phType) {
            html += '<div class="alert alert-warning"><strong>PH Type:</strong> ' + phType + '</div>';
        }

        document.getElementById('classificationResults').innerHTML = html;
    }
}

// Calculate on page load
document.addEventListener('DOMContentLoaded', calculate);
</script>
