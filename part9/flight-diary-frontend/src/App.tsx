import { useEffect, useState } from "react";
import Diary from "./components/Diary";
import DiaryForm from "./components/DiaryForm";
import Error from "./components/Error";
import diaryService from "./services/diaries";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    diaryService
      .getAll()
      .then(initialDiaries => {
        setDiaries(initialDiaries)
      })
  }, [])

  return (
    <div>
      <h2>Add an entry</h2>
      <Error errorMessage={errorMessage} />

      <DiaryForm diaries={diaries} setDiaries={setDiaries} setErrorMessage={setErrorMessage}/>

      {diaries.map(diary => <Diary key={diary.id} diary={diary} />)}
    </div>
  )
}

export default App
