'use client';

import React, { useState } from 'react';
import { FiSmile, FiFrown, FiSun, FiActivity, FiHelpCircle, FiCoffee } from 'react-icons/fi';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { id: 'happy', label: 'Happy', icon: FiSmile, color: 'bg-green-100 border-green-300 text-green-700' },
    { id: 'down', label: 'Down', icon: FiFrown, color: 'bg-blue-100 border-blue-300 text-blue-700' },
    { id: 'calm', label: 'Calm', icon: FiSun, color: 'bg-purple-100 border-purple-300 text-purple-700' },
    { id: 'stressed', label: 'Stressed', icon: FiActivity, color: 'bg-red-100 border-red-300 text-red-700' },
    { id: 'curious', label: 'Curious', icon: FiHelpCircle, color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
    { id: 'tired', label: 'Tired', icon: FiCoffee, color: 'bg-gray-100 border-gray-300 text-gray-700' },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">How are you feeling today?</h2>
        <p className="text-gray-600">Select your mood and we'll recommend books that match your current state of mind.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`
                flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all
                ${mood.color}
                ${isSelected ? 'ring-4 ring-primary scale-105' : 'hover:scale-[1.02]'}
              `}
            >
              <Icon className="h-12 w-12 mb-3" />
              <span className="font-medium text-lg">{mood.label}</span>
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <div className="mt-8 text-center">
          <button
            onClick={() => onMoodSelect(selectedMood)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Find Books for My Mood
          </button>
        </div>
      )}
    </div>
  );
}
