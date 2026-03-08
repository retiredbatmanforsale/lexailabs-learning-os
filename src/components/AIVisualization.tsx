import React, { useEffect, useRef } from 'react';
import styles from './AIVisualization.module.css';

interface Node3D {
  x: number;
  y: number;
  z: number;
  projectedX: number;
  projectedY: number;
  activity: number;
  targetActivity: number;
  size: number;
  connections: Node3D[];
}

interface Connection3D {
  from: Node3D;
  to: Node3D;
  strength: number;
  pulse: number;
  active: boolean;
}

const AIVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with high DPI support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Create 3D brain-like structure
    const nodes: Node3D[] = [];
    const connections: Connection3D[] = [];

    // Generate nodes in a brain-like 3D structure
    const nodeCount = 120;
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - 2 * Math.random()); // Uniform distribution on sphere
      const theta = 2 * Math.PI * Math.random();
      
      // Create brain-like shape (elongated sphere with lobes)
      const baseRadius = 80 + Math.sin(phi * 2) * 20;
      const radius = baseRadius * (0.7 + 0.3 * Math.sin(theta * 2));
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.8; // Flatten slightly
      const z = radius * Math.cos(phi);

      nodes.push({
        x,
        y,
        z,
        projectedX: 0,
        projectedY: 0,
        activity: Math.random(),
        targetActivity: Math.random(),
        size: 2 + Math.random() * 4,
        connections: []
      });
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      const nearbyNodes = nodes.filter((otherNode, j) => {
        if (i === j) return false;
        const distance = Math.sqrt(
          Math.pow(node.x - otherNode.x, 2) +
          Math.pow(node.y - otherNode.y, 2) +
          Math.pow(node.z - otherNode.z, 2)
        );
        return distance < 60 && Math.random() < 0.3;
      });

      nearbyNodes.forEach(nearbyNode => {
        if (!node.connections.includes(nearbyNode)) {
          node.connections.push(nearbyNode);
          connections.push({
            from: node,
            to: nearbyNode,
            strength: Math.random(),
            pulse: 0,
            active: false
          });
        }
      });
    });

    // 3D projection function
    const project3D = (x: number, y: number, z: number, rotationX: number, rotationY: number) => {
      // Apply rotation
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      // Rotate around Y axis
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // Rotate around X axis
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Project to 2D with perspective
      const distance = 200;
      const scale = distance / (distance + z2);
      
      return {
        x: centerX + x1 * scale,
        y: centerY + y2 * scale,
        scale: scale
      };
    };

    // Animation variables
    let time = 0;
    let rotationX = 0;
    let rotationY = 0;
    let pulseTime = 0;

    const animate = () => {
      time += 0.01;
      rotationX += 0.005;
      rotationY += 0.008;
      pulseTime += 0.02;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Update node activities
      nodes.forEach((node, index) => {
        node.activity += (node.targetActivity - node.activity) * 0.03;
        
        // Occasionally change target
        if (Math.random() < 0.002) {
          node.targetActivity = Math.random();
        }

        // Project 3D to 2D
        const projected = project3D(node.x, node.y, node.z, rotationX, rotationY);
        node.projectedX = projected.x;
        node.projectedY = projected.y;
      });

      // Sort nodes by depth for proper rendering
      const sortedNodes = [...nodes].sort((a, b) => {
        const aZ = a.x * Math.sin(rotationY) + a.z * Math.cos(rotationY);
        const bZ = b.x * Math.sin(rotationY) + b.z * Math.cos(rotationY);
        return aZ - bZ;
      });

      // Draw connections
      connections.forEach(connection => {
        const { from, to } = connection;
        const opacity = Math.max(0.1, (from.activity + to.activity) / 2);
        
        // Update pulse
        if (from.activity > 0.7 && Math.random() < 0.05) {
          connection.pulse = 1.0;
          connection.active = true;
        }
        connection.pulse *= 0.95;
        
        if (connection.pulse < 0.1) {
          connection.active = false;
        }

        // Draw connection line
        const gradient = ctx.createLinearGradient(
          from.projectedX, from.projectedY,
          to.projectedX, to.projectedY
        );
        
        if (connection.active && connection.pulse > 0.1) {
          gradient.addColorStop(0, `rgba(0, 123, 255, ${connection.pulse * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255, 153, 51, ${connection.pulse})`);
          gradient.addColorStop(1, `rgba(19, 136, 8, ${connection.pulse * 0.6})`);
          ctx.lineWidth = 2 + connection.pulse * 2;
        } else {
          gradient.addColorStop(0, `rgba(255, 153, 51, ${opacity * 0.2})`);
          gradient.addColorStop(1, `rgba(19, 136, 8, ${opacity * 0.2})`);
          ctx.lineWidth = 0.5;
        }

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(from.projectedX, from.projectedY);
        ctx.lineTo(to.projectedX, to.projectedY);
        ctx.stroke();
      });

      // Draw nodes
      sortedNodes.forEach((node, index) => {
        const activity = node.activity;
        const glowSize = node.size * (1 + activity * 2);
        
        // Node glow
        const glowGradient = ctx.createRadialGradient(
          node.projectedX, node.projectedY, 0,
          node.projectedX, node.projectedY, glowSize * 2
        );
        glowGradient.addColorStop(0, `rgba(0, 123, 255, ${activity * 0.4})`);
        glowGradient.addColorStop(0.5, `rgba(255, 153, 51, ${activity * 0.2})`);
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.projectedX, node.projectedY, glowSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        const coreGradient = ctx.createRadialGradient(
          node.projectedX - node.size * 0.3, node.projectedY - node.size * 0.3, 0,
          node.projectedX, node.projectedY, node.size
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${activity * 0.9})`);
        coreGradient.addColorStop(0.3, `rgba(0, 123, 255, ${activity * 0.7})`);
        coreGradient.addColorStop(0.7, `rgba(255, 153, 51, ${activity * 0.5})`);
        coreGradient.addColorStop(1, `rgba(19, 136, 8, ${activity * 0.3})`);
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(node.projectedX, node.projectedY, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Highlight for highly active nodes
        if (activity > 0.8) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(activity - 0.8) * 5})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.projectedX, node.projectedY, node.size + 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Add floating particles
      for (let i = 0; i < 3; i++) {
        if (Math.random() < 0.1) {
          const x = centerX + (Math.random() - 0.5) * 200;
          const y = centerY + (Math.random() - 0.5) * 200;
          const size = Math.random() * 2 + 0.5;
          
          ctx.fillStyle = `rgba(0, 123, 255, ${Math.random() * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.aiVisualization}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />
      <div className={styles.overlay}>
        <div className={styles.aiLabel}>Deep Neural Network</div>
        <div className={styles.dataFlow}>Forward Propagation</div>
      </div>
    </div>
  );
};

export default AIVisualization;
