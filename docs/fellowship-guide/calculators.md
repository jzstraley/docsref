---
title: Calculators
author: J. Austin Straley, DO
date: 2024-09-21
template: calc.html
---

## BMI/CPO/SVR/PVR/PAPI Calculators

* Enter the below parameters for resulting outputs.

<script>
document.addEventListener("DOMContentLoaded", function() {
    var calculateButton = document.getElementById("btn");
    calculateButton.addEventListener("click", () => {
        calculateBMI();
        calculateMAP();
        fickoutput();
        thermpower();
        fickpvr();
        papi();
        });
    });

function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const resultsElement_bmi = document.getElementById("results_bmi");
  const adj_height = (height / 100) ** 2;
  const bmi = weight / adj_height;
  const bsa1 = (weight * height)/3600
  const bsa = Math.pow(bsa1,0.5);
  const bmiFixed = bmi.toFixed(1);
  const bsaFixed = bsa.toFixed(2);
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
    return bsaFixed;
}

function calculateMAP() {
    const sbp = parseFloat(document.getElementById("sbp").value);
    const dbp = parseFloat(document.getElementById("dbp").value);
    const resultsElement_map = document.getElementById("results_map");
    const map = (sbp / 3) + ((dbp * 2) / 3);
    const mapFixed = map.toFixed(1);
    //if (isNaN(sbp) || isNaN(dpb) || sbp <= 0 || dbp <= 0) {
        //resultsElement_map.innerHTML = "Please enter valid positive numbers for sbp and dbp.";
        //return;
    //}
    //let measure_map = mapFixed;
    //if (mapFixed < 65) {
        //measure_map.style.color = "blue";
    // } else if (bmi <= 24.9) {
        // measure = "Normal";
    // } else if (bmi <= 29.9) {
        // measure = "Overweight";
    //} else {
        //measure_map.style.color = "black";
    //}
     // which means you are ${measure}.
    resultsElement_map.innerHTML = `MAP: ${mapFixed}`;
    return mapFixed;
}

function fickoutput() {
  var bsaFixed = calculateBMI();
  var mapFixed = calculateMAP();
  const age = parseFloat(document.getElementById("age").value);
  const hr = parseFloat(document.getElementById("hr").value);
  const hgb = parseFloat(document.getElementById("hgb").value);
  const sao2 = parseFloat(document.getElementById("sao2").value)/100;
  const svo2 = parseFloat(document.getElementById("svo2").value) / 100;
  const cvp = parseFloat(document.getElementById("cvp").value);
  const resultsElement_fickoutput = document.getElementById("results_fickoutput");
  var co_age;
  if (age <= 70) {
    co_age = 125;
  }
  else {
    co_age = 110;
  };
  const co = (co_age * bsaFixed) / ((sao2 - svo2) * hgb * 13.4);
  const ci = co / bsaFixed;
  const cpo = (mapFixed * co) / 451;
  const sv = (co / hr) * 1000;
  const svr = (mapFixed - cvp) * 80 / co;
  const svFixed = sv.toFixed(0);
  const svrFixed = svr.toFixed(0);
  const coFixed = co.toFixed(2);
  const ciFixed = ci.toFixed(2);
  const cpoFixed = cpo.toFixed(2);
  resultsElement_fickoutput.innerHTML = `Fick CO/CI/CPO/SV/SVR: ${coFixed}/${ciFixed}/${cpoFixed}/${svFixed}/${svrFixed}`;
  return coFixed;
}

function thermpower() {
  var mapFixed = calculateMAP();
  const hr = parseFloat(document.getElementById("hr").value);
  const therm_co = parseFloat(document.getElementById("therm_co").value);
  const therm_ci = parseFloat(document.getElementById("therm_ci").value);
  const therm_svr = parseFloat(document.getElementById("therm_svr").value);
  const resultsElement_thermpower = document.getElementById("results_thermpower");
  const therm_sv = therm_co / hr * 1000;
  const therm_cpo = (mapFixed * therm_co) / 451;
  const therm_cpoFixed = therm_cpo.toFixed(2);
  resultsElement_thermpower.innerHTML = `Thermodilution CO/CI/CPO/SVR/SV: ${therm_co}/${therm_ci}/${therm_cpoFixed}/${therm_sv}/${therm_svr}`;
}

function papi() {
    const sPA = parseFloat(document.getElementById("sPA").value);
    const dPA = parseFloat(document.getElementById("dPA").value);
    const cvp = parseFloat(document.getElementById("cvp").value);
    const papi = (sPA-dPA)/cvp;
    const papiFixed = papi.toFixed(2);
    const resultsElement_papi = document.getElementById("results_papi");
    resultsElement_papi.innerHTML = `CVP/PAPI: ${cvp}/${papiFixed}`;
}

function fickpvr() {
    var coFixed = fickoutput();
    const therm_co = parseFloat(document.getElementById("therm_co").value);
    const mPAP = parseFloat(document.getElementById("mPAP").value);
    const pcwp = parseFloat(document.getElementById("pcwp").value);
    const fick_pvr = (mPAP - pcwp) / coFixed;
    const therm_pvr = (mPAP - pcwp) / therm_co;
    const fick_pvrFixed = fick_pvr.toFixed(2)
    const therm_pvrFixed = therm_pvr.toFixed(2)
    const resultsElement_fickpvr = document.getElementById("results_fickpvr");
    resultsElement_fickpvr.innerHTML = `Fick PVR/Thermodilution PVR: ${fick_pvrFixed}/${therm_pvrFixed}`;
}
</script>
