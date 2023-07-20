import { useState } from 'react'
import Calc from './components/Calc'
import LeftAndRight from './components/LeftAndRight'

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => {
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    setCounter(counter - 1)
  }

  const setToZero = () => {
    setCounter(0)
  }

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [totalClicks, setTotalClicks] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))

    const updatedLeft = left + 1
    
    setLeft(updatedLeft)
    setTotalClicks(updatedLeft + right)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))

    const updatedRight = right + 1

    setRight(updatedRight)
    setTotalClicks(left + updatedRight)
  }

  return (
    <div>
      <Calc 
        counter={counter} 
        increaseByOne={increaseByOne} 
        decreaseByOne={decreaseByOne} 
        setToZero={setToZero}
      />

      <LeftAndRight 
        left={left} 
        right={right} 
        handleLeftClick={handleLeftClick} 
        handleRightClick={handleRightClick} 
        allClicks={allClicks} 
        totalClicks={totalClicks}
      />
    </div>
  )
} 

export default App