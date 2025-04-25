
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationMode: string;
  sortBy: string;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationModeChange: (mode: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  specialties,
  selectedSpecialties,
  consultationMode,
  sortBy,
  onSpecialtyChange,
  onConsultationModeChange,
  onSortChange
}) => {
  const [expandedSort, setExpandedSort] = React.useState(true);
  const [expandedSpecialties, setExpandedSpecialties] = React.useState(true);
  const [expandedConsultation, setExpandedConsultation] = React.useState(true);

  return (
    <div className="bg-white rounded-md shadow p-4">
      {/* Sort Section */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpandedSort(!expandedSort)}
        >
          <h3 className="font-medium text-gray-700" data-testid="filter-header-sort">Sort by</h3>
          {expandedSort ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        
        {expandedSort && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sort"
                data-testid="sort-fees"
                checked={sortBy === 'fees'}
                onChange={() => onSortChange('fees')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Price: Low-High</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sort"
                data-testid="sort-experience"
                checked={sortBy === 'experience'}
                onChange={() => onSortChange('experience')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Experience: Most Experience first</span>
            </label>
          </div>
        )}
      </div>

      <div className="my-4">
        <h3 className="font-medium text-gray-700">Filters</h3>
      </div>

      {/* Specialties Section */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpandedSpecialties(!expandedSpecialties)}
        >
          <h3 className="font-medium text-gray-700" data-testid="filter-header-speciality">Specialities</h3>
          {expandedSpecialties ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        
        {expandedSpecialties && (
          <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                  className="h-4 w-4 text-blue-600"
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Mode of Consultation */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpandedConsultation(!expandedConsultation)}
        >
          <h3 className="font-medium text-gray-700" data-testid="filter-header-moc">Mode of consultation</h3>
          {expandedConsultation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        
        {expandedConsultation && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="consultationMode"
                data-testid="filter-video-consult"
                value="videoConsult"
                checked={consultationMode === 'videoConsult'}
                onChange={() => onConsultationModeChange('videoConsult')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Video Consultation</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="consultationMode"
                data-testid="filter-in-clinic"
                value="inClinic"
                checked={consultationMode === 'inClinic'}
                onChange={() => onConsultationModeChange('inClinic')}
                className="h-4 w-4 text-blue-600"
              />
              <span>In-clinic Consultation</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="consultationMode"
                value="all"
                checked={consultationMode === ''}
                onChange={() => onConsultationModeChange('')}
                className="h-4 w-4 text-blue-600"
              />
              <span>All</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
