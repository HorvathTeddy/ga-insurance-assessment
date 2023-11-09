import React from 'react';
import './Question.css';

function Question({ sectionIndex, questionId, title, answer, comment, onQuestionChange, showCommentBox }) {
  return (
    <div className="question">
      <div className="answer-buttons">
        <div className='button-container'>
          <button type="button" 
                  onClick={() => onQuestionChange(sectionIndex, questionId, 'yes', comment)} 
                  className={answer === 'yes' ? 'selected yes' : ''}>
          </button><span id='green'>Yes</span>
        </div>
        <div className='button-container'>
          <button type="button" 
                  onClick={() => onQuestionChange(sectionIndex, questionId, 'no', comment)} 
                  className={answer === 'no' ? 'selected no' : ''}>
          </button><span id="red">No</span>
        </div>
      </div>
      <div className='content-container'>
        <div className='title'>
          <p>{title}</p>
        </div>
        {showCommentBox && 
          <textarea value={comment} 
                    onChange={(e) => onQuestionChange(sectionIndex, questionId, answer, e.target.value)} 
                    placeholder="Add comments here" 
                    name={`comment-${title}`}>
          </textarea>
        }
      </div>
    </div>
  );
}

export default Question;
