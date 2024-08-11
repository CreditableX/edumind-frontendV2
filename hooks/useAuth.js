import { HEROKU_PATH } from '@env';
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
})

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [error, setError] = useState('');
  const [subjects, setSubjects] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [token, setToken] = useState(null); // Authentication token

  // student signup 
  const studentSignup = async (username, password, name, email, photo_url) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post(`${HEROKU_PATH}/students/register`, {
        username,
        password,
        name,
        email,
        photo_url
      });

      if (response.status === 201) {
        // signup successful
        return true;
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("409 - Conflict: Username or email is taken");
      } else {
        setError(err.response?.data?.message || 'Signup failed');
      }
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // tutor signup
  const tutorSignup = async (username, password, name, subjects, email, photo_url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${HEROKU_PATH}/tutors/register`, {
        username,
        password,
        name,
        subjects,
        email,
        photo_url
      });
      if (response.status === 201) {
        // Registration successful
        return true;
      }
    } catch (err) {
      if (err.response?.status === 409) {
        console.log("409 - Conflict: Username or email is taken");
        setError('Username or email is taken');
        return (error);
      } else {
        setError(err.response?.data?.message || 'Signup failed');
      }
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // student login 
  const studentLogin = async (username, password) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post(`${HEROKU_PATH}/students/login`, {
        username,
        password
      });
      if (response.status === 200) {
        // console testing
        console.log("login successful");
        setUserType('student');
        setToken(response.data.token);
        setName(response.data.student.name);
        setUsername(response.data.student.username);
        setEmail(response.data.student.email);
        setUserId(response.data.student.student_id);
        setPhotoUrl(response.data.student.photo_url);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // tutor login 
  const tutorLogin = async (username, password) => {
    console.log(HEROKU_PATH);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${HEROKU_PATH}/tutors/login`, {
        username,
        password
      });
      if (response.status === 200) {
        setUserType('tutor');
        // console testing
        console.log("login successful");

        setToken(response.data.token);
        setSubjects(response.data.tutor.subjects);
        setName(response.data.tutor.name);
        setUsername(response.data.tutor.username);
        setEmail(response.data.tutor.email);
        setUserId(response.data.tutor.tutor_id);
        setRating(response.data.tutor.rating);
        setRatingCount(response.data.tutor.rating_count);
        setPhotoUrl(response.data.tutor.photo_url);
        return true;
      }
    } catch (err) {

      setError(err.response?.data?.message || err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // logout function
  const logout = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    setUsername(null);
    setEmail(null);
    setName(null);
    setUserId(null);
    setSubjects(null);
    setToken(null);
    setUserType(null);
  };


  return (
    <AuthContext.Provider
      value={{
        username,
        name,
        loading,
        error,
        token,
        email,
        userId,
        userType,
        subjects,
        rating,
        ratingCount,
        photoUrl,
        studentSignup,
        tutorSignup,
        studentLogin,
        tutorLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}