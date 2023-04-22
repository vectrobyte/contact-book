import React from 'react';

import Button, { type ButtonProps } from '@/components/buttons/Button';

type PrimaryButtonProps = ButtonProps;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ className = '', ...props }) => {
  return <Button className={`bg-gray-800 text-white hover:bg-gray-700 ${className}`} {...props} />;
};

export default PrimaryButton;
