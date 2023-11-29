'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const uniqueId = React.useId();
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const selectedColor = COLORS[timeElapsed % 3];

  const toggleTimerState = () => {
    setIsTimerRunning((state) => !state);
  };

  const resetTimer = () => {
    setTimeElapsed(0);
  };

  React.useEffect(() => {
    const increaseTimer = (value) => setTimeElapsed((time) => time + value);
    let timer = null;
    if (isTimerRunning) {
      timer = window.setInterval(() => {
        increaseTimer(1);
      }, 1000);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [isTimerRunning]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;
          const layoutId = `${uniqueId}-selected-color-outline`;
          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={layoutId}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={toggleTimerState}>
            {isTimerRunning ? <Pause /> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button onClick={resetTimer}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
