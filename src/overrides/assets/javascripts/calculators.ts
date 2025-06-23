document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("btn");
    if (calculateButton) {
      calculateButton.addEventListener("click", () => {
        calculateBMI();
        calculateMAP();
        fickoutput();
        thermpower();
        fickpvr();
        papi();
        calculatemPAP();
      });
    }
  });
  
  function parseInput(id: string): number {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (!el) return NaN;
    return parseFloat(el.value);
  }
  
  function calculateBMI(): string {
    const height = parseInput("height");
    const weight = parseInput("weight");
    const resultsElement_bmi = document.getElementById("results_bmi");
    if (isNaN(height) || isNaN(weight) || !resultsElement_bmi) return "";
  
    const adj_height = (height / 100) ** 2;
    const bmi = weight / adj_height;
    const bsa1 = (weight * height) / 3600;
    const bsa = Math.sqrt(bsa1);
    const bmiFixed = bmi.toFixed(1);
    const bsaFixed = bsa.toFixed(2);
  
    resultsElement_bmi.innerHTML = `BMI/BSA: ${bmiFixed}/${bsaFixed}`;
    return bsaFixed;
  }
  
  function calculateMAP(): number {
    const sbp = parseInput("sbp");
    const dbp = parseInput("dbp");
    const resultsElement_map = document.getElementById("results_map");
    if (isNaN(sbp) || isNaN(dbp) || !resultsElement_map) return NaN;
  
    const map = sbp / 3 + (dbp * 2) / 3;
    const mapFixed = map.toFixed(1);
  
    resultsElement_map.innerHTML = `MAP: ${mapFixed}`;
    return map;
  }
  
  function fickoutput(): number {
    const bsaFixed = parseFloat(calculateBMI());
    const mapFixed = calculateMAP();
    const age = parseInput("age");
    const hr = parseInput("hr");
    const hgb = parseInput("hgb");
    const sao2 = parseInput("sao2") / 100;
    const svo2 = parseInput("svo2") / 100;
    const cvp = parseInput("cvp");
    const resultsElement_fickoutput = document.getElementById("results_fickoutput");
  
    if (
      isNaN(bsaFixed) ||
      isNaN(mapFixed) ||
      isNaN(age) ||
      isNaN(hr) ||
      isNaN(hgb) ||
      isNaN(sao2) ||
      isNaN(svo2) ||
      isNaN(cvp) ||
      !resultsElement_fickoutput
    )
      return NaN;
  
    const co_age = age <= 70 ? 125 : 110;
    const co = (co_age * bsaFixed) / ((sao2 - svo2) * hgb * 13.4);
    const ci = co / bsaFixed;
    const cpo = (mapFixed * co) / 451;
    const sv = (co / hr) * 1000;
    const svr = ((mapFixed - cvp) * 80) / co;
  
    const svFixed = sv.toFixed(0);
    const svrFixed = svr.toFixed(0);
    const coFixed = co.toFixed(2);
    const ciFixed = ci.toFixed(2);
    const cpoFixed = cpo.toFixed(2);
  
    resultsElement_fickoutput.innerHTML = `Fick CO/CI/CPO/SV/SVR: ${coFixed}/${ciFixed}/${cpoFixed}/${svFixed}/${svrFixed}`;
    return co;
  }
  
  function thermpower(): void {
    const mapFixed = calculateMAP();
    const hr = parseInput("hr");
    const therm_co = parseInput("therm_co");
    const therm_ci = parseInput("therm_ci");
    const therm_svr = parseInput("therm_svr");
    const resultsElement_thermpower = document.getElementById("results_thermpower");
  
    if (
      isNaN(mapFixed) ||
      isNaN(hr) ||
      isNaN(therm_co) ||
      isNaN(therm_ci) ||
      isNaN(therm_svr) ||
      !resultsElement_thermpower
    )
      return;
  
    const therm_sv = (therm_co / hr) * 1000;
    const therm_cpo = (mapFixed * therm_co) / 451;
    const therm_cpoFixed = therm_cpo.toFixed(2);
  
    resultsElement_thermpower.innerHTML = `Thermodilution CO/CI/CPO/SVR/SV: ${therm_co}/${therm_ci}/${therm_cpoFixed}/${therm_sv}/${therm_svr}`;
  }
  
  function papi(): void {
    const sPA = parseInput("sPA");
    const dPA = parseInput("dPA");
    const cvp = parseInput("cvp");
    const resultsElement_papi = document.getElementById("results_papi");
  
    if (isNaN(sPA) || isNaN(dPA) || isNaN(cvp) || !resultsElement_papi) return;
  
    const papi = (sPA - dPA) / cvp;
    const papiFixed = papi.toFixed(2);
  
    resultsElement_papi.innerHTML = `CVP/PAPI: ${cvp}/${papiFixed}`;
  }
  
  function calculatemPAP(): number {
    const sPA = parseInput("sPA");
    const dPA = parseInput("dPA");
    if (isNaN(sPA) || isNaN(dPA)) return NaN;
  
    const mPAP = sPA / 3 + (dPA * 2) / 3;
    return mPAP;
  }
  
  function fickpvr(): void {
    const coFixed = fickoutput();
    const mPAP = calculatemPAP();
    const therm_co = parseInput("therm_co");
    const pcwp = parseInput("pcwp");
    const resultsElement_fickpvr = document.getElementById("results_fickpvr");
  
    if (
      isNaN(coFixed) ||
      isNaN(mPAP) ||
      isNaN(therm_co) ||
      isNaN(pcwp) ||
      !resultsElement_fickpvr
    )
      return;
  
    const fick_pvr = (mPAP - pcwp) / coFixed;
    const therm_pvr = (mPAP - pcwp) / therm_co;
  
    const fick_pvrFixed = fick_pvr.toFixed(2);
    const therm_pvrFixed = therm_pvr.toFixed(2);
  
    resultsElement_fickpvr.innerHTML = `Fick PVR/Thermodilution PVR: ${fick_pvrFixed}/${therm_pvrFixed}`;
  }