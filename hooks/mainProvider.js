import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
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