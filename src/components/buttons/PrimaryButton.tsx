import React from 'react';

import Button, { type ButtonProps } from '@/components/buttons/Button';

type PrimaryButtonProps = ButtonProps;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ className = '', ...props }) => {
  return <Button className={`bg-primary text-white hover:opacity-80 ${className}`} {...props} />;
};

export default PrimaryButton;
