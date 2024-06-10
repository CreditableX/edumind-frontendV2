// context/userProfile/UserProfileProvider.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUsername = async (newUsername) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put('https://edumind-3587039ec3f2.herokuapp.com/v1/students/profile', {
        username: newUsername,
        name
      });
      if (response.status === 200) {
        setUsername(newUsername);
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
        name: newName
      });
      if (response.status === 200) {
        setName(newName);
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
    <UserProfileContext.Provider value={{ username, name, updateUsername, updateName, loading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default function useUserProfile() {
    return useContext(UserProfileContext);
  }