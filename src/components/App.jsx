import React, { useReducer } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

const initialState = { good: 0, neutral: 0, bad: 0 };

const reducer = (state, action) => {
  switch (action.type)
  {
    case 'good':
      return { ...state, good: state.good + 1 };
    case 'neutral':
      return { ...state, neutral: state.neutral + 1 };
    case 'bad':
      return { ...state, bad: state.bad + 1 };
    default:
      return new Error(`Undefined type: ${action.type}`);
  }
};

export const App = () => {
  const [feedback, dispatch] = useReducer(reducer, initialState);

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);
  };

  const handleFeedback = (type) => {
    dispatch({ type: type });
};

const totalFeedback = countTotalFeedback();
const positivePercentage = countPositiveFeedbackPercentage();

return (
        <div>
          <Section title="Please leave your feedback">
            <FeedbackOptions options={Object.keys(feedback)} onLeaveFeedback={handleFeedback} />
          </Section>

        {totalFeedback > 0 ? (
          <Section title="Statistics">
            <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} total={totalFeedback} positivePercentage={positivePercentage} />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
       </div>
      ); 
};