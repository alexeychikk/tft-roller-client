import React from 'react';
import clsx from 'clsx';

import styles from './SegmentedProgressBar.module.scss';

export type SegmentedProgressBarProps = {
  fixedGap?: number;
  min: number;
  max: number;
  step: number;
  value: number;
} & React.HTMLAttributes<HTMLDivElement>;

const SegmentedProgressBarBase: React.FC<SegmentedProgressBarProps> = (
  props,
) => {
  const { className, fixedGap, min, max, step, value, ...restProps } = props;
  const range = max - min;
  const smallSegmentIndex =
    range > step
      ? (value - min) % step === 0
        ? range - (range % step)
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
          i === smallSegmentIndex && styles.segmentSmall,
        )}
      />,
    );
  }

  if (
    smallSegmentIndex === min &&
    (segments.length - 1) * step + (value % step) < range
  ) {
    segments.push(
      <div
        key={segments.length}
        className={clsx(styles.segment, styles.segmentSmall)}
      />,
    );
  }

  return (
    <div
      className={clsx(styles.rootSegmentedProgressBar, className)}
      style={fixedGap == null ? undefined : { gap: `${fixedGap}px` }}
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
