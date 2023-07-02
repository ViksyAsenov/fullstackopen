import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  if(text == 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ all }) => {
  const total = all.length;

  if(total <= 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const good = all.filter(current => current > 0).length
  const neutral = all.filter(current => current == 0).length
  const bad = all.filter(current => current < 0).length

  const calculateAverage = () => all.reduce((acc, current) => acc + current) / total

  const calculatePositivePercent = () => good / total * 100

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={calculateAverage()} />
          <StatisticLine text='positive' value={calculatePositivePercent()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [all, setAll] = useState([])

  const handleGoodClick = () => setAll(all.concat(1))

  const handleNeutralClick = () => setAll(all.concat(0))

  const handleBadClick = () => setAll(all.concat(-1))

  return (
    <div>
      <Header text={'give feedback'} />

      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />

      <Header text={'statistics'} />
      <Statistics all={all} />
    </div>
  )
}

export default App