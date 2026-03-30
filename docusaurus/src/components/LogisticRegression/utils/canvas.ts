// Canvas utility functions for drawing visualizations

export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);
};

export const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const padding = 50;
  const centerX = width / 2;
  const centerY = height / 2;
  
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  
  // X-axis
  ctx.beginPath();
  ctx.moveTo(padding, centerY);
  ctx.lineTo(width - padding, centerY);
  ctx.stroke();
  
  // Y-axis
  ctx.beginPath();
  ctx.moveTo(centerX, padding);
  ctx.lineTo(centerX, height - padding);
  ctx.stroke();
  
  // Tick marks and labels
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px -apple-system, system-ui, sans-serif';
  ctx.textAlign = 'center';
  
  // X-axis ticks
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue;
    const x = centerX + (i * (width - 2 * padding) / 4);
    ctx.beginPath();
    ctx.moveTo(x, centerY - 5);
    ctx.lineTo(x, centerY + 5);
    ctx.stroke();
    ctx.fillText(i.toString(), x, centerY + 20);
  }
  
  // Y-axis ticks
  ctx.textAlign = 'right';
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue;
    const y = centerY - (i * (height - 2 * padding) / 4);
    ctx.beginPath();
    ctx.moveTo(centerX - 5, y);
    ctx.lineTo(centerX + 5, y);
    ctx.stroke();
    ctx.fillText(i.toString(), centerX - 10, y + 4);
  }
};

export const drawLine = (
  ctx: CanvasRenderingContext2D, 
  slope: number, 
  intercept: number, 
  width: number, 
  height: number,
  color: string = '#f97316',
  lineWidth: number = 3
) => {
  const padding = 50;
  const centerX = width / 2;
  const centerY = height / 2;
  
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  
  // Draw line from x = -2 to x = 2
  let firstPoint = true;
  for (let x = -2; x <= 2; x += 0.1) {
    const y = slope * x + intercept;
    const canvasX = centerX + (x * (width - 2 * padding) / 4);
    const canvasY = centerY - (y * (height - 2 * padding) / 4);
    
    if (canvasY >= padding && canvasY <= height - padding) {
      if (firstPoint) {
        ctx.moveTo(canvasX, canvasY);
        firstPoint = false;
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
  }
  ctx.stroke();
};

export const drawPoints = (
  ctx: CanvasRenderingContext2D,
  data: Array<{x: number, y: number, label?: number}>,
  width: number,
  height: number,
  color: string = '#60a5fa',
  radius: number = 4
) => {
  const padding = 50;
  const centerX = width / 2;
  const centerY = height / 2;
  
  data.forEach(point => {
    const canvasX = centerX + (point.x * (width - 2 * padding) / 4);
    const canvasY = centerY - (point.y * (height - 2 * padding) / 4);
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add white border for visibility
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
};

export const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const padding = 50;
  
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([2, 2]);
  
  // Vertical lines
  for (let i = 1; i < 4; i++) {
    const x = padding + (i * (width - 2 * padding) / 4);
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, height - padding);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let i = 1; i < 4; i++) {
    const y = padding + (i * (height - 2 * padding) / 4);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }
  
  ctx.setLineDash([]);
};