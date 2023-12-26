import { HealthCheckEntry as HealthCheck, Diagnosis } from "../../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HealthRatingBar from "../HealthRatingBar";

interface Props {
  entry: HealthCheck;
  diagnoses?: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>{entry.date} <MonitorHeartIcon /></p>
      <p>{entry.description}</p>

      <ul>
        {entry.diagnosisCodes?.map(diagnosisCode => {
          const name = diagnoses?.find(diagnose => diagnose.code === diagnosisCode)?.name;
          
          return <li>{diagnosisCode} {name}</li>;
        })}
      </ul>

      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />

      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;