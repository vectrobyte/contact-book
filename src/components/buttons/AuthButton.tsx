import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useMemo } from 'react';

import Button from '@/components/buttons/Button';

const AuthButton: React.FC = () => {
  const { data: sessionData } = useSession();

  const isLoggedIn = useMemo(() => sessionData && sessionData.user, [sessionData]);

  return (
    <div className="flex-center gap-4 sm:gap-8">
      {isLoggedIn ? (
        <div className="flex-center gap-2">
          <img
            src={sessionData.user.image}
            alt=""
            width={24}
            height={24}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
          <span className="hidden text-lg sm:inline">{sessionData.user?.name}</span>

          <Button onClick={() => void signOut()}>Sign out</Button>
        </div>
      ) : (
        <Button onClick={() => void signIn()}>Sign in</Button>
      )}
    </div>
  );
};

export default AuthButton;
