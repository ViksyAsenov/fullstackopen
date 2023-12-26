import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, Entry } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from '../../services/diagnoses';
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry, diagnoses?: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch(entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  const id = useParams().id;
  useEffect(() => {
    if(id && typeof id === 'string') {
      patientService
        .getById(id)
        .then(returnedPatient => {
          setPatient(returnedPatient);
        });
    }
  }, [id]);

  useEffect(() => {
    diagnosisService
      .getAll()
      .then(returnedDiagnoses => {
        setDiagnoses(returnedDiagnoses);
      });
  });

  if(!patient) {
    return <div>Not found!</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h3>entries</h3>
      <h1>-------------------------------------------</h1>
      {patient.entries.map(entry => {
        return (
          <div>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
            <h1>-------------------------------------------</h1>
          </div>
        );
      })}
    </div>
  );
};

export default PatientInfoPage;