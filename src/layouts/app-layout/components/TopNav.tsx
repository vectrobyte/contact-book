import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AuthButton from '@/components/buttons/AuthButton';

type TopNavProps = React.HTMLAttributes<HTMLElement>;

const TopNav: React.FC<TopNavProps> = () => {
  return (
    <div id="topNav" className="">
      <div className="flex items-center justify-between gap-10 gap-10 bg-gray-100 px-6 py-4 shadow-lg sm:px-10">
        <Link
          href="/"
          className="flex w-max items-center gap-4 transition-opacity hover:opacity-80"
        >
          <Image src="/logo.svg" alt="" width={32} height={32} />
          <span className="hidden text-2xl font-light text-gray-600 sm:block">Contact Book</span>
        </Link>

        <AuthButton />
      </div>
    </div>
  );
};

export default TopNav;
