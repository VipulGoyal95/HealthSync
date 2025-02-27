import React, { useState, useEffect } from 'react';
import VitalCard from '../components/VitalCard';
import HealthChart from '../components/HealthChart';
import EmergencyCallButton from '../components/EmergencyCallButton';
import PredictionCard from '../components/PredictionCard';
import HealthRoutineCard from '../components/HealthRoutineCard';
import MedicationSchedule from '../components/MedicationSchedule';
import DietPlan from '../components/DietPlan';
import { 
  Heart, 
  Thermometer, 
  Droplet, 
  Activity, 
  Settings as Lungs, 
  Clock, 
  Dumbbell, 
  Brain, 
  Sun
} from 'lucide-react';

// Generate random data within a range
const generateRandomData = (min, max, count) => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Generate time labels for the last 24 hours
const generateTimeLabels = () => {
  const labels = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    labels.push(time.getHours() + ':00');
  }
  
  return labels;
};

const Dashboard = () => {
  // State for vital signs
  const [heartRate, setHeartRate] = useState(72);
  const [temperature, setTemperature] = useState(98.6);
  const [bloodPressure, setBloodPressure] = useState('120/80');
  const [oxygenLevel, setOxygenLevel] = useState(98);
  const [respirationRate, setRespirationRate] = useState(16);
  
  // State for chart data
  const [heartRateHistory, setHeartRateHistory] = useState(generateRandomData(65, 85, 24));
  const [temperatureHistory, setTemperatureHistory] = useState(generateRandomData(97, 99, 24));
  const [oxygenHistory, setOxygenHistory] = useState(generateRandomData(95, 100, 24));
  
  // State for disease predictions
  const [heartDiseaseRisk, setHeartDiseaseRisk] = useState({
    riskLevel: 'Moderate',
    probability: 35,
    factors: [
      'Elevated blood pressure (systolic > 120)',
      'Family history of heart disease',
      'Sedentary lifestyle'
    ],
    recommendations: [
      'Schedule a cardiology consultation',
      'Reduce sodium intake',
      'Increase physical activity to 150 minutes per week',
      'Monitor blood pressure daily'
    ]
  });
  
  const [strokeRisk, setStrokeRisk] = useState({
    riskLevel: 'Low',
    probability: 12,
    factors: [
      'Age factor',
      'Occasional high blood pressure readings'
    ],
    recommendations: [
      'Maintain healthy diet rich in fruits and vegetables',
      'Continue regular exercise routine',
      'Annual check-up with primary care physician'
    ]
  });
  
  // State for exercise routine
  const [exerciseRoutine, setExerciseRoutine] = useState([
    { name: 'Morning Walk', description: '30 minutes, moderate pace' },
    { name: 'Stretching', description: '15 minutes, focus on lower back' },
    { name: 'Light Strength Training', description: '20 minutes, resistance bands' },
    { name: 'Evening Yoga', description: '15 minutes, relaxation poses' }
  ]);
  
  const [exerciseCompleted, setExerciseCompleted] = useState([true, true, false, false]);
  
  // State for medication schedule
  const [medications, setMedications] = useState([
    { 
      name: 'Lisinopril', 
      dosage: '10mg, 1 tablet', 
      time: '8:00 AM', 
      instructions: 'Take with food', 
      taken: true,
      missed: false
    },
    { 
      name: 'Metformin', 
      dosage: '500mg, 1 tablet', 
      time: '8:00 AM', 
      instructions: 'Take with breakfast', 
      taken: true,
      missed: false
    },
    { 
      name: 'Atorvastatin', 
      dosage: '20mg, 1 tablet', 
      time: '8:00 PM', 
      instructions: 'Take after dinner', 
      taken: false,
      missed: false
    },
    { 
      name: 'Aspirin', 
      dosage: '81mg, 1 tablet', 
      time: '12:00 PM', 
      instructions: 'Take with lunch', 
      taken: false,
      missed: true,
      warning: 'You missed this dose. Take it now or consult your doctor.'
    }
  ]);
  
  // State for diet plan
  const [meals, setMeals] = useState([
    {
      title: 'Breakfast',
      type: 'breakfast',
      time: '7:30 AM',
      calories: 350,
      foods: [
        { name: 'Oatmeal with berries', portion: '1 cup' },
        { name: 'Greek yogurt', portion: '1/2 cup' },
        { name: 'Green tea', portion: '1 cup' }
      ]
    },
    {
      title: 'Morning Snack',
      type: 'snack',
      time: '10:30 AM',
      calories: 120,
      foods: [
        { name: 'Apple', portion: '1 medium' },
        { name: 'Almonds', portion: '10-12 nuts' }
      ]
    },
    {
      title: 'Lunch',
      type: 'lunch',
      time: '12:30 PM',
      calories: 450,
      foods: [
        { name: 'Grilled chicken salad', portion: '1 bowl' },
        { name: 'Whole grain bread', portion: '1 slice' },
        { name: 'Olive oil dressing', portion: '1 tbsp' }
      ]
    },
    {
      title: 'Dinner',
      type: 'dinner',
      time: '6:30 PM',
      calories: 420,
      foods: [
        { name: 'Baked salmon', portion: '4 oz' },
        { name: 'Steamed vegetables', portion: '1 cup' },
        { name: 'Brown rice', portion: '1/2 cup' }
      ]
    }
  ]);
  
  // Time labels for charts
  const timeLabels = generateTimeLabels();
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update current values with small random changes
      setHeartRate(prev => {
        const newValue = prev + (Math.random() * 6 - 3);
        return Math.round(Math.max(60, Math.min(100, newValue)));
      });
      
      setTemperature(prev => {
        const newValue = prev + (Math.random() * 0.4 - 0.2);
        return parseFloat(Math.max(97, Math.min(100, newValue)).toFixed(1));
      });
      
      setOxygenLevel(prev => {
        const newValue = prev + (Math.random() * 2 - 1);
        return Math.round(Math.max(94, Math.min(100, newValue)));
      });
      
      setRespirationRate(prev => {
        const newValue = prev + (Math.random() * 2 - 1);
        return Math.round(Math.max(12, Math.min(20, newValue)));
      });
      
      // Randomly change blood pressure
      const systolic = Math.round(110 + Math.random() * 20);
      const diastolic = Math.round(70 + Math.random() * 15);
      setBloodPressure(`${systolic}/${diastolic}`);
      
      // Update history data
      setHeartRateHistory(prev => {
        const newData = [...prev.slice(1), Math.round(60 + Math.random() * 40)];
        return newData;
      });
      
      setTemperatureHistory(prev => {
        const newData = [...prev.slice(1), parseFloat((97 + Math.random() * 3).toFixed(1))];
        return newData;
      });
      
      setOxygenHistory(prev => {
        const newData = [...prev.slice(1), Math.round(94 + Math.random() * 6)];
        return newData;
      });
      
      // Occasionally update disease risk predictions
      if (Math.random() > 0.9) {
        // Update heart disease risk
        const newProbability = Math.round(30 + Math.random() * 15);
        const newRiskLevel = newProbability > 40 ? 'High' : newProbability > 20 ? 'Moderate' : 'Low';
        
        setHeartDiseaseRisk(prev => ({
          ...prev,
          riskLevel: newRiskLevel,
          probability: newProbability
        }));
        
        // Update stroke risk
        const newStrokeProbability = Math.round(5 + Math.random() * 20);
        const newStrokeRiskLevel = newStrokeProbability > 25 ? 'Moderate' : 'Low';
        
        setStrokeRisk(prev => ({
          ...prev,
          riskLevel: newStrokeRiskLevel,
          probability: newStrokeProbability
        }));
      }
      
      // Occasionally update exercise completion
      if (Math.random() > 0.95) {
        setExerciseCompleted(prev => {
          const newCompleted = [...prev];
          const randomIndex = Math.floor(Math.random() * newCompleted.length);
          newCompleted[randomIndex] = !newCompleted[randomIndex];
          return newCompleted;
        });
      }
      
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Patient Health Dashboard</h1>
        <p className="text-gray-600">Real-time health monitoring system</p>
      </div>
      
      {/* Vital Signs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <VitalCard 
          title="Heart Rate" 
          value={heartRate} 
          unit="bpm" 
          icon={<Heart className="h-5 w-5 text-red-600" />} 
          color="border-red-600"
          normalRange="60-100 bpm"
          isNormal={heartRate >= 60 && heartRate <= 100}
        />
        
        <VitalCard 
          title="Body Temperature" 
          value={temperature} 
          unit="°F" 
          icon={<Thermometer className="h-5 w-5 text-orange-600" />} 
          color="border-orange-600"
          normalRange="97.7-99.5 °F"
          isNormal={temperature >= 97.7 && temperature <= 99.5}
        />
        
        <VitalCard 
          title="Blood Pressure" 
          value={bloodPressure} 
          unit="mmHg" 
          icon={<Activity className="h-5 w-5 text-blue-600" />} 
          color="border-blue-600"
          normalRange="90/60-120/80 mmHg"
          isNormal={
            parseInt(bloodPressure.split('/')[0]) <= 120 && 
            parseInt(bloodPressure.split('/')[1]) <= 80
          }
        />
        
        <VitalCard 
          title="Oxygen Level" 
          value={oxygenLevel} 
          unit="%" 
          icon={<Droplet className="h-5 w-5 text-blue-500" />} 
          color="border-blue-500"
          normalRange="95-100 %"
          isNormal={oxygenLevel >= 95}
        />
        
        <VitalCard 
          title="Respiration Rate" 
          value={respirationRate} 
          unit="bpm" 
          icon={<Lungs className="h-5 w-5 text-purple-600" />} 
          color="border-purple-600"
          normalRange="12-20 bpm"
          isNormal={respirationRate >= 12 && respirationRate <= 20}
        />
        
        <VitalCard 
          title="Last Check-up" 
          value="3" 
          unit="days ago" 
          icon={<Clock className="h-5 w-5 text-gray-600" />} 
          color="border-gray-600"
          normalRange="< 30 days"
          isNormal={true}
        />
      </div>
      
      {/* AI Disease Prediction */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">AI Disease Prediction</h2>
          <span className="ml-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Powered by AI
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PredictionCard 
            title="Heart Disease Risk Assessment" 
            riskLevel={heartDiseaseRisk.riskLevel}
            probability={heartDiseaseRisk.probability}
            factors={heartDiseaseRisk.factors}
            recommendations={heartDiseaseRisk.recommendations}
          />
          
          <PredictionCard 
            title="Stroke Risk Assessment" 
            riskLevel={strokeRisk.riskLevel}
            probability={strokeRisk.probability}
            factors={strokeRisk.factors}
            recommendations={strokeRisk.recommendations}
          />
        </div>
      </div>
      
      {/* Personalized Health Plan */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Personalized Health Plan</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <HealthRoutineCard 
            title="Today's Exercise Routine" 
            icon={<Dumbbell className="h-5 w-5 text-indigo-600" />}
            items={exerciseRoutine}
            time="Daily"
            completed={exerciseCompleted}
          />
          
          <MedicationSchedule medications={medications} />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <DietPlan meals={meals} />
        </div>
      </div>
      
      {/* Charts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Trends</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <HealthChart 
            title="Heart Rate History" 
            data={heartRateHistory} 
            labels={timeLabels}
            borderColor="rgb(239, 68, 68)"
            backgroundColor="rgba(239, 68, 68, 0.1)"
            yAxisLabel="BPM"
          />
          
          <HealthChart 
            title="Body Temperature" 
            data={temperatureHistory} 
            labels={timeLabels}
            borderColor="rgb(249, 115, 22)"
            backgroundColor="rgba(249, 115, 22, 0.1)"
            yAxisLabel="°F"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <HealthChart 
            title="Oxygen Saturation" 
            data={oxygenHistory} 
            labels={timeLabels}
            borderColor="rgb(59, 130, 246)"
            backgroundColor="rgba(59, 130, 246, 0.1)"
            yAxisLabel="%"
          />
        </div>
      </div>
      
      {/* Patient Information */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="text-lg font-medium text-gray-900">John Doe</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
              <p className="text-lg font-medium text-gray-900">January 15, 1985</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Patient ID</h3>
              <p className="text-lg font-medium text-gray-900">#12345678</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Primary Doctor</h3>
              <p className="text-lg font-medium text-gray-900">Dr. Sarah Johnson</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Next Appointment</h3>
              <p className="text-lg font-medium text-gray-900">June 15, 2025 - 10:30 AM</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Medical Conditions</h3>
              <p className="text-lg font-medium text-gray-900">Hypertension, Type 2 Diabetes</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency Call Button */}
      <EmergencyCallButton />
    </div>
  );
};

export default Dashboard;