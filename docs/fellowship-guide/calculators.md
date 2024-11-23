---
title: Calculators
author: J. Austin Straley, DO
date: 2024-09-21
template: calc.html
---

<script>
document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("btn");
    calculateButton.addEventListener("click", () => {
        calculateBMI();
        calculateMAP();
        fickoutput();
        thermpower();
        ficksvr();
        fickpvr();
        papi();
    });
    });

function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
    const resultsElement_bmi = document.getElementById("results_bmi");
    // Error handling
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultsElement_bmi.innerHTML = "Please enter valid positive numbers for weight and height.";
        return;
    }
    const bmi = weight / (height * height);
    const bmiFixed = bmi.toFixed(1);
    const bsa = ((weight * height)/3600)^0.5;
    const bsaFixed = bsa.toFixed(1);
    // let measure;
    // if (bmi <= 18.4) {
        // measure = "Underweight";
    // } else if (bmi <= 24.9) {
        // measure = "Normal";
    // } else if (bmi <= 29.9) {
        // measure = "Overweight";
    // } else {
        // measure = "Obese";
    // }
     // which means you are ${measure}.
    resultsElement_bmi.innerHTML = `BMI/BSA: ${bmiFixed}/${bsaFixed}`;
}

function calculateMAP() {
    const sbp = parseFloat(document.getElementById("sbp").value);
    const dbp = parseFloat(document.getElementById("dbp").value);
    const resultsElement_map = document.getElementById("results_map");
    const map = (sbp / 3) + ((dbp * 2) / 3);
    const mapFixed = map.toFixed(1);
    if (isNaN(sbp) || isNaN(dpb) || sbp <= 0 || dbp <= 0) {
        resultsElement_bmi.innerHTML = "Please enter valid positive numbers for sbp and dbp.";
        return;
    }
    let measure_map = mapFixed;
    if (mapFixed < 65) {
        measure_map.style.color = "blue";
    // } else if (bmi <= 24.9) {
        // measure = "Normal";
    // } else if (bmi <= 29.9) {
        // measure = "Overweight";
    } else {
        measure_map.style.color = "black";
    }
     // which means you are ${measure}.
    resultsElement_map.innerHTML = `MAP: ${mapFixed}`;
}

function fickoutput() {
    const age = parseFloat(document.getElementById("age").value);
    const hgb = parseFloat(document.getElementById("hgb").value);
    const sao2 = parseFloat(document.getElementById("sao2").value);
    const svo2 = parseFloat(document.getElementById("svo2").value);
    const resultsElement_fickoutput = document.getElementById("results_fickoutput");
    let co_age;
    if (age < 70) {
        co_age = 125;
    } else {
        co_age = 110;
    }
    const co = (co_age * bsa)/((sao2-svo2)*hgb*13.4)*100;
    const ci = co / bsa;
    const cpo = (map*co)/451;
    const coFixed = co.toFixed(2);
    const ciFixed = ci.toFixed(2);
    const cpoFixed = cpo.toFixed(2);
    resultsElement_fickoutput.innerHTML = `Fick CO/CI/CPO: ${coFixed}/${ciFixed}/${cpoFixed}`;
}

function ficksvr() {
    const cvp = parseFloat(document.getElementById("cvp").value);
    const ficksvr = (map - cvp)*80/co;
    const resultsElement_ficksvr = document.getElementById("results_ficksvr");
    resultsElement_ficksvr.innerHTML = `Fick SVR: ${ficksvr}`;
}

function fickpvr() {
    const mPAP = parseFloat(document.getElementById("mPAP").value);
    const pcwp = parseFloat(document.getElementById("pcwp").value);
    const fickpvr = (mPAP - pcwp) / co;
    const resultsElement_fickpvr = document.getElementById("results_fickpvr");
    resultsElement_fickpvr.innerHTML = `Fick PVR: ${fickpvr}`;
}

function thermpower() {
    const therm_co = parseFloat(document.getElementById("therm_co").value);
    const therm_ci = parseFloat(document.getElementById("therm_ci").value) / 100; // Convert cm to meters
    const resultsElement_thermpower = document.getElementById("results_thermpower");
    const therm_cpo = (map*therm_co)/451;
    resultsElement_thermpower.innerHTML = `Thermodilution CO/CI/CPO: ${therm_co}/${therm_ci}/${therm_cpo}`;
}

function papi() {
    const sPA = parseFloat(document.getElementById("sPA").value);
    const dPA = parseFloat(document.getElementById("dPA").value);
    const therm_cpo = (sPA-dPA)/cvp;
    const resultsElement_papi = document.getElementById("results_papi");
    resultsElement_papi.innerHTML = `PAPI: ${papi}`;
}

</script>
