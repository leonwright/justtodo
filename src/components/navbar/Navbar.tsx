"use client";
import React, {useEffect, useTransition} from 'react';
import Link from 'next/link';
import { Button, Divider, Flex } from "@aws-amplify/ui-react";
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Hub } from 'aws-amplify/utils';

const Navbar = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const [ authCheck, setAuthCheck ] = React.useState<boolean>(isSignedIn);
  const [isPending, startTransition] = useTransition()

  const router = useRouter();
  useEffect(() => {
    const hubListenerCancel = Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signedIn':
          setAuthCheck(true);
          startTransition(() =>router.push('/') );
          startTransition(() =>router.refresh() );
          break;
        case 'signedOut':
          setAuthCheck(false);
          startTransition(() =>router.push('/') );
          startTransition(() =>router.refresh() );
          break;
      }
    });

    return () => {
      hubListenerCancel();
    };
  }, [router]);

  const signOutSignIn = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push('/signin');
    }
  }

  const defaultRoutes = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Add Title',
      href: '/add',
      loggedIn: true,
    },
  ]

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined
  )
  return (
    <>
      <Flex
        direction="row"
        padding="1rem"
        justifyContent="space-between"
      >
        <Flex as="nav" alignItems="center" gap="3rem" margin="0 2rem">
          {routes.map((route, index) => (
            <Link key={index} href={route.href}>
              {route.label}
            </Link>
          ))}
        </Flex>
        <Button
          variation="primary"
          borderRadius="2rem"
          className="mr-4"
          onClick={signOutSignIn}>
          {authCheck ? 'Sign Out' : 'Sign In'}
        </Button>
      </Flex>
      <Divider />
    </>
  );
};

export default Navbar;