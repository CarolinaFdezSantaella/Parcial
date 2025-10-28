'use client';

import { useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useEffect } from 'react';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';

export function AuthStatus() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!user && !isUserLoading) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  if (isUserLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <UserIcon className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <p className="font-medium">
            {user.isAnonymous ? 'Guest User' : user.email}
          </p>
          <p className="text-xs text-sidebar-foreground/70">UID: {user.uid.slice(0,6)}...</p>
        </div>
      </div>
    );
  }

  return (
    <Button onClick={() => initiateAnonymousSignIn(auth)} variant="outline">
      Sign In Anonymously
    </Button>
  );
}
