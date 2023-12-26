import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from '../../services/diagnoses';

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
      {patient.entries.map(entry => {
        return (
          <div>
            <p>{entry.date} {entry.description}</p>

            <ul>
              {entry.diagnosisCodes?.map(diagnosisCode => {
                const name = diagnoses?.find(diagnose => diagnose.code === diagnosisCode)?.name;
                
                return <li>{diagnosisCode} {name}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientInfoPage;