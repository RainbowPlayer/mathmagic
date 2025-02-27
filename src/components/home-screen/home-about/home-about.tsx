import React from 'react';
import './styles.css';
import { zombie1, zombie2 } from '../../../assets/images';

const HomeAbout = () => {
  return (
    <div className="homeAboutContainer">
      <div className="homeAboutText">
        <h2 className="homeAboutTitle">Why Heroes of Math and Magic?</h2>

        <p className="homeAboutParagraph">
          <strong className="homeAboutStrong">
            Strengthens Key Math Skills
          </strong>{' '}
          – Our curriculum-based challenges reinforce classroom learning in a
          fun, pressure-free environment.
        </p>
        <p className="homeAboutParagraph">
          <strong className="homeAboutStrong">
            Encourages Critical Thinking
          </strong>{' '}
          – Students solve math problems strategically to progress, fostering
          logical reasoning and problem-solving abilities.
        </p>
        <p className="homeAboutParagraph">
          <strong className="homeAboutStrong">
            Increases Engagement &amp; Motivation
          </strong>{' '}
          – The combination of competition, storytelling, and rewards makes math
          exciting and memorable.
        </p>
        <p className="homeAboutParagraph">
          <strong className="homeAboutStrong">
            Supports Teachers &amp; Schools
          </strong>{' '}
          – We provide structured lesson plans, teacher training, and real-time
          progress tracking to make implementation effortless.
        </p>
      </div>

      <div className="homeAboutZombies">
        <img src={zombie1} alt="Zombie 1" className="homeAboutZombieImage" />
        <img src={zombie2} alt="Zombie 2" className="homeAboutZombieImage" />
      </div>
    </div>
  );
};

export default HomeAbout;
