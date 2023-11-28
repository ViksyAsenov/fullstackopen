import parseArgs from './utils/bmiCalcParseArgs';

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (Math.pow(height / 100, 2))

  return bmi > 25 ? 'Overweight' : (bmi < 18.5 ? 'Skinny' : 'Normal')
}

try {
  const { value1, value2 } = parseArgs(process.argv);
  console.log(calculateBmi(value1, value2))
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}