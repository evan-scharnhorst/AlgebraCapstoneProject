// Mean and standard deviation based on provided data
const mean = 70.25;
const stdDev = 3.0092186;

// Function to calculate the cumulative distribution function (CDF) for a normal distribution
function calculateCDF(z) {
  return 0.5 * (1 + Math.erf(z / Math.sqrt(2)));
}

function calculatePercentile() {
  const feet = parseInt(document.getElementById('feet').value);
  const inches = parseInt(document.getElementById('inches').value);

  if (isNaN(feet) || isNaN(inches) || feet < 4 || feet > 7 || inches < 0 || inches > 11) {
    document.getElementById('result').innerText = "Please enter a valid height within the range 4'0\" to 7'11\".";
    return;
  }
  
  // Convert feet and inches to total inches
  const totalInches = feet * 12 + inches;

  // Z-score calculation
  const z = (totalInches - mean) / stdDev;

  // Percentile based on the CDF of the Z-score
  const percentile = Math.round(calculateCDF(z) * 100);

  // Display result
  document.getElementById('result').innerText = `You are in the ${percentile}th percentile for height among adult U.S. men.`;
}

// Error function (erf) approximation for calculating CDF
Math.erf = function(x) {
  const sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}
