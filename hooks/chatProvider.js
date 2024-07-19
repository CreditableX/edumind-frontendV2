// context/chats/ChatsProvider.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useEffect, useS } from 'react';

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { username, token } = useAuth();
  const [chats, setChats] = useState(null);
  const [singleChatId, setSingleChatId] = useState(null);
  const [subjectList, setSubjectList] = useState(null);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // student version
  const getChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://edumind-3587039ec3f2.herokuapp.com/v1/chats');
      if (response.status === 200) {
        setChats(response.data);
      } else {
        throw new Error('Failed to fetch chats');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Get chats error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const tutorGetChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://edumind-3587039ec3f2.herokuapp.com/v1/chats/pending');
      if (response.status === 200) {
        setChats(response.data);
      } else {
        throw new Error('Failed to fetch chats');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Get chats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const newChat = async (subject_id, header, photo_url, content) => {
    setLoading(true);
    setError(null);
    try {
      // console.log(subject_id + " " + header + " " + photo_url)
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/students/new-question', {
        subject_id,
        header,
        photo_url,
        content
      });
      console.log(response)
      if (response.status === 201) {
        getChats(); // Refresh chats list
      } else {
        throw new Error('Chat creation failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('New chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async () => {
    if (!singleChatId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://edumind-3587039ec3f2.herokuapp.com/v1/chats/${singleChatId}`);
      if (response.status === 200) {
        // Handle messages data
        console.log("ok got messages");
        setMessages(response.data)
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Get messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSingleChatId = async (id) => {
    setMessages(null);
    setSingleChatId(id);
    console.log("updating single chat id: " + id);
  }

  const newMessage = async (content) => {
    if (!singleChatId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`https://edumind-3587039ec3f2.herokuapp.com/v1/chats/${singleChatId}`, {
        content
      });
      if (response.status === 201) {
        console.log("message put success");
      } else {
        throw new Error('Failed to put messages');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Create message error:', err);
    } finally {
      setLoading(false);
    }
  }

  const tutorAccept = async () => {
    if (!singleChatId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`https://edumind-3587039ec3f2.herokuapp.com/v1/chats/${singleChatId}/accept`, {
      });
      if (response.status === 200) {
        console.log("question accepted");
      } else {
        throw new Error('Failed to accept question');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Question accept error:', err);
    } finally {
      setLoading(false);
    }
  }

  const updateSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`https://edumind-3587039ec3f2.herokuapp.com/v1/subjects`, {
      });
      if (response.status === 200) {
        console.log("subjects fetched " + response.data);
        setSubjectList(response.data);
      } else {
        throw new Error('Failed to fetch subjects');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Subject fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChatsContext.Provider value={{ 
      chats, 
      singleChatId, 
      messages, 
      setSingleChatId, 
      getChats, 
      newChat, 
      getMessages, 
      updateSingleChatId, 
      newMessage, 
      tutorGetChats,
      tutorAccept,
      loading, 
      error }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default function useChats() {
  return useContext(ChatsContext);
}