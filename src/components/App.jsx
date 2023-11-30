import React, { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback() {
    return this.state.good + this.state.neutral + this.state.bad;
  }

  countPositiveFeedbackPercentage() {
    const totalFeedback = this.countTotalFeedback();
    return totalFeedback === 0 ? 0 : Math.round((this.state.good / totalFeedback) * 100);
  }

  handleFeedback = (type) => {
    this.setState((prevState) => ({
      [type]: prevState[type] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <>
        <Section title="Please leave your feedback">
          <FeedbackOptions options={Object.keys(this.state)} onLeaveFeedback={this.handleFeedback} />
        </Section>

        {totalFeedback > 0 ? (
          <Section title="Statistics">
            <Statistics good={good} neutral={neutral} bad={bad} total={totalFeedback} positivePercentage={positivePercentage} />
          </Section>
        ) : (
           <Notification message="There is no feedback" />
                  
        )}
      </>
    );
  }
}


