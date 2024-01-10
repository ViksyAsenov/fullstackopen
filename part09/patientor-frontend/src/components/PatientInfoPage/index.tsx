import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, Entry } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from '../../services/diagnoses';
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";
import EntryForm from "./EntryForm";
import axios from "axios";
import { Alert } from "@mui/material";
import { EntryType } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry, diagnoses?: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch(entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [error, setError] = useState<string>();

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
  }, []);

  if(!patient) {
    return <div>Not found!</div>;
  }

  const addNewEntry = async (newEntry: Entry): Promise<boolean> => {
    try {
      const newPatient = await patientService.addEntryToPatient(newEntry, patient.id);
      setPatient(newPatient);
      return true;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }

      setTimeout(() => {
        setError(undefined);
      }, 1500);

      return false;
    }
  };

  return (
    <div>
      <h2>{patient.name}</h2>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      {error && <Alert severity="error">{error}</Alert>}
      <EntryForm onSubmit={addNewEntry} />
      <h3>entries</h3>
      <h1>-------------------------------------------</h1>
      {patient.entries.map(entry => {
        return (
          <div key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
            <h1>-------------------------------------------</h1>
          </div>
        );
      })}
    </div>
  );
};

export default PatientInfoPage;