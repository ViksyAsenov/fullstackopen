interface InputValues {
  value1: number;
  value2: number;
}

const parseArgs = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough args');
  if (args.length > 4) throw new Error('Too many args');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export default parseArgs;