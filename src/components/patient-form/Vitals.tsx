import React from 'react';

interface PatientData {
    height: string;
    weight: string;
    bmi: string;
    category: string;
    isBelow3rdPercentile: boolean;
    bloodPressureSystolic: string;
    bloodPressureDiastolic: string;
    temperature: string;
    additionalNotes: string;
}

interface Props {
    patient: PatientData;
    onUpdatePatient: (updates: Partial<PatientData>) => void;
}

export default function Vitals({patient, onUpdatePatient }: Props) {
    const handleChange = (field: keyof PatientData, value: string | boolean) => {
        if (typeof value === 'string') {

            const regex0dp = /^\d*$/;
            const regex1dp = /^\d*\.?\d{0,1}$/;
            const regex2dp = /^\d*\.?\d{0,2}$/;

            if (field === 'weight' || field === 'bmi') {
                if (value === '' || regex2dp.test(value)) {
                    onUpdatePatient({ [field] : value });
                }
            } else if (field === 'bloodPressureDiastolic' || field === 'bloodPressureSystolic' || field === 'height') {
                if (value === '' || regex0dp.test(value)) {
                    onUpdatePatient({ [field] : value });
                }
            } else if (field === 'temperature') {
                if (value === '' || regex1dp.test(value)) {
                    onUpdatePatient({ [field] : value });
                }
            } else {
                onUpdatePatient({ [field] : value });
            }
        } else {
            onUpdatePatient({ [field] : value });
        };
    };

    const calculateBMI = () => {
        const heightValue = parseFloat(patient.height) / 100;
        const weightValue = parseFloat(patient.weight);

        if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
            return;
        }
        
        const bmiValue = weightValue / (heightValue * heightValue);
        const roundedBMI = Math.round(bmiValue * 100) / 100; // Round to 2 dp

        let category = '';
        if (bmiValue < 18.5) {
            category = 'Underweight';
        } else if (bmiValue < 25) {
            category = 'Healthy Weight'
        } else if (bmiValue < 30) {
            category = 'Overweight'
        } else if (bmiValue < 40) {
            category = 'Obese'
        } else {
            category = 'Severly Obese'
        }

        onUpdatePatient({
            bmi: roundedBMI.toString(),
            category
        });
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Underweight':
                return 'bg-blue-600';
            case 'Healthy Weight':
                return 'bg-green-600';
            case 'OverWeight':
                return 'bg-yellow-600';
            case 'Obesity':
                return 'bg-orange-600';
            case 'Severely Obese':
                return 'bg-red-600';
            default:
                return 'bg-gray-200';
        }
    };

    return (
        <div className='space-y-6'>
            <div className='space-y-5 w-full max-w-lg'>

                <div className='grid grid-cols-2 gap-4 items-center'>
                    <label className='text-sm font-medium text-gray-700'>
                        Height (cm)
                    </label>
                    <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={patient.height}
                        onChange={(e) => handleChange('height', e.target.value)}
                        className='text-black w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='grid grid-cols-2 gap-4 items-center'>
                    <label className='text-sm font-medium text-gray-700'>
                        Weight (kg)
                    </label>
                    <input
                        type='text'
                        inputMode='decimal'
                        placeholder='0.00'
                        value={patient.weight}
                        onChange={(e) => handleChange('weight', e.target.value)}
                        className='text-black w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='grid grid-cols-2 gap-4 items-center'>
                    <label className='text-sm font-medium text-gray-700'>
                        BMI
                    </label>
                    <div className='flex items-center gap-2'>
                        <input
                            type='text'
                            inputMode='decimal'
                            pattern='[0-9]*\.?[0-9]{0,2}'
                            placeholder='0.00'
                            value={patient.bmi}
                            onChange={(e) => handleChange('bmi', e.target.value)}
                            className=' text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            readOnly
                        />
                        <button
                            type='button'
                            onClick={calculateBMI}
                            className="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Calculate BMI
                        </button>
                    </div>
                </div>

                <div>
                    <div className='grid grid-cols-2 gap-4 items-center'>
                        <label htmlFor='below3rdPercentile' className='text-sm font-medium text-gray-700 w-2/3'>
                            Child is below 3rd percentile (BMI by age)
                        </label>
                        <input
                            type='checkbox'
                            id='below3rdPercentile'
                            checked={patient.isBelow3rdPercentile}
                            onChange={(e) => handleChange('isBelow3rdPercentile', e.target.checked)}
                            className='justify-self-start h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4 items-center'>
                    <label className='text-sm font-medium text-gray-700'>
                        Category
                    </label>
                    <input
                        type='text'
                        value={patient.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className={`text-black text-center w-36 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${getCategoryColor(patient.category)}`}   
                        readOnly
                    />
                </div>

                <div className='grid grid-cols-2 gap-4 items-center'>
                    <label className='text-sm font-medium text-gray-700'>
                        Blood Pressure [Systolic / Diastolic] (mm Hg)
                    </label>
                    <div className='flex gap-2 items-center'>
                    <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={patient.bloodPressureSystolic}
                        onChange={(e) => handleChange('bloodPressureSystolic', e.target.value)}
                        className='text-black w-29 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Systolic'
                    />
                    <span className='text-black'>/</span>
                    <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={patient.bloodPressureDiastolic}
                        onChange={(e) => handleChange('bloodPressureDiastolic', e.target.value)}
                        className='text-black w-29 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Diastolic'
                    />
                    </div>                 
                </div>

                <div className='grid grid-cols-2 gap-4 items-center'>
                    <label className='text-sm font-medium text-gray-700 mb-2'>
                        Temperature (°C)
                    </label>
                    <input
                        type='text'
                        inputMode='decimal'
                        pattern='[0-9]*\.?[0-9]{0,1}'
                        placeholder='0.0'
                        value={patient.temperature}
                        onChange={(e) => handleChange('temperature', e.target.value)}
                        className='text-black w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <label className='text-sm font-medium text-gray-700'>
                        Additional Notes
                    </label>
                    <textarea
                        value={patient.additionalNotes}
                        onChange={(e) => handleChange('additionalNotes', e.target.value)}
                        rows={4}
                        className='text-black w-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter any additional notes...'
                    />
                </div>

            </div>
        </div>
    )
}