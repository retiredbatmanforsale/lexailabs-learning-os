// Mathematical utility functions

export const sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x));
};

export const generateLinearData = (
  numPoints: number, 
  slope: number, 
  intercept: number, 
  noise: number = 0.2
): Array<{x: number, y: number}> => {
  const data = [];
  
  for (let i = 0; i < numPoints; i++) {
    const x = (Math.random() - 0.5) * 4; // Random x between -2 and 2
    const y = slope * x + intercept + (Math.random() - 0.5) * noise * 2;
    data.push({ x, y });
  }
  
  return data;
};

export const generateBinaryData = (numPoints: number): Array<{x: number, y: number, label: number}> => {
  const data = [];
  
  for (let i = 0; i < numPoints; i++) {
    const x = (Math.random() - 0.5) * 6; // Random x between -3 and 3
    const y = (Math.random() - 0.5) * 6; // Random y between -3 and 3
    
    // Generate labels based on a linear boundary with some noise
    const linearCombination = 0.8 * x + 0.3 * y - 0.5;
    const probability = sigmoid(linearCombination);
    
    // Add some noise to make it more realistic
    const noisyProbability = Math.max(0.1, Math.min(0.9, probability + (Math.random() - 0.5) * 0.3));
    const label = Math.random() < noisyProbability ? 1 : 0;
    
    data.push({ x, y, label });
  }
  
  return data;
};

export const logisticRegression = (
  data: Array<{x: number, y: number, label: number}>,
  learningRate: number = 0.1,
  iterations: number = 100
) => {
  let weights = [Math.random() - 0.5, Math.random() - 0.5]; // w1, w2
  let bias = Math.random() - 0.5; // b
  
  const history = [];
  
  for (let iter = 0; iter < iterations; iter++) {
    let totalLoss = 0;
    let dw1 = 0, dw2 = 0, db = 0;
    
    // Forward pass and gradient computation
    for (const point of data) {
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
    weights[0] -= learningRate * dw1 / data.length;
    weights[1] -= learningRate * dw2 / data.length;
    bias -= learningRate * db / data.length;
    
    history.push({
      iteration: iter,
      weights: [...weights],
      bias,
      loss: totalLoss / data.length
    });
  }
  
  return { weights, bias, history };
};

export const calculateAccuracy = (
  data: Array<{x: number, y: number, label: number}>,
  weights: number[],
  bias: number,
  threshold: number = 0.5
): number => {
  let correct = 0;
  
  for (const point of data) {
    const z = weights[0] * point.x + weights[1] * point.y + bias;
    const probability = sigmoid(z);
    const prediction = probability >= threshold ? 1 : 0;
    
    if (prediction === point.label) {
      correct++;
    }
  }
  
  return correct / data.length;
};

export const splitData = (
  data: Array<{x: number, y: number, label: number}>,
  trainRatio: number = 0.8
) => {
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  const splitIndex = Math.floor(data.length * trainRatio);
  
  return {
    train: shuffled.slice(0, splitIndex),
    test: shuffled.slice(splitIndex)
  };
};