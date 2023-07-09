const Total = ({ parts }) => 
    (<b>
        total of {parts.reduce((acc, currentPart) => acc + currentPart.exercises, 0)}
    </b>)

export default Total