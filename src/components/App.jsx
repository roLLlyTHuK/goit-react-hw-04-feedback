import React, { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);
  };

  const handleFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
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


