import React from 'react';
import { Utensils, Coffee, Sun, Sunset } from 'lucide-react';

const MealCard = ({ title, icon, foods, time, calories }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-full bg-green-100">
            {icon}
          </div>
          <h4 className="font-medium text-gray-800">{title}</h4>
        </div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
      
      <ul className="space-y-2 mb-3">
        {foods.map((food, index) => (
          <li key={index} className="text-sm">
            <span className="text-gray-800">{food.name}</span>
            {food.portion && (
              <span className="text-gray-500"> • {food.portion}</span>
            )}
          </li>
        ))}
      </ul>
      
      <div className="text-xs text-gray-500 flex justify-between items-center pt-2 border-t border-gray-100">
        <span>Total Calories</span>
        <span className="font-medium text-gray-700">{calories} kcal</span>
      </div>
    </div>
  );
};

const DietPlan = ({ meals }) => {
  // Icons for different meal types
  const mealIcons = {
    breakfast: <Coffee className="h-4 w-4 text-green-600" />,
    lunch: <Sun className="h-4 w-4 text-green-600" />,
    dinner: <Sunset className="h-4 w-4 text-green-600" />,
    snack: <Utensils className="h-4 w-4 text-green-600" />
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-full bg-green-100">
            <Utensils className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Personalized Diet Plan</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meals.map((meal, index) => (
            <MealCard 
              key={index}
              title={meal.title}
              icon={mealIcons[meal.type] || mealIcons.snack}
              foods={meal.foods}
              time={meal.time}
              calories={meal.calories}
            />
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
          <p className="font-medium">Dietary Notes:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Low sodium diet recommended for blood pressure management</li>
            <li>Limit caffeine intake to morning hours only</li>
            <li>Stay hydrated with 8-10 glasses of water daily</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;