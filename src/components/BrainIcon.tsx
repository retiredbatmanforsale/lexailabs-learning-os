import React from 'react';
import { BrainCircuit } from 'lucide-react';
import styles from './BrainIcon.module.css';

const BrainIcon: React.FC = () => {
  return (
    <div className={styles.brainIconContainer}>
      <div className={styles.brainIconWrapper}>
        <BrainCircuit 
          size={280}
          strokeWidth={1}
          className={styles.brainIcon}
        />
        
        {/* Accent elements for visual enhancement */}
        <div className={styles.accentRing}></div>
        <div className={styles.accentDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
      

    </div>
  );
};

export default BrainIcon;
