// context/userProfile/UserProfileProvider.js
import { HEROKU_PATH } from '@env';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useAuth from './useAuth';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {

  const { username, name, token, email } = useAuth();

  const [usernameState, setUsernameState] = useState(username);
  const [nameState, setNameState] = useState(name);
  const [emailState, setEmailState] = useState(email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // update on mount
  useEffect(() => {
    setUsernameState(username);
    setNameState(name);
    setEmailState(email);
  }, []);

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


  // student details updating
  const updateDetailsStudent = async (newUsername, newName, newEmail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${HEROKU_PATH}/students/profile`, {
        username: newUsername,
        name: newName,
        email: newEmail
      });
      if (response.status === 200) {
        console.log('updated profile');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("401 - Authentication required.");
        setError('Authentication required.');
        return (error);
      } else if (err.response?.status === 409) {
        console.log("409 - Conflict: Username or email is taken");
        setError('Username or email is taken');
      }
      setError(err.response?.data?.message || err.message);
      console.error('Update profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  // tutor details updating
  const updateDetailsTutor = async (newUsername, newName, newEmail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${HEROKU_PATH}/tutors/profile`, {
        username: newUsername,
        name: newName,
        email: newEmail
      });

      if (response.status === 200) {
        console.log('updated profile');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("401 - Authentication required.");
        setError('Authentication required.');
        return (error);
      } else if (err.response?.status === 409) {
        console.log("409 - Conflict: Username or email is taken");
        setError('Username or email is taken');
      }
      setError(err.response?.data?.message || err.message);
      console.error('Update profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  // student password updating
  const updatePasswordStudent = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${HEROKU_PATH}/students/update-password`, {
        old_password: oldPassword,
        new_password: newPassword
      });
      if (response.status === 200) {
        console.log('updated password');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Update password error:', err);
    } finally {
      setLoading(false);
    }
  };

  // tutor password updating
  const updatePasswordTutor = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${HEROKU_PATH}/tutors/update-password`, {
        old_password: oldPassword,
        new_password: newPassword
      });
      if (response.status === 200) {
        console.log('updated password');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Update password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider value={{
      usernameState,
      nameState,
      emailState,
      updateDetailsStudent,
      updateDetailsTutor,
      updatePasswordStudent,
      updatePasswordTutor
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default function useUserProfile() {
  return useContext(UserProfileContext);
}