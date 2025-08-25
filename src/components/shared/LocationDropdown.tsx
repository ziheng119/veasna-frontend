'use client';
import { useState, useRef, useEffect } from 'react';
import { useLocationStore } from '@/stores/useLocationStore';
import { LocationIcon, PlusIcon, TrashIcon } from '@/assets/icons';
import { Location } from '@/lib/types/location';

export default function LocationDropdown() {
  const { locations, currentLocation, setCurrentLocation, addLocation, removeLocation } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddLocationInput, setShowAddLocationInput] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditMode(false);
        setShowAddLocationInput(false);
        setNewLocationName('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when showing add location
  useEffect(() => {
    if (showAddLocationInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showAddLocationInput]);

  const handleLocationSelect = (location: Location) => {
    if (!isEditMode) {
      setCurrentLocation(location);
      setIsOpen(false);
    }
  };

  const handleDeleteLocation = (locationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeLocation(locationId);
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
    setShowAddLocationInput(false);
    setNewLocationName('');
  };

  const handleAddLocation = () => {
    setShowAddLocationInput(true);
  };

  const handleSubmitNewLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocationName.trim()) {
      const newLocation: Location = {
        id: Date.now().toString(),
        name: newLocationName.trim(),
      };
      addLocation(newLocation);
      setNewLocationName('');
      setShowAddLocationInput(false);
    }
  };

  const handleCancelAdd = () => {
    setShowAddLocationInput(false);
    setNewLocationName('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <LocationIcon className="w-5 h-5" color={'white'} />
        <span className="font-medium">
          {currentLocation?.name || 'Select Location'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* Header with Edit Toggle */}
          <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {isEditMode ? 'Edit Locations' : 'Select Location'}
            </span>
            <button
              onClick={handleEditModeToggle}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150"
            >
              {isEditMode ? 'Done' : 'Edit'}
            </button>
          </div>

          {/* Location Options */}
          {locations.map((location) => (
            <div
              key={location.id}
              className={`flex items-center px-4 py-3 text-gray-800 ${
                !isEditMode ? 'hover:bg-blue-50 hover:text-blue-600 cursor-pointer' : ''
              } transition-colors duration-150 ${
                currentLocation?.id === location.id && !isEditMode
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : ''
              }`}
              onClick={() => handleLocationSelect(location)}
            >
              <LocationIcon className="w-4 h-4 mr-2" />
              <span className="flex-1">{location.name}</span>
              
              {isEditMode ? (

                <button
                  onClick={(e) => handleDeleteLocation(location.id, e)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-150"
                  title="Delete location"
                >
                  <TrashIcon className="w-4 h-4"/>
                </button>
              ) : (
        
                currentLocation?.id === location.id && (
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )
              )}
            </div>
          ))}

          {/* Add Location Section - Only visible in edit mode */}
          {isEditMode && (
            <>
              {/* Separator */}
              <div className="border-t border-gray-200 my-1" />

              {showAddLocationInput ? (
                <form onSubmit={handleSubmitNewLocation} className="px-4 py-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    placeholder="Enter location name"
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      type="submit"
                      disabled={!newLocationName.trim()}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelAdd}
                      className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors duration-150"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={handleAddLocation}
                  className="w-full text-left px-4 py-3 text-blue-600 hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-2"
                >
                  <PlusIcon className='w-4 h-4'/>
                  <span className="font-medium">Add Location</span>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}