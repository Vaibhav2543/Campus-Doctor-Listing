
import React from 'react';
import { Doctor } from '@/types/doctor';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Clock } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="space-y-4">
        {/* Doctor header section */}
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={doctor.image || "https://via.placeholder.com/48"} 
              alt={doctor.name}
            />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow">
            <h2 data-testid="doctor-name" className="text-lg font-semibold text-gray-800">
              {doctor.name}
            </h2>
            <p data-testid="doctor-specialty" className="text-sm text-gray-600">
              {doctor.specialty.join(' • ')}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {doctor.qualifications}
            </p>
          </div>
          
          <div className="text-right">
            <p data-testid="doctor-fee" className="font-semibold text-gray-900">
              ₹ {doctor.fees}
            </p>
          </div>
        </div>

        {/* Doctor details section */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span data-testid="doctor-experience">{doctor.experience} yrs exp.</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{doctor.clinic}</span>
            <span className="text-gray-400">•</span>
            <span>{doctor.location}</span>
          </div>
        </div>

        {/* Book appointment button */}
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
          variant="default"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
