import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Shuffle, TrendingUp, Target, Database, Brain } from 'lucide-react';
import { clearCanvas } from './utils/canvas';
import { generateBinaryData, logisticRegression, sigmoid, splitData, calculateAccuracy } from './utils/math';

interface TrainingState {
  weights: number[];
  bias: number;
  loss: number;
  iteration: number;
}

const TrainingSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lossCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [isTraining, setIsTraining] = useState(false);
  const [data, setData] = useState(() => generateBinaryData(200));
  const [splitRatio, setSplitRatio] = useState(0.8);
  const [learningRate, setLearningRate] = useState(0.1);
  const [maxIterations, setMaxIterations] = useState(100);
  const [currentState, setCurrentState] = useState<TrainingState>({
    weights: [0.1, 0.1],
    bias: 0,
    loss: 1.0,
    iteration: 0
  });
  const [trainingHistory, setTrainingHistory] = useState<any[]>([]);
  const [trainData, setTrainData] = useState<any[]>([]);
  const [testData, setTestData] = useState<any[]>([]);
  const [showTestData, setShowTestData] = useState(true);

  // Split data whenever data or split ratio changes
  useEffect(() => {
    const { train, test } = splitData(data, splitRatio);
    setTrainData(train);
    setTestData(test);
    setTrainingHistory([]);
    setCurrentState({
      weights: [0.1, 0.1],
      bias: 0,
      loss: 1.0,
      iteration: 0
    });
  }, [data, splitRatio]);

  // Draw main visualization
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = 600;
    canvas.height = 400;
    
    drawTrainingVisualization(ctx, canvas.width, canvas.height);
    
  }, [currentState, trainData, testData, showTestData]);

  // Draw loss chart
  useEffect(() => {
    if (!lossCanvasRef.current) return;
    
    const canvas = lossCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = 400;
    canvas.height = 200;
    
    drawLossChart(ctx, canvas.width, canvas.height);
    
  }, [trainingHistory]);

  const drawTrainingVisualization = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    clearCanvas(ctx, width, height);
    
    const padding = 50;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    
    // Draw axes and grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    
    // Grid lines
    for (let i = 1; i < 6; i++) {
      const x = padding + (i * plotWidth / 6);
      const y = padding + (i * plotHeight / 6);
      
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    
    // Main axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Draw training data points
    trainData.forEach((point, index) => {
      const x = padding + (point.x + 3) / 6 * plotWidth;
      const y = height - padding - (point.y + 3) / 6 * plotHeight;
      
      // Calculate prediction
      const z = currentState.weights[0] * point.x + currentState.weights[1] * point.y + currentState.bias;
      const probability = sigmoid(z);
      const predicted = probability >= 0.5 ? 1 : 0;
      const isCorrect = point.label === predicted;
      
      // Color coding: correct predictions are brighter
      let color;
      if (point.label === 1) {
        color = isCorrect ? '#22c55e' : '#dc2626';
      } else {
        color = isCorrect ? '#3b82f6' : '#dc2626';
      }
      
      ctx.fillStyle = color;
      ctx.beginPath();
      const radius = point.label === 1 ? 6 : 4;
      if (point.label === 1) {
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
      } else {
        ctx.rect(x - radius/2, y - radius/2, radius, radius);
      }
      ctx.fill();
      
      // Add white border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Show probability as opacity for uncertainty visualization
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = probability > 0.5 ? '#22c55e' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, radius + 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Draw test data points (if enabled)
    if (showTestData && testData.length > 0) {
      testData.forEach((point) => {
        const x = padding + (point.x + 3) / 6 * plotWidth;
        const y = height - padding - (point.y + 3) / 6 * plotHeight;
        
        // Calculate prediction
        const z = currentState.weights[0] * point.x + currentState.weights[1] * point.y + currentState.bias;
        const probability = sigmoid(z);
        const predicted = probability >= 0.5 ? 1 : 0;
        const isCorrect = point.label === predicted;
        
        // Test points have dashed border
        ctx.strokeStyle = isCorrect ? '#fbbf24' : '#f87171';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.fillStyle = 'transparent';
        
        const radius = point.label === 1 ? 8 : 6;
        ctx.beginPath();
        if (point.label === 1) {
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
        } else {
          ctx.rect(x - radius/2, y - radius/2, radius, radius);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }
    
    // Draw decision boundary
    if (currentState.iteration > 0) {
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 4;
      ctx.beginPath();
      
      // Decision boundary: w1*x + w2*y + b = 0
      const w1 = currentState.weights[0];
      const w2 = currentState.weights[1];
      const b = currentState.bias;
      
      if (Math.abs(w2) > 0.001) {
        let firstPoint = true;
        for (let plotX = -3; plotX <= 3; plotX += 0.1) {
          const plotY = -(w1 * plotX + b) / w2;
          
          if (plotY >= -3 && plotY <= 3) {
            const canvasX = padding + (plotX + 3) / 6 * plotWidth;
            const canvasY = height - padding - (plotY + 3) / 6 * plotHeight;
            
            if (firstPoint) {
              ctx.moveTo(canvasX, canvasY);
              firstPoint = false;
            } else {
              ctx.lineTo(canvasX, canvasY);
            }
          }
        }
        ctx.stroke();
      }
    }
    
    // Labels and info
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Training Progress', 20, 30);
    
    ctx.font = '12px -apple-system, system-ui, sans-serif';
    ctx.fillText(`Iteration: ${currentState.iteration}`, 20, 50);
    ctx.fillText(`Loss: ${currentState.loss.toFixed(4)}`, 20, 65);
    ctx.fillText(`Weights: [${currentState.weights[0].toFixed(3)}, ${currentState.weights[1].toFixed(3)}]`, 20, 80);
    ctx.fillText(`Bias: ${currentState.bias.toFixed(3)}`, 20, 95);
    
    // Legend
    const legendX = width - 200;
    const legendY = 50;
    
    // Training data legend
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(legendX, legendY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Class 1 (Train)', legendX + 15, legendY + 4);
    
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.rect(legendX - 4, legendY + 16, 8, 8);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Class 0 (Train)', legendX + 15, legendY + 24);
    
    if (showTestData) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(legendX, legendY + 40, 8, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Test Data', legendX + 15, legendY + 44);
    }
    
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(legendX - 10, legendY + 60);
    ctx.lineTo(legendX + 10, legendY + 60);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Decision Boundary', legendX + 15, legendY + 64);
    
    // Axis labels
    ctx.font = '14px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Feature 1', width / 2, height - 15);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Feature 2', 0, 0);
    ctx.restore();
  };

  const drawLossChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    clearCanvas(ctx, width, height);
    
    if (trainingHistory.length < 2) return;
    
    const padding = 40;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Find loss range
    const losses = trainingHistory.map(h => h.loss);
    const minLoss = Math.min(...losses);
    const maxLoss = Math.max(...losses);
    const lossRange = maxLoss - minLoss || 1;
    
    // Draw loss curve
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let firstPoint = true;
    trainingHistory.forEach((entry, index) => {
      const x = padding + (index / (trainingHistory.length - 1)) * plotWidth;
      const normalizedLoss = (entry.loss - minLoss) / lossRange;
      const y = height - padding - normalizedLoss * plotHeight;
      
      if (firstPoint) {
        ctx.moveTo(x, y);
        firstPoint = false;
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Draw current point
    if (trainingHistory.length > 0) {
      const lastEntry = trainingHistory[trainingHistory.length - 1];
      const x = padding + ((trainingHistory.length - 1) / (trainingHistory.length - 1)) * plotWidth;
      const normalizedLoss = (lastEntry.loss - minLoss) / lossRange;
      const y = height - padding - normalizedLoss * plotHeight;
      
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Training Loss Over Time', 10, 20);
    
    // Axis labels
    ctx.font = '12px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Iteration', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Loss', 0, 0);
    ctx.restore();
    
    // Y-axis values
    ctx.textAlign = 'right';
    ctx.fillText(maxLoss.toFixed(3), padding - 5, padding + 5);
    ctx.fillText(minLoss.toFixed(3), padding - 5, height - padding + 5);
    ctx.fillText(((maxLoss + minLoss) / 2).toFixed(3), padding - 5, height / 2 + 5);
  };

  const startTraining = useCallback(() => {
    if (isTraining) return;
    
    setIsTraining(true);
    setTrainingHistory([]);
    
    // Initialize with random weights
    const initialWeights = [Math.random() - 0.5, Math.random() - 0.5];
    const initialBias = Math.random() - 0.5;
    
    setCurrentState({
      weights: initialWeights,
      bias: initialBias,
      loss: 1.0,
      iteration: 0
    });
    
    // Run training with animation
    let iteration = 0;
    let weights = [...initialWeights];
    let bias = initialBias;
    const history: any[] = [];
    
    const trainStep = () => {
      // Perform one gradient descent step
      let totalLoss = 0;
      let dw1 = 0, dw2 = 0, db = 0;
      
      // Forward pass and gradient computation
      for (const point of trainData) {
        const z = weights[0] * point.x + weights[1] * point.y + bias;
        const prediction = sigmoid(z);
        
        // Cross-entropy loss
        const loss = -point.label * Math.log(Math.max(prediction, 1e-10)) - 
                     (1 - point.label) * Math.log(Math.max(1 - prediction, 1e-10));
        totalLoss += loss;
        
        // Gradients
        const error = prediction - point.label;
        dw1 += error * point.x;
        dw2 += error * point.y;
        db += error;
      }
      
      // Update parameters
      weights[0] -= learningRate * dw1 / trainData.length;
      weights[1] -= learningRate * dw2 / trainData.length;
      bias -= learningRate * db / trainData.length;
      
      const avgLoss = totalLoss / trainData.length;
      iteration++;
      
      const newState = {
        weights: [...weights],
        bias,
        loss: avgLoss,
        iteration
      };
      
      setCurrentState(newState);
      history.push({
        iteration,
        weights: [...weights],
        bias,
        loss: avgLoss
      });
      setTrainingHistory([...history]);
      
      if (iteration < maxIterations && isTraining) {
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(trainStep);
        }, 100); // Slower animation for better visualization
      } else {
        setIsTraining(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(trainStep);
  }, [isTraining, trainData, learningRate, maxIterations]);

  const stopTraining = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsTraining(false);
  };

  const resetTraining = () => {
    stopTraining();
    setTrainingHistory([]);
    setCurrentState({
      weights: [0.1, 0.1],
      bias: 0,
      loss: 1.0,
      iteration: 0
    });
  };

  const generateNewData = () => {
    setData(generateBinaryData(200));
    resetTraining();
  };

  // Calculate accuracies
  const trainAccuracy = trainData.length > 0 ? calculateAccuracy(trainData, currentState.weights, currentState.bias) : 0;
  const testAccuracy = testData.length > 0 ? calculateAccuracy(testData, currentState.weights, currentState.bias) : 0;

  return (
    <div className="space-y-6">
      <div className="text-white/80 text-lg leading-relaxed">
        <p className="mb-4">
          Training a logistic regression model involves finding the optimal weights and bias through gradient descent.
          The algorithm iteratively adjusts parameters to minimize the cross-entropy loss function.
        </p>
        <p>
          Watch as the decision boundary evolves during training, and observe how the model learns to separate
          the two classes. The loss chart shows the optimization progress over time.
        </p>
      </div>

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Training Visualization */}
        <div className="xl:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Training Visualization</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowTestData(!showTestData)}
                className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 ${
                  showTestData 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-slate-600 text-white/70 hover:bg-slate-500'
                }`}
              >
                Test Data
              </button>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            className="w-full h-auto border border-white/20 rounded-lg bg-slate-900"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          
          {/* Training Controls */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Brain size={18} className="mr-2" />
              Training Controls
            </h4>
            
            <div className="space-y-3">
              <div className="flex space-x-2">
                <button
                  onClick={startTraining}
                  disabled={isTraining}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-500 rounded-lg text-white font-medium transition-all duration-300 hover:bg-green-600 disabled:opacity-50 flex-1 justify-center"
                >
                  <Play size={14} />
                  <span>Train</span>
                </button>
                <button
                  onClick={stopTraining}
                  disabled={!isTraining}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500 rounded-lg text-white font-medium transition-all duration-300 hover:bg-red-600 disabled:opacity-50"
                >
                  <Pause size={14} />
                </button>
                <button
                  onClick={resetTraining}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-600 rounded-lg text-white font-medium transition-all duration-300 hover:bg-slate-700"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
              
              <button
                onClick={generateNewData}
                className="flex items-center space-x-2 px-3 py-2 bg-purple-500 rounded-lg text-white font-medium transition-all duration-300 hover:bg-purple-600 w-full justify-center"
              >
                <Shuffle size={14} />
                <span>New Dataset</span>
              </button>
            </div>
          </div>

          {/* Hyperparameters */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Target size={18} className="mr-2" />
              Hyperparameters
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-white/80 font-medium mb-1 text-sm">
                  Learning Rate: {learningRate}
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isTraining}
                />
              </div>
              
              <div>
                <label className="block text-white/80 font-medium mb-1 text-sm">
                  Train/Test Split: {(splitRatio * 100).toFixed(0)}% / {((1-splitRatio) * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="0.9"
                  step="0.05"
                  value={splitRatio}
                  onChange={(e) => setSplitRatio(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isTraining}
                />
              </div>
              
              <div>
                <label className="block text-white/80 font-medium mb-1 text-sm">
                  Max Iterations: {maxIterations}
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="10"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isTraining}
                />
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <TrendingUp size={18} className="mr-2" />
              Performance
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/80">
                <span>Train Accuracy:</span>
                <span className="font-mono text-green-400">{(trainAccuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Test Accuracy:</span>
                <span className="font-mono text-yellow-400">{(testAccuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Current Loss:</span>
                <span className="font-mono text-orange-400">{currentState.loss.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Iteration:</span>
                <span className="font-mono text-blue-400">{currentState.iteration} / {maxIterations}</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentState.iteration / maxIterations) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Dataset Info */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Database size={18} className="mr-2" />
              Dataset Info
            </h4>
            
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between">
                <span>Total Points:</span>
                <span className="font-mono">{data.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Training Set:</span>
                <span className="font-mono">{trainData.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Test Set:</span>
                <span className="font-mono">{testData.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Class Balance:</span>
                <span className="font-mono">
                  {((data.filter(p => p.label === 1).length / data.length) * 100).toFixed(0)}% / {((data.filter(p => p.label === 0).length / data.length) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loss Chart */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2" />
          Loss Function Optimization
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <canvas
              ref={lossCanvasRef}
              className="w-full h-auto border border-white/20 rounded-lg bg-slate-900"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-medium mb-3">Training Insights</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Cross-entropy loss measures prediction confidence</li>
                <li>• Gradient descent minimizes loss by adjusting weights</li>
                <li>• Learning rate controls step size</li>
                <li>• Lower loss = better fit to training data</li>
                <li>• Watch for overfitting if test accuracy drops</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-medium mb-3">Current Model</h4>
              <div className="text-sm space-y-1 font-mono text-white/80">
                <div>w₁ = {currentState.weights[0].toFixed(3)}</div>
                <div>w₂ = {currentState.weights[1].toFixed(3)}</div>
                <div>b = {currentState.bias.toFixed(3)}</div>
                <div className="mt-2 p-2 bg-slate-900/50 rounded">
                  σ({currentState.weights[0].toFixed(2)}x₁ + {currentState.weights[1].toFixed(2)}x₂ + {currentState.bias.toFixed(2)})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSection;