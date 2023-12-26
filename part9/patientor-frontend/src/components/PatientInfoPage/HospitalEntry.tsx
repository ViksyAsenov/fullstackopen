import { HospitalEntry as Hospital, Diagnosis } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: Hospital;
  diagnoses?: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p>{entry.description}</p>

      <ul>
        {entry.diagnosisCodes?.map(diagnosisCode => {
          const name = diagnoses?.find(diagnose => diagnose.code === diagnosisCode)?.name;
          
          return <li>{diagnosisCode} {name}</li>;
        })}
      </ul>

      <p>discharge date: {entry.discharge.date} if {entry.discharge.criteria}</p>

      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntry;