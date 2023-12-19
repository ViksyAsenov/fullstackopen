interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  const { total } = props;
  return <p>Number of exercises {total}</p>;
}

export default Total;