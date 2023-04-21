import './Spinner.module.scss';

import { type HTMLAttributes } from 'react';

const Spinner: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => {
  return (
    <div {...props} className={`spinner w-5 ${className}`}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={4}
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Spinner;
