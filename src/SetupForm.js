import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { formQuestions, error, handleChange, handleSubmit } =
    useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          {/* {amount} */}
          <h2>setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              className="form-input"
              type="number"
              name="amount"
              id="amount"
              value={formQuestions.amount}
              onChange={handleChange}
              min={2}
              max={40}
            />
          </div>
          {/* {category} */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              id="category"
              name="category"
              className="form-input"
              onChange={handleChange}
              value={formQuestions.category}
            >
              <option value="celebrities">Celebrities</option>
              <option value="generalknowledge">General Knowledge</option>
              <option value="scienceandnature">Science & nature</option>
              <option value="computers">Computers</option>
              <option value="politics">Politics</option>
              <option value="vehicles">Vehicles</option>
              <option value="mathematics">Mathematics</option>
              <option value="geography">Geography</option>
              <option value="television">Television</option>
            </select>
          </div>
          {/* {difficulty} */}
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              className="form-input"
              onChange={handleChange}
              value={formQuestions.difficulty}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              Can't generate questions, please try a different option
            </p>
          )}
          <button onClick={handleSubmit} className="submit-btn" type="submit">
            Start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
