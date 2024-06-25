// context/userProfile/UserProfileProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  
  const { username, name, token, email } = useAuth();

  const [usernameState, setUsernameState] = useState(username);
  const [nameState, setNameState] = useState(name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUsernameState(username);
    setNameState(name);
  }, [username, name]);

    // Setting up Axios interceptor to include token in all requests
    useEffect(() => {

      console.log("Token in ChatsProvider:", token);
      const requestInterceptor = axios.interceptors.request.use(
        (config) => {
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      // Eject interceptor on cleanup
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
      };
    }, [token]); // Re-run the effect if the token changes

  const updateUsername = async (newUsername) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put('https://edumind-3587039ec3f2.herokuapp.com/v1/students/profile', {
        username: newUsername,
        name,
        email
      });
      if (response.status === 200) {
        setUsernameState(newUsername);
      } else {
        throw new Error('Username update failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Update username error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateName = async (newName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put('https://edumind-3587039ec3f2.herokuapp.com/v1/students/profile', {
        username,
        name: newName,
        email
      });
      if (response.status === 200) {
        setNameState(newName);
      } else {
        throw new Error('Name update failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Update name error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider value={{ usernameState, nameState, updateUsername, updateName, loading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default function useUserProfile() {
    return useContext(UserProfileContext);
  }