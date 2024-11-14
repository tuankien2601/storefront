"use client";

import Sidebar from '../components/sidebar';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';


const withProtectedRoute = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ProtectedRoute: React.FC<P> = (props) => {
    const user = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/signin');
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return ProtectedRoute;
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}

export default withProtectedRoute(RootLayout);
