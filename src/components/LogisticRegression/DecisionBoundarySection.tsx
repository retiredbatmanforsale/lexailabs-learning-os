import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Shuffle, ToggleLeft, ToggleRight } from 'lucide-react';
import { clearCanvas } from './utils/canvas';
import { sigmoid, generateBinaryData } from './utils/math';

const DecisionBoundarySection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probabilityCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isAnimating, setIsAnimating] = useState(false);
  const [threshold, setThreshold] = useState(0.5);
  const [animationStep, setAnimationStep] = useState(0);
  const [data, setData] = useState(() => generateBinaryData(100));
  const [weights, setWeights] = useState([0.8, 0.3]);
  const [bias, setBias] = useState(-0.5);
  const [classificationMode, setClassificationMode] = useState<'hard' | 'soft'>('hard');
  const [showProbabilities, setShowProbabilities] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = 600;
    canvas.height = 400;
    
    drawDecisionBoundary(ctx, canvas.width, canvas.height);
    
  }, [threshold, data, animationStep, weights, bias, classificationMode, showProbabilities]);

  useEffect(() => {
    if (!probabilityCanvasRef.current || !showProbabilities) return;
    
    const canvas = probabilityCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = 300;
    canvas.height = 200;
    
    drawProbabilityHeatmap(ctx, canvas.width, canvas.height);
    
  }, [weights, bias, showProbabilities]);

  const drawDecisionBoundary = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    clearCanvas(ctx, width, height);
    
    const padding = 50;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    
    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
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
    
    // Draw axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Draw data points with animation
    const maxSteps = Math.min(animationStep, data.length);
    for (let i = 0; i < maxSteps; i++) {
      const point = data[i];
      const x = padding + (point.x + 3) / 6 * plotWidth;
      const y = height - padding - (point.y + 3) / 6 * plotHeight;
      
      // Calculate probability for this point
      const linearOutput = weights[0] * point.x + weights[1] * point.y + bias;
      const probability = sigmoid(linearOutput);
      
      let predicted;
      if (classificationMode === 'hard') {
        predicted = probability >= threshold ? 1 : 0;
      } else {
        // Soft classification shows probability as opacity/color intensity
        predicted = probability;
      }
      
      // Color based on true class and prediction
      let color;
      if (classificationMode === 'hard') {
        const isCorrect = point.label === predicted;
        if (isCorrect) {
          color = point.label === 1 ? '#22c55e' : '#3b82f6';
        } else {
          color = '#ef4444';
        }
      } else {
        // Soft mode: color intensity based on probability
        const intensity = Math.abs(probability - 0.5) * 2; // 0 to 1
        if (point.label === 1) {
          color = `rgba(34, 197, 94, ${0.4 + intensity * 0.6})`;
        } else {
          color = `rgba(59, 130, 246, ${0.4 + intensity * 0.6})`;
        }
      }
      
      ctx.fillStyle = color;
      ctx.beginPath();
      
      const radius = classificationMode === 'hard' ? 
        (point.label === 1 ? 6 : 4) : 
        4 + probability * 4;
        
      if (point.label === 1) {
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
      } else {
        const size = radius * 0.8;
        ctx.rect(x - size, y - size, size * 2, size * 2);
      }
      ctx.fill();
      
      // Add border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Show probability text for soft mode
      if (classificationMode === 'soft' && showProbabilities) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px -apple-system, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${(probability * 100).toFixed(0)}%`, x, y - radius - 8);
      }
    }
    
    // Draw decision boundary
    if (animationStep > data.length + 20) {
      if (classificationMode === 'hard') {
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 4;
      } else {
        // Multiple threshold lines for soft classification
        const thresholds = [0.1, 0.3, 0.5, 0.7, 0.9];
        thresholds.forEach((t, index) => {
          const alpha = t === 0.5 ? 1 : 0.3 + (Math.abs(t - 0.5) * 1.4);
          ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
          ctx.lineWidth = t === 0.5 ? 4 : 2;
          drawBoundaryLine(ctx, t);
        });
        
        // Don't draw the main line again
        return;
      }
      
      drawBoundaryLine(ctx, threshold);
    }
    
    // Labels and info
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Decision Boundary (${classificationMode === 'hard' ? 'Hard' : 'Soft'} Classification)`, 20, 30);
    
    ctx.font = '12px -apple-system, system-ui, sans-serif';
    ctx.fillText(`Threshold: ${threshold.toFixed(2)}`, 20, 50);
    ctx.fillText(`Weights: [${weights[0].toFixed(2)}, ${weights[1].toFixed(2)}]`, 20, 65);
    ctx.fillText(`Bias: ${bias.toFixed(2)}`, 20, 80);
    
    // Legend
    const legendX = width - 200;
    const legendY = 60;
    
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(legendX, legendY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Class 1 (Positive)', legendX + 15, legendY + 4);
    
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.rect(legendX - 4, legendY + 20, 8, 8);
    ctx.fill();
    ctx.fillText('Class 0 (Negative)', legendX + 15, legendY + 28);
    
    if (classificationMode === 'hard') {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(legendX, legendY + 40, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('Misclassified', legendX + 15, legendY + 44);
    }
    
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(legendX - 10, legendY + 60);
    ctx.lineTo(legendX + 10, legendY + 60);
    ctx.stroke();
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

  const drawBoundaryLine = (ctx: CanvasRenderingContext2D, t: number) => {
    const canvas = canvasRef.current!;
    const padding = 50;
    const plotWidth = canvas.width - 2 * padding;
    const plotHeight = canvas.height - 2 * padding;
    
    // Decision boundary equation: w1*x + w2*y + b = log(t/(1-t))
    const logOdds = Math.log(t / (1 - t));
    const boundaryBias = logOdds - bias;
    
    ctx.beginPath();
    let firstPoint = true;
    
    // Draw line: w1*x + w2*y = -boundaryBias
    // y = (-boundaryBias - w1*x) / w2
    if (Math.abs(weights[1]) > 0.001) {
      for (let plotX = -3; plotX <= 3; plotX += 0.1) {
        const plotY = (-boundaryBias - weights[0] * plotX) / weights[1];
        
        if (plotY >= -3 && plotY <= 3) {
          const canvasX = padding + (plotX + 3) / 6 * plotWidth;
          const canvasY = canvas.height - padding - (plotY + 3) / 6 * plotHeight;
          
          if (firstPoint) {
            ctx.moveTo(canvasX, canvasY);
            firstPoint = false;
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }
      }
    }
    ctx.stroke();
  };

  const drawProbabilityHeatmap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    clearCanvas(ctx, width, height);
    
    const resolution = 20;
    
    // Draw heatmap
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = -3 + (i / resolution) * 6;
        const y = -3 + (j / resolution) * 6;
        
        const linearOutput = weights[0] * x + weights[1] * y + bias;
        const probability = sigmoid(linearOutput);
        
        const cellWidth = width / resolution;
        const cellHeight = height / resolution;
        
        // Color based on probability
        const red = Math.floor(255 * (1 - probability));
        const green = Math.floor(255 * probability);
        
        ctx.fillStyle = `rgba(${red}, ${green}, 100, 0.6)`;
        ctx.fillRect(i * cellWidth, (resolution - 1 - j) * cellHeight, cellWidth, cellHeight);
      }
    }
    
    // Add title
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Probability Heatmap', width / 2, 20);
    
    // Legend
    ctx.font = '10px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Red: Low P', 10, height - 25);
    ctx.fillText('Green: High P', 10, height - 10);
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationStep(0);
    
    let step = 0;
    const animate = () => {
      step += 2;
      setAnimationStep(step);
      
      // Animate threshold during demo
      if (step > 60 && step < 100) {
        const progress = (step - 60) / 40;
        setThreshold(0.1 + 0.8 * Math.sin(progress * Math.PI * 2));
      }
      
      if (step < 120) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setThreshold(0.5);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsAnimating(false);
  };

  const resetAnimation = () => {
    stopAnimation();
    setAnimationStep(0);
    setThreshold(0.5);
  };

  const generateNewData = () => {
    setData(generateBinaryData(100));
    setAnimationStep(0);
  };

  const toggleClassificationMode = () => {
    setClassificationMode(prev => prev === 'hard' ? 'soft' : 'hard');
  };

  // Calculate performance metrics
  const accuracy = data.reduce((correct, point) => {
    const linearOutput = weights[0] * point.x + weights[1] * point.y + bias;
    const probability = sigmoid(linearOutput);
    const predicted = probability >= threshold ? 1 : 0;
    return correct + (point.label === predicted ? 1 : 0);
  }, 0) / data.length;

  const precision = (() => {
    const truePositives = data.filter(point => {
      const linearOutput = weights[0] * point.x + weights[1] * point.y + bias;
      const probability = sigmoid(linearOutput);
      const predicted = probability >= threshold ? 1 : 0;
      return point.label === 1 && predicted === 1;
    }).length;
    
    const falsePositives = data.filter(point => {
      const linearOutput = weights[0] * point.x + weights[1] * point.y + bias;
      const probability = sigmoid(linearOutput);
      const predicted = probability >= threshold ? 1 : 0;
      return point.label === 0 && predicted === 1;
    }).length;
    
    return truePositives + falsePositives > 0 ? truePositives / (truePositives + falsePositives) : 0;
  })();

  return (
    <div className="space-y-6">
      <div className="text-white/80 text-lg leading-relaxed">
        <p className="mb-4">
          Decision boundaries separate different classes in feature space. In logistic regression,
          this boundary represents where the predicted probability equals your chosen threshold.
        </p>
        <p>
          Toggle between hard classification (sharp boundary) and soft classification (probability-based) 
          to see how the model makes decisions. The linear boundary is interpretable and efficient.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Visualization */}
        <div className="xl:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Decision Boundary Visualization</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleClassificationMode}
                className={`flex items-center space-x-2 px-3 py-1 text-sm rounded-lg transition-all duration-300 ${
                  classificationMode === 'hard' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-purple-500 text-white'
                }`}
              >
                {classificationMode === 'hard' ? <ToggleLeft size={14} /> : <ToggleRight size={14} />}
                <span>{classificationMode === 'hard' ? 'Hard' : 'Soft'}</span>
              </button>
              <button
                onClick={() => setShowProbabilities(!showProbabilities)}
                className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 ${
                  showProbabilities 
                    ? 'bg-green-500 text-white' 
                    : 'bg-slate-600 text-white/70 hover:bg-slate-500'
                }`}
              >
                Heatmap
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
          {/* Animation Controls */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Controls</h4>
            
            <div className="flex space-x-2 mb-4">
              <button
                onClick={startAnimation}
                disabled={isAnimating}
                className="flex items-center space-x-2 px-3 py-2 bg-green-500 rounded-lg text-white font-medium transition-all duration-300 hover:bg-green-600 disabled:opacity-50 flex-1 justify-center"
              >
                <Play size={14} />
                <span>Demo</span>
              </button>
              <button
                onClick={stopAnimation}
                disabled={!isAnimating}
                className="flex items-center space-x-2 px-3 py-2 bg-red-500 rounded-lg text-white font-medium transition-all duration-300 hover:bg-red-600 disabled:opacity-50"
              >
                <Pause size={14} />
              </button>
              <button
                onClick={resetAnimation}
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

            {/* Threshold Control */}
            <div className="mt-4">
              <label className="block text-white/80 font-medium mb-2 text-sm">
                Decision Threshold: {threshold.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                disabled={isAnimating}
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>

          {/* Model Parameters */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Model Parameters</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-white/80 font-medium mb-1 text-sm">
                  Weight 1: {weights[0].toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={weights[0]}
                  onChange={(e) => setWeights([parseFloat(e.target.value), weights[1]])}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isAnimating}
                />
              </div>
              
              <div>
                <label className="block text-white/80 font-medium mb-1 text-sm">
                  Weight 2: {weights[1].toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={weights[1]}
                  onChange={(e) => setWeights([weights[0], parseFloat(e.target.value)])}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isAnimating}
                />
              </div>
              
              <div>
                <label className="block text-white/80 font-medium mb-1 text-sm">
                  Bias: {bias.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isAnimating}
                />
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Performance</h4>
            <div className="space-y-2 text-white/80 text-sm">
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span className="font-mono text-green-400">{(accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Precision:</span>
                <span className="font-mono text-blue-400">{(precision * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Threshold:</span>
                <span className="font-mono text-orange-400">{threshold.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Mode:</span>
                <span className="font-mono text-purple-400">{classificationMode}</span>
              </div>
            </div>
          </div>

          {/* Probability Heatmap */}
          {showProbabilities && (
            <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-3">Probability Space</h4>
              <canvas
                ref={probabilityCanvasRef}
                className="w-full h-auto border border-white/20 rounded-lg bg-slate-900"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          )}

          {/* Key Insights */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Key Insights</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• Boundary line separates predicted classes</li>
              <li>• Threshold determines classification cutoff</li>
              <li>• Lower threshold: more positive predictions</li>
              <li>• Hard vs soft: discrete vs probabilistic output</li>
              <li>• Misclassifications occur near boundary</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionBoundarySection;