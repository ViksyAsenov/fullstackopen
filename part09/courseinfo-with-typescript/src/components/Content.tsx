import { CoursePart } from "../App";
import Part from './Part';

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const { parts } = props;

  return (
    <>
      {parts.map(part => 
        <Part part={part} />
      )}
    </>
  );
}

export default Content;