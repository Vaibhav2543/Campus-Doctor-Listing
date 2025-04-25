
import React from 'react';
import { Doctor } from '@/types/doctor';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="bg-white rounded-md shadow p-4 mb-4 flex flex-col md:flex-row">
      <div className="flex items-start">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 mr-4">
          <img 
            src={doctor.image || "https://via.placeholder.com/80"} 
            alt={doctor.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/80";
            }}
          />
        </div>
        
        <div className="flex-grow">
          <h2 data-testid="doctor-name" className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
          <p data-testid="doctor-specialty" className="text-gray-600">{doctor.specialty.join(', ')}</p>
          <p className="text-gray-600">{doctor.qualifications}</p>
          {doctor.additionalQualification && (
            <p className="text-gray-600">{doctor.additionalQualification}</p>
          )}
          <p data-testid="doctor-experience" className="text-gray-600 mt-1">{doctor.experience} yrs exp.</p>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm text-gray-600">{doctor.clinic}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-600">{doctor.location}</span>
            </div>
          </div>
        </div>
        
        <div className="md:ml-4 mt-4 md:mt-0 flex flex-col items-end justify-between h-full">
          <p data-testid="doctor-fee" className="text-xl font-bold text-gray-800">₹ {doctor.fees}</p>
          <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Book Appointment</Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
