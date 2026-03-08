import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Move } from 'lucide-react';
import { drawAxes, drawLine, drawPoints, clearCanvas } from './utils/canvas';
import { generateLinearData } from './utils/math';

const LinearModelSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isAnimating, setIsAnimating] = useState(false);
  const [slope, setSlope] = useState(0);
  const [intercept, setIntercept] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<'slope' | 'intercept'>('slope');
  const [animationStep, setAnimationStep] = useState(0);
  const [showPredictions, setShowPredictions] = useState(false);

  const data = generateLinearData(50, 0.8, 0.2, 0.3);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = 600;
    canvas.height = 400;
    
    drawVisualization(ctx, canvas.width, canvas.height);
    
  }, [slope, intercept, data, showPredictions, animationStep]);

  const drawVisualization = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    clearCanvas(ctx, width, height);
    drawAxes(ctx, width, height);
    
    // Draw data points
    drawPoints(ctx, data, width, height, '#60a5fa', 5);
    
    // Draw predictions if enabled
    if (showPredictions) {
      data.forEach(point => {
        const prediction = slope * point.x + intercept;
        const centerX = width / 2;
        const centerY = height / 2;
        const padding = 50;
        
        const pointX = centerX + (point.x * (width - 2 * padding) / 4);
        const pointY = centerY - (point.y * (height - 2 * padding) / 4);
        const predY = centerY - (prediction * (height - 2 * padding) / 4);
        
        // Draw prediction line
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(pointX, pointY);
        ctx.lineTo(pointX, predY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw prediction point
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(pointX, predY, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    
    // Draw regression line with enhanced styling
    if (slope !== 0 || intercept !== 0) {
      drawLine(ctx, slope, intercept, width, height, '#f97316', 4);
      
      // Add line equation
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 16px -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`, width - 250, 30);
    }
    
    // Labels and explanation
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px -apple-system, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Linear Model Foundation', 20, 30);
    
    ctx.font = '12px -apple-system, system-ui, sans-serif';
    ctx.fillText('Drag to adjust line parameters', 20, 50);
    
    if (showPredictions) {
      ctx.fillText('Red lines show residuals (errors)', 20, 65);
    }
    
    // Show current mode
    ctx.fillStyle = dragMode === 'slope' ? '#22c55e' : '#64748b';
    ctx.fillText(`Mode: ${dragMode === 'slope' ? 'Adjusting Slope' : 'Adjusting Intercept'}`, 20, height - 60);
    
    // Key insights
    if (animationStep > 50) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '14px -apple-system, system-ui, sans-serif';
      ctx.fillText('Output Range: Unbounded (-∞ to +∞)', 20, height - 40);
      ctx.fillText('Next: Transform to probabilities [0,1]', 20, height - 25);
    }
  };

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
  }, []);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const padding = 50;
    
    // Convert to plot coordinates
    const plotX = (x - centerX) / ((canvas.width - 2 * padding) / 4);
    const plotY = -(y - centerY) / ((canvas.height - 2 * padding) / 4);
    
    if (dragMode === 'slope') {
      // Calculate slope based on mouse position
      if (plotX !== 0) {
        const newSlope = (plotY - intercept) / plotX;
        setSlope(Math.max(-3, Math.min(3, newSlope)));
      }
    } else {
      // Adjust intercept
      setIntercept(Math.max(-2, Math.min(2, plotY - slope * plotX)));
    }
  }, [isDragging, dragMode, intercept, slope]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlope(0);
    setIntercept(0);
    setAnimationStep(0);
    
    let step = 0;
    const maxSteps = 120;
    
    const animate = () => {
      step++;
      const progress = step / maxSteps;
      
      // Animate slope from 0 to target value
      const targetSlope = 0.8;
      if (progress <= 0.4) {
        const slopeProgress = progress / 0.4;
        setSlope(targetSlope * slopeProgress);
      }
      
      // Animate intercept after slope animation
      if (progress > 0.4 && progress <= 0.8) {
        const interceptProgress = (progress - 0.4) / 0.4;
        const targetIntercept = 0.2;
        setIntercept(targetIntercept * interceptProgress);
      }
      
      // Show predictions in final phase
      if (progress > 0.8) {
        setShowPredictions(true);
      }
      
      setAnimationStep(step);
      
      if (step < maxSteps) {
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
    setSlope(0);
    setIntercept(0);
    setAnimationStep(0);
    setShowPredictions(false);
  };

  const calculateMSE = () => {
    if (data.length === 0) return 0;
    
    const mse = data.reduce((sum, point) => {
      const prediction = slope * point.x + intercept;
      const error = point.y - prediction;
      return sum + error * error;
    }, 0) / data.length;
    
    return mse;
  };

  return (
    <div className="space-y-6">
      <div className="text-white/80 text-lg leading-relaxed">
        <p className="mb-4">
          Logistic regression builds upon linear models. Before we transform outputs to probabilities, 
          let's understand how linear models work with continuous data and see their unlimited output range.
        </p>
        <p>
          The equation <span className="font-mono bg-white/10 px-2 py-1 rounded">y = mx + b</span> forms 
          the foundation. Try dragging on the plot to adjust the line and see how it fits the data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Canvas */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Interactive Linear Model</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPredictions(!showPredictions)}
                className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 ${
                  showPredictions 
                    ? 'bg-red-500 text-white' 
                    : 'bg-slate-600 text-white/70 hover:bg-slate-500'
                }`}
              >
                Residuals
              </button>
            </div>
          </div>
          
          <canvas
            ref={canvasRef}
            className="w-full h-auto border border-white/20 rounded-lg bg-slate-900 cursor-crosshair"
            style={{ maxWidth: '100%', height: 'auto' }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          />
          
          <div className="mt-4 text-sm text-white/60">
            Click and drag on the plot to adjust the line. Switch between slope and intercept adjustment modes.
          </div>
        </div>

        {/* Controls and Information */}
        <div className="space-y-6">
          {/* Animation Controls */}
          <div className="bg-slate-800/30 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Controls</h3>
            
            <div className="flex space-x-2 mb-4">
              <button
                onClick={startAnimation}
                disabled={isAnimating}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg text-white font-medium transition-all duration-300 hover:bg-green-600 disabled:opacity-50"
              >
                <Play size={16} />
                <span>Demo</span>
              </button>
              <button
                onClick={stopAnimation}
                disabled={!isAnimating}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 rounded-lg text-white font-medium transition-all duration-300 hover:bg-red-600 disabled:opacity-50"
              >
                <Pause size={16} />
                <span>Pause</span>
              </button>
              <button
                onClick={resetAnimation}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-600 rounded-lg text-white font-medium transition-all duration-300 hover:bg-slate-700"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            </div>

            {/* Drag Mode Selection */}
            <div className="mb-4">
              <h4 className="text-white/80 font-medium mb-2">Adjustment Mode</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDragMode('slope')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    dragMode === 'slope'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-white/80 hover:bg-slate-600'
                  }`}
                  disabled={isAnimating}
                >
                  <Move size={16} className="mx-auto mb-1" />
                  Slope (m)
                </button>
                <button
                  onClick={() => setDragMode('intercept')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    dragMode === 'intercept'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-white/80 hover:bg-slate-600'
                  }`}
                  disabled={isAnimating}
                >
                  <Move size={16} className="mx-auto mb-1" />
                  Intercept (b)
                </button>
              </div>
            </div>

            {/* Manual Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 font-medium mb-2">
                  Slope (m): {slope.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={slope}
                  onChange={(e) => setSlope(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isAnimating}
                />
              </div>
              
              <div>
                <label className="block text-white/80 font-medium mb-2">
                  Intercept (b): {intercept.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={intercept}
                  onChange={(e) => setIntercept(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isAnimating}
                />
              </div>
            </div>
          </div>

          {/* Model Performance */}
          <div className="bg-slate-800/30 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Model Performance</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between">
                <span>Mean Squared Error:</span>
                <span className="font-mono text-orange-400">{calculateMSE().toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span>Data Points:</span>
                <span className="font-mono">{data.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Output Range:</span>
                <span className="font-mono text-yellow-400">(-∞, +∞)</span>
              </div>
            </div>
            
            {animationStep > 80 && (
              <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg">
                <p className="text-amber-200 text-sm font-medium">
                  🔄 Next Step: Transform this unbounded output into probabilities using the sigmoid function!
                </p>
              </div>
            )}
          </div>

          {/* Key Concepts */}
          <div className="bg-slate-800/30 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Understanding Linear Models</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Linear models predict continuous values anywhere from -∞ to +∞</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Slope (m) determines how much y changes per unit of x</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Intercept (b) shifts the entire line up or down</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>For classification, we need bounded outputs (probabilities)</span>
              </li>
            </ul>
          </div>

          {/* Interactive Tips */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Move size={16} className="mr-2" />
              Interactive Tips
            </h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Click and drag on the plot to adjust the line</li>
              <li>• Switch between slope and intercept modes</li>
              <li>• Enable residuals to see prediction errors</li>
              <li>• Try the demo animation to see optimal fitting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearModelSection;