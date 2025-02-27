import React from 'react';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const PredictionCard = ({ title, riskLevel, probability, factors, recommendations }) => {
  // Determine color and icon based on risk level
  const getStatusInfo = () => {
    switch (riskLevel) {
      case 'High':
        return {
          color: 'bg-red-100 text-red-800',
          borderColor: 'border-red-600',
          bgColor: 'bg-red-50',
          icon: <AlertCircle className="h-6 w-6 text-red-600" />
        };
      case 'Moderate':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          borderColor: 'border-yellow-600',
          bgColor: 'bg-yellow-50',
          icon: <HelpCircle className="h-6 w-6 text-yellow-600" />
        };
      case 'Low':
        return {
          color: 'bg-green-100 text-green-800',
          borderColor: 'border-green-600',
          bgColor: 'bg-green-50',
          icon: <CheckCircle className="h-6 w-6 text-green-600" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          borderColor: 'border-gray-600',
          bgColor: 'bg-gray-50',
          icon: <HelpCircle className="h-6 w-6 text-gray-600" />
        };
    }
  };

  const { color, borderColor, bgColor, icon } = getStatusInfo();

  return (
    <div className={`rounded-xl shadow-md overflow-hidden border-l-4 ${borderColor} ${bgColor}`}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${color.replace('text-', 'bg-').replace('-800', '-100')}`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${color}`}>
            {riskLevel} Risk
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Risk Probability</span>
            <span className="text-sm font-medium text-gray-700">{probability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${color.replace('bg-', '').replace('text-', 'bg-')}`} 
              style={{ width: `${probability}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Contributing Factors:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {factors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;