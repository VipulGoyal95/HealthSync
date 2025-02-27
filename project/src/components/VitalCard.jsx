import React from 'react';

const VitalCard = ({ title, value, unit, icon, color, normalRange, isNormal }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${color}`}>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${color.replace('border-', 'bg-').replace('-600', '-100')}`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          </div>
          {isNormal ? (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Normal
            </span>
          ) : (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
              Attention
            </span>
          )}
        </div>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">{value}</span>
              <span className="ml-1 text-lg text-gray-500">{unit}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Normal: {normalRange}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500">Last updated</div>
            <div className="text-sm text-gray-700">Just now</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalCard;