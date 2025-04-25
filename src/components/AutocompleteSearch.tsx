
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '@/types/doctor';

interface AutocompleteSearchProps {
  doctors: Doctor[];
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ doctors, onSearch, searchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim().length > 0) {
      const filteredDoctors = doctors
        .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3); // Show only top 3 matches
      
      setSuggestions(filteredDoctors);
      setIsOpen(filteredDoctors.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
    setIsOpen(false);
  };

  const handleSuggestionClick = (doctorName: string) => {
    setInputValue(doctorName);
    onSearch(doctorName);
    setIsOpen(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl relative" ref={inputRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          data-testid="autocomplete-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-3">
                <img 
                  src={doctor.image || "https://via.placeholder.com/40"} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/40";
                  }}
                />
              </div>
              <div>
                <p className="font-medium">{doctor.name}</p>
                <p className="text-sm text-gray-500">{doctor.specialty.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
