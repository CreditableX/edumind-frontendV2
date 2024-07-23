import React from 'react'
import { AuthProvider } from './useAuth';
import { ChatsProvider } from './chatProvider';
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