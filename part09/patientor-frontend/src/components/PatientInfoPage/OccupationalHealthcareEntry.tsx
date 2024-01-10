import { OccupationalHealthcareEntry as OccupationalHealthcare, Diagnosis } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface Props {
  entry: OccupationalHealthcare;
  diagnoses?: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>{entry.date} <MedicalInformationIcon /> {entry.employerName}</p>
      <p>{entry.description}</p>

      <ul>
        {entry.diagnosisCodes?.map(diagnosisCode => {
          const name = diagnoses?.find(diagnose => diagnose.code === diagnosisCode)?.name;
          
          return <li key={diagnosisCode}>{diagnosisCode} {name}</li>;
        })}
      </ul>

      {entry.sickLeave && (
        <p>sick leave: {entry.sickLeave.startDate} until {entry.sickLeave.endDate}</p>
      )}

      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;