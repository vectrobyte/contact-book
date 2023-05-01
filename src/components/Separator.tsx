import React from 'react';

type SeparatorProps = React.HTMLAttributes<HTMLElement>;

const Separator: React.FC<SeparatorProps> = () => {
  return <div className="flex-auto" />;
};

export default Separator;
