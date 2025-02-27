import React from 'react';
import './styles.css';

const HomeWork = () => {
  return (
    <div className="home-work-container">
      <span className="home-work-title">How We Work</span>

      <div className="home-work-row">
        <div className="home-work-line-container">
          <div className="home-work-gray-line" />

          <div className="home-work-steps">
            <div className="home-work-step">
              <div className="home-work-step-circle" />
              <span className="home-work-step-label" style={{ width: '65px' }}>
                Step 1
              </span>
            </div>

            <div className="home-work-step">
              <div className="home-work-step-circle" />
              <span className="home-work-step-label">Step 2</span>
            </div>

            <div className="home-work-step">
              <div className="home-work-step-circle" />
              <span className="home-work-step-label">Step 3</span>
            </div>

            <div className="home-work-step">
              <div className="home-work-step-circle" />
              <span className="home-work-step-label">Step 4</span>
            </div>
          </div>
        </div>

        <div className="home-work-cards">
          <div className="home-work-card">
            <span className="home-work-card-title">
              Plan Your 2-Week Tournament
            </span>
            <div className="home-work-card-body">
              <p className="home-work-card-text">
                We bring a structured, easy-to-implement program consisting of
                10 engaging math-based classes.
              </p>
            </div>
          </div>

          <div className="home-work-card">
            <span className="home-work-card-title">
              Seamless Teacher Onboarding
            </span>
            <div className="home-work-card-body">
              <p className="home-work-card-text">
                Once you book the tournament, our Program Coordinator will
                conduct a 60-minute Zoom training for your afterschool teacher.
              </p>
            </div>
          </div>

          <div className="home-work-card">
            <span className="home-work-card-title">Get Started!</span>
            <div className="home-work-card-body">
              <p className="home-work-card-text">
                Students gain access to the game and can play on school
                computers or personal devices. We track progress and provide
                real-time insights on students’ math skill development.
              </p>
            </div>
          </div>

          <div className="home-work-card">
            <span className="home-work-card-title">Celebrate & Learn</span>
            <div className="home-work-card-body">
              <p className="home-work-card-text">
                At the end of the tournament, students win a prize. Schools
                receive a detailed learning report showing students’ progress
                and performance in key math areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <span className="home-work-final-text">
        Teachers receive a detailed manual and 24/7 operations &amp; tech
        support throughout the tournament.
      </span>
    </div>
  );
};

export default HomeWork;
