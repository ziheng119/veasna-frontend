import React from 'react';
import { SearchIcon, PlusIcon } from '../../assets/icons';

interface PatientSearchProps {
    onSearch?: (query: string) => void;
    onAddPatient?: () => void;
}

export const PatientSearch: React.FC<PatientSearchProps> = ({ onSearch, onAddPatient }) => {
    return (
        <div className='flex items-center gap-4 p-4 bg-gray-50'>
            <div className='relative flex-1'>
                <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                    type='text'
                    placeholder='Search Patient'
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onChange={(e) => onSearch ?.(e.target.value)}
                />
            </div>
            <button
                onClick={onAddPatient}
                className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors'
            > 
                <PlusIcon className='w-5 h-5'/>
            </button>
        </div>
    );
};