import React, { useState } from 'react';
import { NewBaseEntry, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../../types';

interface FormProps {
  onSubmit: (entry: Entry) => Promise<boolean>;
}

const EntryForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<NewBaseEntry | Entry>({
    description: '',
    date: '',
    specialist: '',
    type: "HealthCheck"
  });

  const handleTypeChange = (type: Entry['type']) => {
    setFormData({
      description: '',
      date: '',
      specialist: '',
      type,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSuccess = await onSubmit(formData as Entry);
    if(isSuccess) {
      setFormData({
        description: '',
        date: '',
        specialist: '',
        type: formData.type
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      Entry Type:
      <select onChange={(e) => handleTypeChange(e.target.value as Entry['type'])}>
        <option value="HealthCheck">Health Check</option>
        <option value="OccupationalHealthcare">Occupational Healthcare</option>
        <option value="Hospital">Hospital</option>
      </select>

      {formData.type === 'HealthCheck' && (
        <div>
          Health Check Rating:
          <input
            type="number"
            min={0}
            max={3}
            value={(formData as HealthCheckEntry).healthCheckRating || 0}
            onChange={(e) => setFormData({ ...formData, healthCheckRating: Number.parseInt(e.target.value) } as HealthCheckEntry)}
          />
        </div>
      )}

      {formData.type === 'OccupationalHealthcare' && (
        <>
          <div>
            Employer Name:
            <input
              type="text"
              value={(formData as OccupationalHealthcareEntry).employerName || ''}
              onChange={(e) => setFormData({ ...formData, employerName: e.target.value } as OccupationalHealthcareEntry)}
            />
          </div>
          <div>
            Sick Leave Start Date:
            <input
              type="date"
              value={(formData as OccupationalHealthcareEntry).sickLeave?.startDate || ''}
              onChange={(e) => setFormData({ ...formData, sickLeave: { ...(formData as OccupationalHealthcareEntry).sickLeave, startDate: e.target.value } } as OccupationalHealthcareEntry)}
            />
            Sick Leave End Date:
            <input
              type="date"
              value={(formData as OccupationalHealthcareEntry).sickLeave?.endDate || ''}
              onChange={(e) => setFormData({ ...formData, sickLeave: { ...(formData as OccupationalHealthcareEntry).sickLeave, endDate: e.target.value } } as OccupationalHealthcareEntry)}
            />            
          </div>
        </>
      )}

      {formData.type === 'Hospital' && (
        <>
          <div>
            Discharge Date:
            <input
              type="date"
              value={(formData as HospitalEntry).discharge?.date || ''}
              onChange={(e) => setFormData({ ...formData, discharge: { ...(formData as HospitalEntry).discharge, date: e.target.value } } as HospitalEntry)}
            />
            Discharge Criteria:
            <input
              type="text"
              value={(formData as HospitalEntry).discharge?.criteria || ''}
              onChange={(e) => setFormData({ ...formData, discharge: { ...(formData as HospitalEntry).discharge, criteria: e.target.value } } as HospitalEntry)}
            />            
          </div>
        </>
      )}

      <div>
        Description:
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        Date:
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        Specialist:
        <input
          type="text"
          value={formData.specialist}
          onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
        />
      </div>

      <div>
        Diagnosis Codes:
        <input
          type="text"
          value={formData.diagnosisCodes?.join(', ') || ''}
          onChange={(e) => setFormData({ ...formData, diagnosisCodes: e.target.value.split(', ') })}
        />
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default EntryForm;
