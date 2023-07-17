import Button from './Button'
import Display from './Display'

const Calc = ({ counter, increaseByOne, setToZero, decreaseByOne }) => {
  return (
    <div>
      <Display counter={counter} />

      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
}

export default Calc