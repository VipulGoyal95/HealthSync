import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const HealthRoutineCard = ({ title, icon, items, time, completed }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-indigo-100">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          {time && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{time}</span>
            </div>
          )}
        </div>
        
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5 ${
                completed && completed[index] 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200'
              }`}>
                {completed && completed[index] && (
                  <CheckCircle className="h-4 w-4" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                {item.description && (
                  <p className="text-xs text-gray-500">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthRoutineCard;