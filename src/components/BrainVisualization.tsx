import React from 'react';
import styles from './BrainVisualization.module.css';

const BrainVisualization: React.FC = () => {
  return (
    <div className={styles.brainContainer}>
      <div className={styles.brainWrapper}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.brainSvg}
        >
          <defs>
            {/* Gradients for 3D effect */}
            <radialGradient id="brainGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#4da6ff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#0066ff" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#003d99" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#001a4d" stopOpacity="0.6" />
            </radialGradient>
            
            <radialGradient id="neuralGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#ff9933" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#cc6600" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#994d00" stopOpacity="0.4" />
            </radialGradient>

            <radialGradient id="connectionGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#138808" stopOpacity="0.3" />
            </radialGradient>

            {/* Filter for glow effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Pattern for neural network texture */}
            <pattern id="neuralPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="rgba(255, 153, 51, 0.3)"/>
              <circle cx="5" cy="5" r="0.5" fill="rgba(0, 123, 255, 0.2)"/>
              <circle cx="15" cy="15" r="0.5" fill="rgba(19, 136, 8, 0.2)"/>
            </pattern>
          </defs>

          {/* Background neural network pattern */}
          <rect width="100%" height="100%" fill="url(#neuralPattern)" opacity="0.3"/>

          {/* Brain structure - Left hemisphere */}
          <path
            d="M80 120 Q90 80, 130 90 Q170 85, 190 110 Q200 140, 185 170 Q170 200, 140 210 Q110 215, 90 195 Q75 170, 80 140 Z"
            fill="url(#brainGradient)"
            filter="url(#glow)"
            className={styles.brainLeft}
          />

          {/* Brain structure - Right hemisphere */}
          <path
            d="M210 110 Q230 85, 270 90 Q310 80, 320 120 Q325 140, 320 170 Q315 200, 290 210 Q260 215, 230 200 Q210 180, 205 150 Q210 130, 210 110 Z"
            fill="url(#brainGradient)"
            filter="url(#glow)"
            className={styles.brainRight}
          />

          {/* Cerebellum */}
          <ellipse
            cx="200"
            cy="240"
            rx="45"
            ry="25"
            fill="url(#neuralGradient)"
            filter="url(#glow)"
            className={styles.cerebellum}
          />

          {/* Brain stem */}
          <rect
            x="190"
            y="260"
            width="20"
            height="40"
            rx="10"
            fill="url(#connectionGradient)"
            filter="url(#glow)"
            className={styles.brainStem}
          />

          {/* Neural connections - Left side */}
          <g className={styles.neuralConnections}>
            <path d="M100 130 Q140 125, 160 140" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" opacity="0.7"/>
            <path d="M110 150 Q145 145, 170 160" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M95 170 Q135 165, 155 180" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M120 190 Q150 185, 175 195" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.5"/>
          </g>

          {/* Neural connections - Right side */}
          <g className={styles.neuralConnections}>
            <path d="M240 140 Q270 135, 300 150" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" opacity="0.7"/>
            <path d="M230 160 Q265 155, 290 170" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M245 180 Q275 175, 305 190" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M225 195 Q255 190, 280 200" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.5"/>
          </g>

          {/* Inter-hemisphere connections */}
          <g className={styles.interConnections}>
            <path d="M185 130 Q200 125, 215 130" stroke="url(#neuralGradient)" strokeWidth="2" fill="none" opacity="0.8"/>
            <path d="M180 150 Q200 145, 220 150" stroke="url(#neuralGradient)" strokeWidth="1.5" fill="none" opacity="0.7"/>
            <path d="M175 170 Q200 165, 225 170" stroke="url(#neuralGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M170 190 Q200 185, 230 190" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.5"/>
          </g>

          {/* Neural nodes - Left hemisphere */}
          <g className={styles.neuralNodes}>
            <circle cx="110" cy="140" r="3" fill="#4da6ff" opacity="0.9"/>
            <circle cx="130" cy="125" r="2.5" fill="#ff9933" opacity="0.8"/>
            <circle cx="145" cy="155" r="2" fill="#00ff88" opacity="0.7"/>
            <circle cx="125" cy="175" r="2.5" fill="#4da6ff" opacity="0.8"/>
            <circle cx="155" cy="185" r="2" fill="#ff9933" opacity="0.7"/>
          </g>

          {/* Neural nodes - Right hemisphere */}
          <g className={styles.neuralNodes}>
            <circle cx="290" cy="140" r="3" fill="#4da6ff" opacity="0.9"/>
            <circle cx="270" cy="125" r="2.5" fill="#ff9933" opacity="0.8"/>
            <circle cx="255" cy="155" r="2" fill="#00ff88" opacity="0.7"/>
            <circle cx="275" cy="175" r="2.5" fill="#4da6ff" opacity="0.8"/>
            <circle cx="245" cy="185" r="2" fill="#ff9933" opacity="0.7"/>
          </g>

          {/* Central processing nodes */}
          <g className={styles.centralNodes}>
            <circle cx="200" cy="140" r="4" fill="#ffffff" opacity="0.9"/>
            <circle cx="200" cy="165" r="3" fill="#4da6ff" opacity="0.8"/>
            <circle cx="200" cy="190" r="3" fill="#ff9933" opacity="0.8"/>
          </g>

          {/* Highlight effects */}
          <g className={styles.highlights}>
            <ellipse cx="140" cy="110" rx="15" ry="8" fill="rgba(255, 255, 255, 0.2)" opacity="0.6"/>
            <ellipse cx="260" cy="110" rx="15" ry="8" fill="rgba(255, 255, 255, 0.2)" opacity="0.6"/>
          </g>

          {/* Data flow indicators */}
          <g className={styles.dataFlow}>
            <circle cx="120" cy="160" r="1" fill="#00ff88" opacity="0.9">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="280" cy="160" r="1" fill="#00ff88" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="200" cy="155" r="1" fill="#ff9933" opacity="0.9">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
      </div>
      
      <div className={styles.brainLabels}>
        <div className={styles.brainLabel}>Neural Processing</div>
        <div className={styles.brainSubLabel}>AI Brain Architecture</div>
      </div>
    </div>
  );
};

export default BrainVisualization;
