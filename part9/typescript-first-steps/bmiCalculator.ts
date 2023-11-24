const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (Math.pow(height / 100, 2))

  return bmi > 25 ? 'Overweight' : (bmi < 18.5 ? 'Skinny' : 'Normal')
}

console.log(calculateBmi(180, 82))