import React from 'react';
import { ChatsProvider } from './chatProvider';
import { AuthProvider } from './useAuth';
import { UserProfileProvider } from './userProfileProvider';

export const MainProvider = ({ children }) => {
    return (
      <AuthProvider>
        <UserProfileProvider>
          <ChatsProvider>
            {children}
          </ChatsProvider>
        </UserProfileProvider>
      </AuthProvider>
    );
  };