import Button from './Button'
import History from './History'

const LeftAndRight = ({ left, right, handleLeftClick, handleRightClick, allClicks, totalClicks}) => {
  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}

      <History allClicks={allClicks} />
      <p>Total: {totalClicks}</p>
    </div>
  )
}

export default LeftAndRight