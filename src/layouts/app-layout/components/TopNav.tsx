import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { MdLogin, MdLogout, MdMenu } from 'react-icons/md';

import { type PageParams } from '@/@types';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Search from '@/components/inputs/Search';
import Separator from '@/components/Separator';
import CircleSkeleton from '@/components/skeletons/CircleSkeleton';
import RectangleSkeleton from '@/components/skeletons/RectangleSkeleton';
import { useQuery } from '@/lib/hooks/useQuery';
import { ROUTE_PATHS } from '@/routes';

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  withSearch: boolean;
  onToggleSidenav(): void;
};

const TopNav: React.FC<TopNavProps> = ({ withSearch = true, onToggleSidenav }) => {
  const { query, setQuery } = useQuery<PageParams>();
  const { status, data: session } = useSession();

  return (
    <div id="topNav" className="relative z-10">
      <div className="gap-100 flex min-h-[80px] items-center justify-between gap-4 border-b bg-white px-3 py-4">
        <div className="flex items-center gap-4 lg:w-72">
          <IconButton onClick={onToggleSidenav}>
            <MdMenu size={24} />
          </IconButton>

          <Link
            href="/"
            className="flex w-max items-center gap-4 transition-opacity hover:opacity-80"
          >
            <Image src="/logo.svg" alt="" width={32} height={32} />
            <span className="hidden text-2xl font-light text-gray-600 lg:block">Contact Book</span>
          </Link>
        </div>

        <div className="flex flex-auto items-center justify-between gap-4 sm:gap-10">
          {withSearch ? (
            <Search
              keyword={query.keyword || ''}
              onSubmit={(keyword: string) => setQuery({ keyword: keyword || null })}
              className="w-full lg:max-w-[800px]"
            />
          ) : (
            <Separator />
          )}

          <div className="flex-center flex-shrink-0 gap-4 sm:gap-8">
            {status === 'loading' ? (
              <div className="flex-center gap-2 pr-2">
                <CircleSkeleton className="flex-shrink-0" />
                <RectangleSkeleton className="hidden !w-[120px] flex-shrink-0 text-lg lg:inline" />
                <RectangleSkeleton className="!w-[100px] flex-shrink-0" />
              </div>
            ) : status === 'authenticated' ? (
              <div className="flex-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={session?.user?.image}
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                />
                <span className="hidden lg:inline">{session?.user?.name}</span>

                <Button
                  icon={<MdLogout size={20} />}
                  onClick={() =>
                    void signOut({
                      callbackUrl: ROUTE_PATHS.home,
                    })
                  }
                >
                  <span className="hidden sm:inline">Sign out</span>
                </Button>
              </div>
            ) : (
              <Button
                icon={<MdLogin size={20} />}
                onClick={() =>
                  void signIn(null, {
                    callbackUrl: ROUTE_PATHS.contacts,
                  })
                }
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
