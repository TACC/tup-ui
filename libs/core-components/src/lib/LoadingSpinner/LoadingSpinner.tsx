import React from 'react';
import { Spinner } from 'reactstrap';
import './LoadingSpinner.css';

type LoadingSpinnerProps = {
  placement?: 'inline' | 'section';
  className?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  placement = 'section',
  className,
}) => {
  return (
    <div className={`loading-icon ${className}`} data-testid="loading-spinner">
      <Spinner className={placement}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
