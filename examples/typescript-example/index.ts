import express from 'express';
const app = express();
app.use(express.json());

import { calculator, Operation } from './calculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if((!value1 || isNaN(Number(value1))) || (!value2 || isNaN(Number(value2))) || !op) {
    return res.status(400).send(
      {
        error: 'malformatted parameters'
      }
    );
  }

  try {
    const result = calculator(Number(value1), Number(value2), op as Operation);

    return res.status(200).send({ result });
  } catch(error: unknown) {
    let message: string = '';
    if(error instanceof Error) {
      message += error.message;
    }
    return res.status(400).send(
      {
        error: message
      }
    );
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});