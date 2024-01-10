import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewDiagnosisEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {  
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const addDiagnosisToPatient = (diagnosisEntry: NewDiagnosisEntry, patientEntry: PatientEntry): PatientEntry => {
  const diagnosis: Entry = {
    id: uuid(),
    ...diagnosisEntry
  };

  patientEntry.entries.push(diagnosis);

  return patientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addDiagnosisToPatient
};