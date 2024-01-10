import axios from "axios";
import { DiaryEntry } from "../App";
import { NewDiaryEntry } from "../components/DiaryForm";
const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

const create = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post(baseUrl, newEntry)
  return response.data
}

export default { getAll, create }