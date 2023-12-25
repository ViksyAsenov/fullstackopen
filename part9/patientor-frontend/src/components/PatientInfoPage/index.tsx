import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();

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

  if(!patient) {
    return <div>Not found!</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInfoPage;