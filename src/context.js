import axios from "axios";
import { useState, useContext, createContext } from "react";

const table = {
  celebrities: 26,
  generalknowledge: 9,
  scienceandnature: 17,
  computers: 18,
  politics: 24,
  vehicles: 28,
  mathematics: 19,
  geography: 22,
  television: 14,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [formQuestions, setFormQuestions] = useState({
    amount: 10,
    category: "celebrities",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    try {
      setWaiting(false);
      setLoading(true);
      const response = await axios
        .get(url)
        .catch((error) => console.log(error));
      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          setQuiz(data);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModal(false);
  };
  const nextQuestion = () => {
    setIndex((oldValue) => {
      let index = oldValue + 1;
      if (index > quiz.length - 1) {
        openModal();
        return (index = 0);
      } else {
        return index;
      }
    });
  };
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => {
        return oldState + 1;
      });
    }
    nextQuestion();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormQuestions({ ...formQuestions, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = formQuestions;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        quiz,
        index,
        correct,
        error,
        isModal,
        nextQuestion,
        checkAnswer,
        closeModal,
        formQuestions,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
