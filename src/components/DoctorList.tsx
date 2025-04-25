
import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '@/types/doctor';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-md shadow p-8 text-center">
        <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
