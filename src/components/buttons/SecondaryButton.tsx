import React from 'react';

import Button, { type ButtonProps } from '@/components/buttons/Button';

type SecondaryButtonProps = ButtonProps;

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ className = '', ...props }) => {
  return <Button className={`bg-gray-200 text-black hover:bg-gray-100 ${className}`} {...props} />;
};

export default SecondaryButton;
