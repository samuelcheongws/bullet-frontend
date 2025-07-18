import React from 'react';
import classNames from 'classnames';

export interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => (
  <div
    className={`animate-pulse bg-[#232323] rounded-lg ${className}`}
    style={style}
  />
);
