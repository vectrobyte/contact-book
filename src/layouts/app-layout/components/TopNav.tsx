import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

import Button from '@/components/buttons/Button';
import CircleSkeleton from '@/components/skeletons/CircleSkeleton';
import RectangleSkeleton from '@/components/skeletons/RectangleSkeleton';

type TopNavProps = React.HTMLAttributes<HTMLElement>;

const TopNav: React.FC<TopNavProps> = () => {
  const { status, data: session } = useSession();

  return (
    <div id="topNav" className="">
      <div className="flex min-h-[80px] items-center justify-between gap-10 gap-10 bg-gray-100 px-6 py-4 shadow-lg sm:px-10">
        <Link
          href="/"
          className="flex w-max items-center gap-4 transition-opacity hover:opacity-80"
        >
          <Image src="/logo.svg" alt="" width={32} height={32} />
          <span className="hidden text-2xl font-light text-gray-600 sm:block">Contact Book</span>
        </Link>

        <div className="flex-center gap-4 sm:gap-8">
          {status === 'loading' ? (
            <div className="flex-center gap-2">
              <CircleSkeleton className="flex-shrink-0" />
              <RectangleSkeleton className="hidden w-[120px] flex-shrink-0 text-lg sm:inline" />
              <RectangleSkeleton className="w-[90px] flex-shrink-0" />
            </div>
          ) : status === 'authenticated' ? (
            <div className="flex-center gap-2">
              <img
                src={session?.user?.image}
                alt=""
                width={36}
                height={36}
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="hidden text-lg sm:inline">{session?.user?.name}</span>

              <Button onClick={() => void signOut()}>Sign out</Button>
            </div>
          ) : (
            <Button onClick={() => void signIn()}>Sign in</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
