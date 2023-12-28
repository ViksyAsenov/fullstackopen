export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

export enum EntryType {
  'HealthCheck' = 'HealthCheck',
  'OccupationalHealthcare' = 'OccupationalHealthcare',
  'Hospital' = 'Hospital'
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck' | EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare' | EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string; 
    endDate: string;
  }
}
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

interface HospitalEntry extends BaseEntry {
  type: 'Hospital' | EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  }
}
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
} 

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewDiagnosisEntry = UnionOmit<Entry, 'id'>;