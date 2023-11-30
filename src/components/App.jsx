import React, { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  //  const countTotalFeedback = () => good + neutral + bad;
  
  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);
    //  return totalFeedback === 0 ? 0 : Math.round((good / totalFeedback) * 100);
  };

  const handleFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
    //  switch (type) {
    //   case 'good':
    //     setGood((prevGood) => prevGood + 1);
    //     break;
    //   case 'neutral':
    //     setNeutral((prevNeutral) => prevNeutral + 1);
    //     break;
    //   case 'bad':
    //     setBad((prevBad) => prevBad + 1);
    //     break;
    //   default:
    //     break;
    // }
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div>
      <Section title="Please leave your feedback">
        <FeedbackOptions options={Object.keys(feedback)} onLeaveFeedback={handleFeedback} />
         {/* <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleFeedback} /> */}
      </Section>

      {totalFeedback > 0 ? (
        <Section title="Statistics">
          <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} total={totalFeedback} positivePercentage={positivePercentage} />
          {/* <Statistics good={good} neutral={neutral} bad={bad} total={totalFeedback} positivePercentage={positivePercentage} /> */}
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};


