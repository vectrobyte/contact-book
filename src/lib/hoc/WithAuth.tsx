import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function WithAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function checkAuth() {
        const session = await getSession();
        setLoading(false);
        if (!session) {
          void router.push('/');
        }
      }

      void checkAuth();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>; // or a spinner component
    }

    return <Component {...props} />;
  };
}
