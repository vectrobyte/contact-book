import { type NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import { ROUTE_PATHS } from '@/routes';

const HomePage: React.FC<NextPage> = () => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const { status } = useSession();

  useEffect(() => {
    if (status !== 'loading' && status === 'authenticated') {
      void router.push(ROUTE_PATHS.contacts);
    }
  }, [router, status]);

  return (
    <>
      {status === 'loading' ? (
        <div className="flex-center flex-col gap-5 px-16 py-32 sm:gap-10 md:px-32 lg:p-64">
          <Image
            src="/logo.svg"
            alt=""
            height={isDesktop ? 150 : 100}
            width={isDesktop ? 150 : 100}
            className="mt-[130px] flex-shrink-0 animate-pulse opacity-10 grayscale"
          />
        </div>
      ) : (
        status !== 'authenticated' && (
          <div className="flex-center flex-col gap-5 px-16 py-32 sm:gap-10 md:px-32 lg:p-64">
            <h1 className="text-center text-lg font-light text-gray-600 sm:text-2xl">
              Sign in to access the contact book
            </h1>
          </div>
        )
      )}
    </>
  );
};

export default HomePage;
