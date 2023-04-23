import React from 'react';

import Button, { type ButtonProps } from '@/components/buttons/Button';

type SecondaryButtonProps = ButtonProps;

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ className = '', ...props }) => {
  return <Button className={`bg-gray-200 text-black hover:opacity-80 ${className}`} {...props} />;
};

export default SecondaryButton;
