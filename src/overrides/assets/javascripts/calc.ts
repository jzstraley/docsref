document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("btn");
    calculateButton.addEventListener("click", calculateBMI);
});

function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
    
    const resultsElement = document.getElementById("results");
    
    // Error handling
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultsElement.innerHTML = "Please enter valid positive numbers for weight and height.";
        return;
    }

    const bmi = weight / (height * height);
    const bmiFixed = bmi.toFixed(1);
    
    let measure;
    if (bmi <= 18.4) {
        measure = "Underweight";
    } else if (bmi <= 24.9) {
        measure = "Normal";
    } else if (bmi <= 29.9) {
        measure = "Overweight";
    } else {
        measure = "Obese";
    }

    resultsElement.innerHTML = `Your BMI is ${bmiFixed}, which means you are ${measure}.`;
}