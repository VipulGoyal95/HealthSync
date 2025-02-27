import React from 'react';
import { Pill, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const MedicationSchedule = ({ medications }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-full bg-blue-100">
            <Pill className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Medication Schedule</h3>
        </div>
        
        <div className="space-y-4">
          {medications.map((med, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{med.name}</h4>
                  <p className="text-sm text-gray-500">{med.dosage}</p>
                </div>
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                  med.taken 
                    ? 'bg-green-100 text-green-800' 
                    : med.missed 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {med.taken ? 'Taken' : med.missed ? 'Missed' : 'Due'}
                </div>
              </div>
              
              <div className="mt-2 flex items-center text-sm">
                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-600">{med.time}</span>
                
                {med.instructions && (
                  <span className="ml-3 text-gray-500">• {med.instructions}</span>
                )}
              </div>
              
              {med.warning && (
                <div className="mt-2 flex items-start text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                  <span>{med.warning}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationSchedule;