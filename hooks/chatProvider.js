// context/chats/ChatsProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { token } = useAuth();
  const [chats, setChats] = useState(null);
  const [singleChatId, setSingleChatId] = useState(null);
  const [singleChatStudentId, setSingleChatStudentId] = useState(null);
  const [singleChatTutorId, setSingleChatTutorId] = useState(null);
  const [subjectList, setSubjectList] = useState(null);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
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

  // main version after chats accepted / default for student
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
      console.error('Student get chats error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // tutor pending chats
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
      console.error('Tutor get chats error:', err);
    } finally {
      setLoading(false);
    }
  };

  // create a new chat
  const newChat = async (subject_id, header, photo_url, content) => {
    setLoading(true);
    setError(null);
    try {
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

  // fetch messages for a single chat
  const getMessages = async () => {
    // some error handling
    if (!singleChatId) return;
    
    console.log("single chat is " + singleChatId);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://edumind-3587039ec3f2.herokuapp.com/v1/chats/${singleChatId}`);
      if (response.status === 200) {
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

  // calls every time a single chat is entered
  const updateSingleChatId = (id) => {
    setMessages(null);
    setSingleChatId(id);

    const chat = chats.find(chat => chat.chat_id === id);

    setSingleChatStudentId(chat.student_id);
    setSingleChatTutorId(chat.tutor_id);
    setPhotoUrl(chat.photo_url);

    console.log("updated single chat id: " + id);
  }

  // send a new message into a chat
  const newMessage = async (content) => {
    // some error handling
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

  // tutor accepting a chat
  const tutorAccept = async () => {
    // some error handling
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

  // list of subjects, updated when the app launches
  const updateSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://edumind-3587039ec3f2.herokuapp.com/v1/subjects`, {
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
      subjectList,
      singleChatStudentId,
      singleChatTutorId,
      photoUrl,
      setSingleChatId, 
      getChats, 
      newChat, 
      getMessages, 
      updateSingleChatId, 
      newMessage, 
      tutorGetChats,
      tutorAccept,
      updateSubjects,
      loading, 
      error }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default function useChats() {
  return useContext(ChatsContext);
}