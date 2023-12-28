import { 
  Gender, 
  HealthCheckRating, 
  EntryType, 
  DiagnosisEntry, 
  NewPatientEntry, 
  NewDiagnosisEntry, 
  NewHealthCheckEntry, 
  NewOccupationalHealthcareEntry, 
  NewHospitalEntry 
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return (typeof number === 'number' || number instanceof Number);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v.toString()).includes(param.toString());
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<DiagnosisEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnosisEntry['code']>;
};

const parseType = (type: unknown): EntryType => {
  if(!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type');
  }

  return type;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }

  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if(!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } => {
  if(!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickLeave');
  }

  if(!('startDate' in sickLeave) || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error('Incorrect or missing startDate');
  }

  if(!('endDate' in sickLeave) || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
    throw new Error('Incorrect or missing endDate');
  }

  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if(!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge');
  }

  if(!('date' in discharge) || !discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Incorrect or missing date');
  }

  if(!('criteria' in discharge) || !discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return { date: discharge.date, criteria: discharge.criteria };
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewDiagnosisEntry = (object: unknown): NewDiagnosisEntry => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    let diagnosisCodes = undefined;
    if('diagnosisCodes' in object) {
      diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }

    const type = parseType(object.type);

    const entry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes,
    };

    switch(type) {
      case EntryType.HealthCheck:
        if('healthCheckRating' in object) {
          const healthCheckEntry: NewHealthCheckEntry = {
            ...entry,
            type: EntryType.HealthCheck,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };

          return healthCheckEntry;
        }
        throw new Error('Incorrect or missing healthCheckRating');
      case EntryType.OccupationalHealthcare:
        if('employerName' in object) {
          const occupationHealthcareEntry: NewOccupationalHealthcareEntry = {
            ...entry,
            type: EntryType.OccupationalHealthcare,
            employerName: parseEmployerName(object.employerName)
          };

          if('sickLeave' in object) {
            return { ...occupationHealthcareEntry, sickLeave: parseSickLeave(object.sickLeave) };
          }

          return occupationHealthcareEntry;
        }
        throw new Error('Incorrect or missing employerName');
      case EntryType.Hospital:
        if('discharge' in object) {
          const hospitalEntry: NewHospitalEntry = {
            ...entry,
            type: EntryType.Hospital,
            discharge: parseDischarge(object.discharge)
          };
          
          return hospitalEntry;
        }
        throw new Error('Incorrect or missing discharge');
      default:
        assertNever(type);
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};