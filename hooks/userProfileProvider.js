// context/userProfile/UserProfileProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { HEROKU_PATH } from '@env';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  
  const { username, name, token, email } = useAuth();

  const [usernameState, setUsernameState] = useState(username);
  const [nameState, setNameState] = useState(name);
  const [emailState, setEmailState] = useState(email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Update username error:', err);
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
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
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
          } else {
            throw new Error('Update failed');
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
        } else {
          throw new Error('Update failed');
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