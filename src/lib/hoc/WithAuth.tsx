import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import { ROUTE_PATHS } from '@/routes';

export default function WithAuth(Component) {
  return function WithAuth(props) {
    const isDesktop = useIsDesktop();
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      return () => {
        if (status === 'unauthenticated') {
          void router.push(ROUTE_PATHS.home);
        }
      };
    }, [router, status]);

    if (status === 'loading') {
      return (
        <div className="flex-center flex-col gap-5 px-16 py-32 sm:gap-10 md:px-32 lg:p-64">
          <Image
            src="/logo.svg"
            alt=""
            height={isDesktop ? 150 : 100}
            width={isDesktop ? 150 : 100}
            className="mt-[130px] flex-shrink-0 animate-pulse opacity-10 grayscale"
          />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
