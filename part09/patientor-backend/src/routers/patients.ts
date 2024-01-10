import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewDiagnosisEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const patient = patientService.getEntries().find(patient => patient.id === id);

  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
  
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;

  const patient = patientService.getEntries().find(patient => patient.id === id);

  if(patient) {
    try {
      const newDiagnosisEntry = toNewDiagnosisEntry(req.body);
      const addedEntry = patientService.addDiagnosisToPatient(newDiagnosisEntry, patient);
      
      res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
    
      if(error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
  
      res.status(400).send(errorMessage);
    }
  } else {
    res.sendStatus(404);
  }  
});

export default router;