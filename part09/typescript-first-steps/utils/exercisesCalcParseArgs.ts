interface InputValues {
  target: number
  days: number[]
}

export const isArrayOnlyNumbers = (array: (string | number | object)[] ) => {
  return array.every(element => !isNaN(Number(element)));
};

const parseArgs = (args: string[]): InputValues => {
  const [, , target, ...days] = args;

  if(!target || days.length === 0) throw new Error('Not enough args');
  if(!isNaN(Number(target)) && isArrayOnlyNumbers(days)) {
    return {
      target: Number(target),
      days: days.map(d => Number(d))
    };
  } else {
    throw new Error('Provided values were not numbers');
  }  
};

export default parseArgs;