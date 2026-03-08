import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Zap, Calculator } from 'lucide-react';
import { clearCanvas } from './utils/canvas';
import { sigmoid } from './utils/math';

const SigmoidSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transformCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [showTransformation, setShowTransformation] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = 600;
    canvas.height = 400;
    
    drawSigmoidVisualization(ctx, canvas.width, canvas.height);
    
  }, [animationStep, inputValue]);

  useEffect(() => {
    if (!transformCanvasRef.current) return;
    
    const canvas = transformCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = 300;
    canvas.height = 200;
    
    drawTransformationDemo(ctx, canvas.width, canvas.height);
    
  }, [inputValue, showTransformation]);

  const drawSigmoidVisualization = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    clearCanvas(ctx, width, height);
    
    const padding = 50;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    for (let i = 1; i < 6; i++) {
      const x = padding + (i * (width - 2 * padding) / 6);
      const y = padding + (i * (height - 2 * padding) / 6);
      
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
    ctx.moveTo(padding, centerY);
    ctx.lineTo(width - padding, centerY);
    ctx.moveTo(centerX, padding);
    ctx.lineTo(centerX, height - padding);
    ctx.stroke();
    
    // Draw sigmoid curve with animation
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    const maxStep = Math.min(animationStep, 100);
    let firstPoint = true;
    
    for (let i = 0; i <= maxStep; i++) {
      const progress = i / 100;
      const x = -6 + 12 * progress;
      const y = sigmoid(x);
      
      const canvasX = padding + (progress * (width - 2 * padding));
      const canvasY = height - padding - (y * (height - 2 * padding));
      
      if (firstPoint) {
        ctx.moveTo(canvasX, canvasY);
        firstPoint = false;
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();
    
    // Draw interactive point
    const inputX = padding + ((inputValue + 6) / 12 * (width - 2 * padding));
    const outputY = height - padding - (sigmoid(inputValue) * (height - 2 * padding));
    
    // Vertical line from point to x-axis
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(inputX, outputY);
    ctx.lineTo(inputX, centerY);
    ctx.stroke();
    
    // Horizontal line from point to y-axis
    ctx.beginPath();
    ctx.moveTo(inputX, outputY);
    ctx.lineTo(padding, outputY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw the interactive point
    ctx.fillStyle = '#60a5fa';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(inputX, outputY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Labels for the point
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`x = ${inputValue.toFixed(1)}`, inputX, centerY + 20);
    
    ctx.textAlign = 'right';
    ctx.fillText(`σ(x) = ${sigmoid(inputValue).toFixed(3)}`, padding - 5, outputY + 5);
    
    // Key thresholds
    const thresholds = [
      { x: -2, label: 'Low', color: '#ef4444' },
      { x: 0, label: 'Neutral', color: '#fbbf24' },
      { x: 2, label: 'High', color: '#22c55e' }
    ];
    
    thresholds.forEach((threshold, index) => {
      if (animationStep > (index + 1) * 30) {
        const canvasX = padding + ((threshold.x + 6) / 12 * (width - 2 * padding));
        const canvasY = height - padding - (sigmoid(threshold.x) * (height - 2 * padding));
        
        ctx.fillStyle = threshold.color;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px -apple-system, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(threshold.label, canvasX, canvasY - 15);
      }
    });
    
    // Probability bounds
    if (animationStep > 60) {
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      // y = 1 line
      const y1Line = height - padding - (1 * (height - 2 * padding));
      ctx.beginPath();
      ctx.moveTo(padding, y1Line);
      ctx.lineTo(width - padding, y1Line);
      ctx.stroke();
      
      // y = 0.5 line
      const y05Line = height - padding - (0.5 * (height - 2 * padding));
      ctx.beginPath();
      ctx.moveTo(padding, y05Line);
      ctx.lineTo(width - padding, y05Line);
      ctx.stroke();
      
      ctx.setLineDash([]);
      
      // Labels for bounds
      ctx.fillStyle = '#64748b';
      ctx.font = '12px -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('1.0', padding - 5, y1Line + 5);
      ctx.fillText('0.5', padding - 5, y05Line + 5);
      ctx.fillText('0.0', padding - 5, height - padding + 5);
    }
    
    // Main labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Sigmoid Function: σ(x) = 1 / (1 + e^(-x))', 20, 30);
    
    // Axis labels
    ctx.font = '14px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Linear Input (x)', centerX, height - 15);
    
    ctx.save();
    ctx.translate(25, centerY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Probability σ(x)', 0, 0);
    ctx.restore();
    
    // Input/Output display
    if (animationStep > 40) {
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(width - 180, 50, 160, 80);
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.strokeRect(width - 180, 50, 160, 80);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Current Transformation:', width - 170, 70);
      
      ctx.font = '12px monospace';
      ctx.fillStyle = '#60a5fa';
      ctx.fillText(`Input: ${inputValue.toFixed(2)}`, width - 170, 90);
      ctx.fillStyle = '#f97316';
      ctx.fillText(`Output: ${sigmoid(inputValue).toFixed(3)}`, width - 170, 105);
      ctx.fillStyle = '#22c55e';
      ctx.fillText(`Percentage: ${(sigmoid(inputValue) * 100).toFixed(1)}%`, width - 170, 120);
    }
  };

  const drawTransformationDemo = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!showTransformation) return;
    
    clearCanvas(ctx, width, height);
    
    const padding = 30;
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Linear → Sigmoid Transformation', width / 2, 25);
    
    // Input section
    const inputY = height / 2 - 20;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padding, inputY - 15, 80, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Linear', padding + 40, inputY - 5);
    ctx.fillText(inputValue.toFixed(2), padding + 40, inputY + 8);
    
    // Arrow
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding + 90, inputY);
    ctx.lineTo(padding + 130, inputY);
    ctx.lineTo(padding + 125, inputY - 5);
    ctx.moveTo(padding + 130, inputY);
    ctx.lineTo(padding + 125, inputY + 5);
    ctx.stroke();
    
    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('σ(x)', padding + 110, inputY - 10);
    
    // Output section
    ctx.fillStyle = '#f97316';
    ctx.fillRect(width - padding - 80, inputY - 15, 80, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Probability', width - padding - 40, inputY - 5);
    ctx.fillText(sigmoid(inputValue).toFixed(3), width - padding - 40, inputY + 8);
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationStep(0);
    setInputValue(-3);
    
    let step = 0;
    const animate = () => {
      step += 2;
      setAnimationStep(step);
      
      // Animate input value through the curve
      if (step > 40 && step < 100) {
        const progress = (step - 40) / 60;
        setInputValue(-3 + 6 * progress);
      }
      
      if (step > 80) {
        setShowTransformation(true);
      }
      
      if (step < 120) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
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
    setInputValue(0);
    setShowTransformation(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-white/80 text-lg leading-relaxed">
        <p className="mb-4">
          The sigmoid function is the magic that transforms unlimited linear outputs into meaningful 
          probabilities. It creates the characteristic S-shaped curve that maps any real number to a value between 0 and 1.
        </p>
        <p>
          Use the interactive controls to see how different inputs are transformed, and understand 
          why this function is perfect for binary classification problems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Sigmoid Visualization */}
        <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Sigmoid Function</h3>
            <button
              onClick={() => setShowTransformation(!showTransformation)}
              className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                showTransformation 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-slate-600 text-white/70 hover:bg-slate-500'
              }`}
            >
              <Zap size={14} />
              <span>Transform</span>
            </button>
          </div>
          
          <canvas
            ref={canvasRef}
            className="w-full h-auto border border-white/20 rounded-lg bg-slate-900"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Controls and Information */}
        <div className="space-y-4">
          {/* Animation Controls */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Animation</h4>
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

            {/* Input Control */}
            <div>
              <label className="block text-white/80 font-medium mb-2 text-sm">
                Input Value (x): {inputValue.toFixed(1)}
              </label>
              <input
                type="range"
                min="-6"
                max="6"
                step="0.1"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                disabled={isAnimating}
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>-6</span>
                <span>0</span>
                <span>6</span>
              </div>
            </div>
          </div>

          {/* Live Calculation */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Calculator size={16} className="mr-2" />
              Live Calculation
            </h4>
            <div className="space-y-3 text-sm">
              <div className="bg-slate-900/50 rounded-lg p-3 font-mono">
                <div className="text-white/80">σ({inputValue.toFixed(1)}) = 1 / (1 + e^(-{inputValue.toFixed(1)}))</div>
                <div className="text-orange-400 mt-1">= 1 / (1 + {Math.exp(-inputValue).toFixed(4)})</div>
                <div className="text-green-400 mt-1 font-bold">= {sigmoid(inputValue).toFixed(6)}</div>
              </div>
              
              <div className="text-white/80">
                <div>As probability: <span className="text-blue-400 font-medium">{(sigmoid(inputValue) * 100).toFixed(2)}%</span></div>
                <div>Classification: <span className={sigmoid(inputValue) >= 0.5 ? 'text-green-400' : 'text-red-400'}>{sigmoid(inputValue) >= 0.5 ? 'Class 1' : 'Class 0'}</span></div>
              </div>
            </div>
          </div>

          {/* Transformation Visualization */}
          {showTransformation && (
            <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-3">Transformation</h4>
              <canvas
                ref={transformCanvasRef}
                className="w-full h-auto border border-white/20 rounded-lg bg-slate-900"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          )}

          {/* Key Properties */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Key Properties</h4>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Range: Always [0, 1]</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>At x=0: σ(0) = 0.5</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Smooth & differentiable</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Symmetric around (0, 0.5)</span>
              </div>
            </div>
          </div>

          {/* Why Sigmoid? */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
            <h4 className="text-white font-medium mb-2">Why Use Sigmoid?</h4>
            <ul className="space-y-1 text-white/80 text-sm">
              <li>• Maps any real number to [0,1] probability</li>
              <li>• Smooth gradient for optimization</li>
              <li>• Interpretable as odds ratio</li>
              <li>• Natural for binary classification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigmoidSection;