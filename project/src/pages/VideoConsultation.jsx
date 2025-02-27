import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone } from 'lucide-react';
import EmergencyCallButton from '../components/EmergencyCallButton';

const VideoConsultation = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // Mock data for available doctors
  useEffect(() => {
    setAvailableDoctors([
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        available: true,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'General Practitioner',
        available: true,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        specialty: 'Neurologist',
        available: false,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 4,
        name: 'Dr. James Wilson',
        specialty: 'Pulmonologist',
        available: true,
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      }
    ]);
  }, []);
  
  // Handle starting local video stream
  useEffect(() => {
    if (isConnected && localVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          localVideoRef.current.srcObject = stream;
          
          // Simulate remote connection after 2 seconds
          setTimeout(() => {
            if (remoteVideoRef.current) {
              // In a real app, this would be the remote peer's stream
              // For demo, we're just showing a static image
              remoteVideoRef.current.poster = selectedDoctor.image;
            }
          }, 2000);
        })
        .catch(err => {
          console.error('Error accessing media devices:', err);
          alert('Could not access camera or microphone. Please check permissions.');
          setIsConnected(false);
        });
    }
    
    return () => {
      // Clean up video streams when component unmounts
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isConnected, selectedDoctor]);
  
  const startConsultation = (doctor) => {
    setSelectedDoctor(doctor);
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);
  };
  
  const endCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsConnected(false);
    setSelectedDoctor(null);
  };
  
  const toggleMic = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicMuted(!isMicMuted);
    }
  };
  
  const toggleVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Video Consultation</h1>
        <p className="text-gray-600">Connect with healthcare professionals in real-time</p>
      </div>
      
      {!isConnected && !isConnecting ? (
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableDoctors.map(doctor => (
                <div key={doctor.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        doctor.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {doctor.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{doctor.specialty}</p>
                    <button
                      onClick={() => startConsultation(doctor)}
                      disabled={!doctor.available}
                      className={`w-full py-2 px-4 rounded-lg font-medium ${
                        doctor.available
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {doctor.available ? 'Start Consultation' : 'Currently Unavailable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Select a Doctor</h3>
                <p className="text-gray-600">Choose from our list of available healthcare professionals.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Connect</h3>
                <p className="text-gray-600">Start a secure video consultation with your chosen doctor.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Receive Care</h3>
                <p className="text-gray-600">Get medical advice, prescriptions, and follow-up instructions.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {isConnecting ? (
            <div className="text-center py-12">
              <div className="animate-pulse mb-4">
                <Video className="h-16 w-16 text-blue-500 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Connecting to {selectedDoctor.name}...</h2>
              <p className="text-gray-600">Please wait while we establish a secure connection</p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Consultation with {selectedDoctor.name}
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Connected
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                      poster={selectedDoctor.image}
                    ></video>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      {selectedDoctor.name}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    ></video>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      You
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center space-x-4">
                    <button
                      onClick={toggleMic}
                      className={`p-3 rounded-full ${
                        isMicMuted ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {isMicMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </button>
                    
                    <button
                      onClick={toggleVideo}
                      className={`p-3 rounded-full ${
                        isVideoOff ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                    </button>
                    
                    <button
                      onClick={endCall}
                      className="p-3 rounded-full bg-red-600 text-white"
                    >
                      <Phone className="h-6 w-6 transform rotate-135" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Consultation Notes</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Take notes during your consultation..."
                ></textarea>
              </div>
            </div>
          )}
        </div>
      )}
      
      <EmergencyCallButton />
    </div>
  );
};

export default VideoConsultation;