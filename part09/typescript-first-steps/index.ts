import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exercisesCalculator';
import { isArrayOnlyNumbers } from './utils/exercisesCalcParseArgs';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if((height && !isNaN(Number(height))) && (weight && !isNaN(Number(weight)))) {
    const heightAsNumber: number = Number(height);
    const weightAsNumber: number = Number(weight);

    res.status(200).send(
      {
        weight: weightAsNumber,
        height: heightAsNumber,
        bmi: calculateBmi(heightAsNumber, weightAsNumber)
      }
    );
  } else {
    res.status(400).send(
      {
        error: "malformatted parameters"
      }
    );
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if(!isNaN(Number(target)) && daily_exercises instanceof Array && isArrayOnlyNumbers(daily_exercises)) {
    const numberTarget: number = Number(target);
    const days: number[] = daily_exercises.map(d => Number(d));

    res.status(200).send(calculateExercises(days, numberTarget));
  } else {
    res.status(400).send(
      {
        error: "malformatted parameters"
      }
    );
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});