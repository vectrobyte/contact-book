import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  rightArea?: React.ReactNode;
};

const TopNav: React.FC<TopNavProps> = ({ rightArea }) => {
  return (
    <div id="topNav" className="">
      <div className="flex items-center justify-between gap-10 bg-gray-100 px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="flex w-max items-center gap-4 transition-opacity hover:opacity-80"
        >
          <Image src="/icons/main.png" alt="" width={32} height={32} />
          <span className="text-2xl font-light text-gray-600">Contact Book</span>
        </Link>

        {rightArea}
      </div>
    </div>
  );
};

export default TopNav;
