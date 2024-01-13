import React from 'react';
import clsx from 'clsx';

import styles from './SegmentedProgressBar.module.scss';

export type SegmentedProgressBarProps = {
  min: number;
  max: number;
  step: number;
  value: number;
} & React.HTMLAttributes<HTMLDivElement>;

const SegmentedProgressBarBase: React.FC<SegmentedProgressBarProps> = (
  props,
) => {
  const { className, min, max, step, value, ...restProps } = props;
  const range = max - min;
  const isOdd = range % step !== 0;
  const smallSegmentIndex = isOdd
    ? min + step > range / 2
      ? min + step
      : min
    : undefined;

  const segments = [];
  for (let i = min; i < max; i += step) {
    segments.push(
      <div
        key={i}
        className={clsx(
          styles.segment,
          i < value && styles.segmentActive,
          isOdd && i === smallSegmentIndex && styles.segmentSmall,
        )}
      />,
    );
  }

  return (
    <div
      className={clsx(styles.rootSegmentedProgressBar, className)}
      {...restProps}
    >
      {value >= max ? (
        <div className={clsx(styles.segment, styles.segmentMax)} />
      ) : (
        segments
      )}
    </div>
  );
};

export const SegmentedProgressBar = React.memo(SegmentedProgressBarBase);
