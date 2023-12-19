import { CoursePart } from "../App"

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part = (props: PartProps) => {
  const { part } = props;

  switch(part.kind) {
    case 'basic':
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <p>{part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <p>{part.description}</p>
          <p>{part.requirements.join(' ')}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
}

export default Part;