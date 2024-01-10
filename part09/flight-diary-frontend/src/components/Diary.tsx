import { DiaryEntry } from "../App"

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = (props: DiaryProps) => {
  const { diary } = props

  return (
    <div>
      <h3>{diary.date}</h3>

      <p>weather: {diary.weather}</p>
      <p>visibility: {diary.visibility}</p>
    </div>
  )
}

export default Diary