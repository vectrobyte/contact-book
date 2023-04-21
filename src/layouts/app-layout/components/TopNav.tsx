import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type TopNavProps = React.HTMLAttributes<HTMLElement>;

const TopNav: React.FC<TopNavProps> = () => {
  return (
    <div id="topNav" className="">
      <div className="bg-gray-100 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icons/main.png" alt="" width={32} height={32} />
          <span className="text-2xl font-light text-gray-600">Contact Book</span>
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
