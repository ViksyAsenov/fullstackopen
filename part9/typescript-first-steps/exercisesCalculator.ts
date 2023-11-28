import parseArgs from "./utils/exercisesCalcParseArgs"

interface CalculatedData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface TrainingInfo {
  average: number
  success: boolean
  rating: number
  ratingDescription: string
}

const calculateTrainingInfo = (trainingHoursPerDay: number[], targetHoursPerDay: number): TrainingInfo => {
    const totalHours = trainingHoursPerDay.reduce((sum, hours) => sum + hours, 0)

    const totalTargetHours = trainingHoursPerDay.length * targetHoursPerDay    
    const rating = totalHours >= totalTargetHours ? 3 : (totalHours >= totalTargetHours * 0.5 ? 2 : 1)

    let ratingDescription: string
    switch (rating) {
        case 1:
          ratingDescription = `You need to train more hours. Keep pushing!`
          break;
        case 2:
          ratingDescription = `You're making progress, but try to train more consistently.`
          break;
        case 3:
          ratingDescription = `Great job! You're meeting or exceeding your training goals.`
          break;
        default:
          ratingDescription = 'Invalid rating.'
    }

    const average = totalHours / trainingHoursPerDay.length
    const success = average >= targetHoursPerDay

    return { average, success, rating, ratingDescription }
}

const calculateExercises = (days: number[], target: number): CalculatedData => {
  const periodLength = days.length
  const trainingDays = days.filter(day => day > 0).length
  const { average, success, rating, ratingDescription } = calculateTrainingInfo(days, target)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, days } = parseArgs(process.argv);
  console.log(calculateExercises(days, target))
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}