import React, { useState } from 'react';
import Question from './Question';
import Logo from './assets/galactic_advisors_cut.png';
import './App.css';

function App() {
  const [clientName, setClientName] = useState('');

  const [conductedDate, setConductedDate] = useState('');

  const [acceptedDate, setAcceptedDate] = useState('');

  const [reviewerName, setReviewerName] = useState('');

  const [sections, setSections] = useState([
    {
      sectionTitle: "Section Title",
      questions: [
        { id: 1, question: "Do you manage privileged accounts access management software (PAM)?", answer: null, comment: '', showCommentBox: true },
        { id: 2, question: "If a PAM solution is deployed, is it accessible in a \"check-in/out\" model?", answer: null, comment: '', showCommentBox: true },
        { id: 3, question: "Do you use MFA to protect all local and remote access privileged user accounts?", answer: null, comment: '', showCommentBox: false },
        { id: 4, question: "Do you manage privileged accounts access management software (PAM)?", answer: null, comment: '', showCommentBox: false },
        { id: 5, question: "If a PAM solution is deployed, is it accessible in a \"check-in/out\" model?", answer: null, comment: '', showCommentBox: false },
        { id: 6, question: "Do you use MFA to protect all local and remote access privileged user accounts?", answer: null, comment: '', showCommentBox: false }
      ],
    },
    {
      sectionTitle: "Section Title",
      questions: [
        { id: 7, question: "Do you manage privileged accounts access management software (PAM)?", answer: null, comment: '', showCommentBox: false },
        { id: 8, question: "If a PAM solution is deployed, is it accessible in a \"check-in/out\" model?", answer: null, comment: '', showCommentBox: false },
        { id: 9, question: "Do you use MFA to protect all local and remote access privileged user accounts?", answer: null, comment: '', showCommentBox: false },
        { id: 10, question: "Do you manage privileged accounts access management software (PAM)?", answer: null, comment: '', showCommentBox: false },
        { id: 11, question: "If a PAM solution is deployed, is it accessible in a \"check-in/out\" model?", answer: null, comment: '', showCommentBox: false },
        { id: 12, question: "Do you use MFA to protect all local and remote access privileged user accounts?", answer: null, comment: '', showCommentBox: false },
      ],
    },
    // ... potentially more sections
  ]);

  const handleQuestionChange = (sectionIndex, questionId, answer, comment) => {
    setSections(sections.map((section, index) => {
      if (index === sectionIndex) {
        return {
          ...section,
          questions: section.questions.map(q =>
            q.id === questionId ? { ...q, answer, comment } : q
          ),
        };
      }
      return section;
    }));
  };

  const calculateScore = () => {
    // Flatten the array of questions from all sections
    const allQuestions = sections.flatMap(section => section.questions);
  
    // Filter out questions that have been answered with 'yes'
    const answeredQuestions = allQuestions.filter(q => q.answer !== null);
    const totalYes = answeredQuestions.filter(q => q.answer === 'yes').length;
  
    // Calculate the score based on the number of 'yes' answers
    return (answeredQuestions.length > 0 ? (totalYes / answeredQuestions.length) * 100 : 0)
  };

  const score = calculateScore().toFixed(0);
  const scoreLabel = score >= 70 ? 'Adequate' : 'Low';
  const scoreColor = score >= 70 ? '#04C304' : 'red'; // Choose appropriate colors

  return (
    <div className="assessment-form">
      <header>
        <div>
          <div className='header-container'>
            <div className='left-container'>
              <h1 className='page-header'>INSURANCE ASSESSMENT</h1>
              <h1 className='sub-header'>
                <label>
                  <span className='name-label'>CLIENT NAME:</span>
                  <input className='client-name' type="text" value={clientName} onChange={e => setClientName(e.target.value)} name="clientName" />
              </label>
              </h1>
            </div>
            <div className='right-container'>
              <img className='logo' src={Logo} alt="Galactic Advisors Logo" />
            </div>
          </div>
          <div className='date-container'>
          <label>
            <span>Conducted on:</span>
            <input type="date" value={conductedDate} onChange={e => setConductedDate(e.target.value)} name="conductedDate" />
          </label>
          <label>
            <span>Date Accepted:</span>
            <input type="date" value={acceptedDate} onChange={e => setAcceptedDate(e.target.value)} name="acceptedDate" />
          </label>
          <label>
            <span>Reviewer Name:</span>
            <input type="text" value={reviewerName} onChange={e => setReviewerName(e.target.value)} name="reviewerName" />
          </label>
        </div>

        </div>
        
      </header>
      <section>
      <div className="score">
        <div className="percentage" style={{ backgroundColor: scoreColor }}>
          {score}%
        </div>
        <p id='overall-score'>Overall Cyber Insurability Score: {score}% - {scoreLabel}</p>
      </div>
      </section>
      <form>
      {sections.map((section, sectionIndex) => (
  <section key={section.sectionTitle}>
    <h2>{section.sectionTitle}</h2>
    {section.questions.map(question => (
      <Question
        key={question.id}
        sectionIndex={sectionIndex}
        questionId={question.id}
        title={question.question}
        answer={question.answer}
        comment={question.comment}
        onQuestionChange={handleQuestionChange}
        showCommentBox={question.showCommentBox}
      />
    ))}
  </section>
))}
<div className="score">
        <div className="percentage" style={{ backgroundColor: scoreColor }}>
          {score}%
        </div>
        <p id='overall-score'>Overall Cyber Insurability Score: {score}% - {scoreLabel}</p>
      </div>
        <div className='reset-btn-container'>
          <button className="reset-btn"type="submit">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default App;
