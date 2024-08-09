// context/chats/ChatsProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { HEROKU_PATH } from '@env';

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { token } = useAuth();
  const [chats, setChats] = useState(null);
  const [singleChatId, setSingleChatId] = useState(null);
  const [singleChatStudentId, setSingleChatStudentId] = useState(null);
  const [singleChatTutorId, setSingleChatTutorId] = useState(null);
  const [singleChatStudentName, setSingleChatStudentName] = useState('');
  const [singleChatTutorName, setSingleChatTutorName] = useState('');
  const [singleChatStudentPhoto, setSingleChatStudentPhoto] = useState('');
  const [singleChatTutorPhoto, setSingleChatTutorPhoto] = useState('');
  const [subjectList, setSubjectList] = useState(null);
  const [singleChatTopicList, setSingleChatTopicList] = useState(null);
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
      const response = await axios.get(`${HEROKU_PATH}/chats`);
      if (response.status === 200) {
        const filteredChats = response.data.filter(chat => !chat.completed);
        setChats(filteredChats);
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
      const response = await axios.get(`${HEROKU_PATH}/chats/pending`);
      if (response.status === 200) {
        const filteredChats = response.data.filter(chat => !chat.completed);
        setChats(filteredChats);
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
      const response = await axios.post(`${HEROKU_PATH}/students/new-question`, {
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
      const response = await axios.get(`${HEROKU_PATH}/chats/${singleChatId}`);
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
  const updateSingleChatId = async (id) => {
    setMessages(null);
    setSingleChatId(id);

    const chat = chats.find(chat => chat.chat_id === id);

    setSingleChatStudentId(chat.student_id);
    setSingleChatTutorId(chat.tutor_id);
    setPhotoUrl(chat.photo_url);
    updateTopicList(chat.subject_id);

    await getSingleChatDetails(chat.student_id, chat.tutor_id);

    console.log("updated single chat id: " + id);
  }

  const updateTopicList = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${HEROKU_PATH}/subjects/${id}/topics`);
      if (response.status === 200) {
        console.log("ok got topics");
        // console.log(response.data);
        setSingleChatTopicList(response.data)
      } else {
        throw new Error('Failed to fetch topics');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Get topics error:', err);
    } finally {
      setLoading(false);
    }
  }

  // send a new message into a chat
  const newMessage = async (content) => {
    // some error handling
    if (!singleChatId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${HEROKU_PATH}/chats/${singleChatId}`, {
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
  const tutorAccept = async (topics) => {
    // some error handling
    if (!singleChatId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${HEROKU_PATH}/chats/${singleChatId}/accept`, {
      });
      if (response.status === 200) {
        console.log("question accepted");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Question accept error:', err);
    }

    const topicArray = [topics];
    try {
      const response = await axios.put(`${HEROKU_PATH}/chats/${singleChatId}/update-topics`, {
        topics: topicArray
      });
      if (response.status === 200) {
        console.log("topic success");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Topic set error:', err);
    } finally {
      setLoading(false);
    }
  }

  // list of subjects, updated when the app launches
  const updateSubjects = async () => {
    console.log(HEROKU_PATH);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${HEROKU_PATH}/subjects`, {
      });
      if (response.status === 200) {
        console.log("subjects fetched " + response.data);
        setSubjectList(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Subject fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  // get both tutor and student names and images
  const getSingleChatDetails = async (student_id, tutor_id) => {
    setLoading(true);
    setError(null);
    console.log("student + tutor " + student_id + " " + tutor_id);
    try {
      const response = await axios.get(`${HEROKU_PATH}/students/profile/${singleChatStudentId}`);
      console.log("here");
      if (response.status === 200) {
        console.log("student fetched " + response.data.username);
        setSingleChatStudentName(response.data.username);
        setSingleChatStudentPhoto(response.data.photo_url);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Student fetch error:', err);
    } finally {
      setLoading(false);
    }

    try {
      const response = await axios.get(`${HEROKU_PATH}/tutors/profile/${singleChatTutorId}`);
      if (response.status === 200) {
        console.log("tutor fetched " + response.data);
        setSingleChatTutorName(response.data.username);
        setSingleChatTutorPhoto(response.data.photo_url);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Tutor fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  const endChat = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${HEROKU_PATH}/chats/${id}/complete`, {
      });
      if (response.status === 200) {
        console.log(response.data);
      } 
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('End chat error:', err);
    } finally {
      setLoading(false);
    }
  }

  const getChatsToRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${HEROKU_PATH}/chats`);
      if (response.status === 200) {
        const filteredChats = response.data.filter(chat => chat.completed && chat.rating == null);
        setChats(filteredChats);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Filtered chats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const giveRating = async (rating) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${HEROKU_PATH}/chats/${singleChatId}/rate`, {
        rating
      });
      if (response.status === 200) {
        console.log("rating success");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Chat rating error:', err);
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
      singleChatStudentName,
      singleChatTutorName,
      singleChatStudentPhoto,
      singleChatTutorPhoto,
      singleChatTopicList,
      setSingleChatId, 
      getChats, 
      newChat, 
      getMessages, 
      updateSingleChatId, 
      newMessage, 
      tutorGetChats,
      tutorAccept,
      updateSubjects,
      endChat,
      getChatsToRate,
      giveRating,
      loading, 
      error }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default function useChats() {
  return useContext(ChatsContext);
}