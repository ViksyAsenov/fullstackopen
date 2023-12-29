export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  'HealthCheck' = 'HealthCheck',
  'OccupationalHealthcare' = 'OccupationalHealthcare',
  'Hospital' = 'Hospital'
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
export interface NewBaseEntry extends Omit<BaseEntry, 'id'> {
  type: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck | 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare | 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string; 
    endDate: string;
  }
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital | 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;