import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Brain } from 'lucide-react';
import LinearModelSection from './LinearModelSection';
import SigmoidSection from './SigmoidSection';
import DecisionBoundarySection from './DecisionBoundarySection';
import TrainingSection from './TrainingSection';

const sections = [
  { 
    id: 'linear', 
    title: 'Linear Model Foundation', 
    component: LinearModelSection,
    description: 'Understanding the linear equation that forms the backbone of logistic regression'
  },
  { 
    id: 'sigmoid', 
    title: 'Sigmoid Transformation', 
    component: SigmoidSection,
    description: 'How the sigmoid function converts linear outputs to probabilities'
  },
  { 
    id: 'boundary', 
    title: 'Decision Boundaries', 
    component: DecisionBoundarySection,
    description: 'Visualizing how the model separates different classes in feature space'
  },
  { 
    id: 'training', 
    title: 'Training & Testing', 
    component: TrainingSection,
    description: 'Watching gradient descent optimize the model and evaluate performance'
  }
];

function LogisticRegressionTutorial() {
  const [currentSection, setCurrentSection] = useState(0);
  const CurrentComponent = sections[currentSection].component;

  const nextSection = () => {
    setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
  };

  const prevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="tutorial-container">
      {/* Header */}
      <header className="tutorial-header">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indian-saffron to-red-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Interactive Logistic Regression Tutorial
                </h1>
                <p className="text-white/60 text-sm">
                  Learn machine learning concepts through hands-on visualization
                </p>
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="text-right">
              <div className="text-white/60 text-sm">Progress</div>
              <div className="text-white font-medium">{currentSection + 1} of {sections.length}</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-indian-saffron to-red-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <nav className="flex space-x-1 overflow-x-auto">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`tutorial-nav-button ${
                  index === currentSection
                    ? 'tutorial-nav-active'
                    : index < currentSection
                    ? 'tutorial-nav-completed'
                    : 'tutorial-nav-inactive'
                }`}
              >
                <span className="mr-2">{index + 1}.</span>
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="tutorial-card mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indian-saffron to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {sections[currentSection].title}
              </h2>
              <p className="text-white/70 text-lg">
                {sections[currentSection].description}
              </p>
            </div>
          </div>
          
          <CurrentComponent />
        </div>

        {/* Enhanced Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevSection}
            disabled={currentSection === 0}
            className="group tutorial-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <div className="text-left ml-3">
              <div className="text-sm">Previous</div>
              {currentSection > 0 && (
                <div className="text-xs text-white/60">{sections[currentSection - 1].title}</div>
              )}
            </div>
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-4">
            <div className="text-white/60 text-sm text-center">
              <div className="font-medium">Section {currentSection + 1}</div>
              <div className="text-xs">{Math.round(progress)}% Complete</div>
            </div>
            
            {/* Section dots */}
            <div className="flex space-x-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSection
                      ? 'bg-indian-saffron scale-125'
                      : index < currentSection
                      ? 'bg-indian-green'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextSection}
            disabled={currentSection === sections.length - 1}
            className="group tutorial-button-primary px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-right mr-3">
              <div className="text-sm">Next</div>
              {currentSection < sections.length - 1 && (
                <div className="text-xs text-white/80">{sections[currentSection + 1].title}</div>
              )}
            </div>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Course Overview */}
        <div className="mt-8 bg-gradient-to-r from-indian-blue/10 to-purple-500/10 rounded-2xl p-6 border border-indian-blue/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <BookOpen size={20} className="mr-2" />
            Learning Path Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  index === currentSection
                    ? 'bg-white/10 border-white/30 shadow-lg'
                    : index < currentSection
                    ? 'bg-indian-green/10 border-indian-green/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className={`text-lg font-semibold mb-2 ${
                  index === currentSection
                    ? 'text-white'
                    : index < currentSection
                    ? 'text-green-300'
                    : 'text-white/70'
                }`}>
                  {index + 1}. {section.title}
                </div>
                <div className="text-white/60 text-sm">
                  {section.description}
                </div>
                {index < currentSection && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 bg-indian-green/20 text-green-300 text-xs rounded-full">
                      ✓ Completed
                    </span>
                  </div>
                )}
                {index === currentSection && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 bg-indian-saffron/20 text-orange-300 text-xs rounded-full">
                      📍 Current
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default LogisticRegressionTutorial;
