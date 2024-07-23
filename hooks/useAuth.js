import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

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
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [token, setToken] = useState(null); // Authentication token

  // student signup 
  const studentSignup = async (username, password, name, email, photo_url) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/students/register', {
        username,
        password,
        name,
        email,
        photo_url
      });

      if (response.status === 201) {
        // Assuming the API returns the user data upon successful signup
        // do nothing for now
        return true;
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // tutor signup
  const tutorSignup = async (username, password, name, subjects, email, photo_url) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/tutors/register', {
        username,
        password,
        name,
        subjects,
        email,
        photo_url
      });

      if (response.status === 201) {
        // Assuming the API returns the user data upon successful signup
        // do nothing for now
        return true;
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/students/login', {
        username,
        password
      });
      if (response.status === 200) {
        console.log("login successful");
        // Assuming the API returns user data upon successful login
        // console.log(response.data.token);
        setUserType('student');
        setToken(response.data.token);
        setName(response.data.student.name);
        setUsername(response.data.student.username);
        
        setEmail(response.data.student.email);
        setUserId(response.data.student.student_id);
        setPhotoUrl(response.data.student.photo_url);

        console.log("login name is " + name);
        console.log("login username is " + username);
        console.log("login email is " + email);
        console.log("token is " + token);
        console.log("usertpye is " + userType);
      } else {
        throw new Error('Login failed');
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
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/tutors/login', {
        username,
        password
      });
      console.log(response.data.student)
      if (response.status === 200) {
        setUserType('tutor');
        console.log("login successful");

        // Assuming the API returns user data upon successful login
        // console.log(response.data.token);  
        setToken(response.data.token);
        setSubjects(response.data.tutor.subjects);
        setName(response.data.tutor.name);
        setUsername(response.data.tutor.username);
        setEmail(response.data.tutor.email);
        setUserId(response.data.tutor.tutor_id);
        setRating(response.data.tutor.rating);
        setRatingCount(response.data.tutor.rating_count);
        setPhotoUrl(response.data.tutor.photo_url);
        

        console.log("usertpye is " + userType);
        console.log("login name is " + name);
        console.log("login username is " + username);
        console.log("login email is " + email);
        console.log("token is " + token);
      } else {
        throw new Error('Login failed');
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