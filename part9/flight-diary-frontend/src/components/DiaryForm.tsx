import { useState } from "react";
import { DiaryEntry } from "../App";
import diaryService from '../services/diaries';
import { AxiosError } from "axios";

export interface NewDiaryEntry {
  comment: string;
  date: string;
  weather: string;
  visibility: string;
}

interface DiaryFormProps {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

enum Weather {
  sunny = 'sunny',
  rainy = 'rainy',
  cloudy = 'cloudy',
  stormy = 'stormy',
  windy = 'windy'
}

enum Visibility {
  great = 'great',
  good = 'good',
  ok ='ok',
  poor = 'poor'
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' && !isNaN(number)
}

const parseFieldToString = (field: unknown): string => {
  if(!field || !isString(field)) {
    throw new Error('Field is not a string')
  }

  return field
}

const parseFieldToNumber = (field: unknown): number => {
  if(!field || !isNumber(field)) {
    throw new Error('Field is not a number')
  }

  return field
}

const DiaryForm = (props: DiaryFormProps) => {
  const [comment, setComment] = useState('')
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const { diaries, setDiaries, setErrorMessage } = props

  const handleNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newDiaryEntry: NewDiaryEntry = {
      comment,
      date,
      weather,
      visibility
    }

    try {
      const returnedEntry = await diaryService.create(newDiaryEntry)

      if(returnedEntry && (returnedEntry instanceof Object || typeof returnedEntry == 'object')) {
        if('id' in returnedEntry && 'date' in returnedEntry && 'weather' in returnedEntry && 'visibility' in returnedEntry) {
          const newEntry: DiaryEntry = {
            id: parseFieldToNumber(Number.parseInt(returnedEntry.id)),
            date: parseFieldToString(returnedEntry.date),
            weather: parseFieldToString(returnedEntry.weather), 
            visibility: parseFieldToString(returnedEntry.visibility)
          }

          setDiaries(diaries.concat(newEntry))

          setComment('')
          setDate('')
          setWeather('')
          setVisibility('')
        }
      }
    } catch(error) {
      let errorMessage = 'Something went wrong...'

      if(error instanceof AxiosError) {
        errorMessage = error.response?.data
      }

      setErrorMessage(errorMessage)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <div>
      <form onSubmit={handleNewEntry}>
        <div>
          date
          <input 
            value={date}
            type="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          weather {" "}

          {Weather.sunny}
          <input
            type="radio"
            value={Weather.sunny}
            checked={weather === Weather.sunny}
            onChange={({ target }) => setWeather(target.value)}
          />

          {Weather.rainy}
          <input
            type="radio"
            value={Weather.rainy}
            checked={weather === Weather.rainy}
            onChange={({ target }) => setWeather(target.value)}
          />

          {Weather.cloudy}
          <input
            type="radio"
            value={Weather.cloudy}
            checked={weather === Weather.cloudy}
            onChange={({ target }) => setWeather(target.value)}
          />

          {Weather.stormy}
          <input
            type="radio"
            value={Weather.stormy}
            checked={weather === Weather.stormy}
            onChange={({ target }) => setWeather(target.value)}
          />

          {Weather.windy}
          <input
            type="radio"
            value={Weather.windy}
            checked={weather === Weather.windy}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>

        <div>
          visibility {" "}

          {Visibility.great}
          <input
            type="radio"
            value={Visibility.great}
            checked={visibility === Visibility.great}
            onChange={({ target }) => setVisibility(target.value)}
          />

          {Visibility.good}
          <input
            type="radio"
            value={Visibility.good}
            checked={visibility === Visibility.good}
            onChange={({ target }) => setVisibility(target.value)}
          />

          {Visibility.ok}
          <input
            type="radio"
            value={Visibility.ok}
            checked={visibility === Visibility.ok}
            onChange={({ target }) => setVisibility(target.value)}
          />

          {Visibility.poor}
          <input
            type="radio"
            value={Visibility.poor}
            checked={visibility === Visibility.poor}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div> 

        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>      

        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default DiaryForm