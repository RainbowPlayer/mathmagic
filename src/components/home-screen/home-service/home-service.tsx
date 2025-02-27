import './styles.css';

const HomeService = () => {
  return (
    <div className="homeServiceContainer">
      <div className="leftColumn">
        <span>We partner with Public & Private</span>
        <span>Elementary Schools Across the U.S.</span>
      </div>

      <div className="rightColumn">
        <span className="ourService">Our Service</span>

        <span className="bigSubtitle">
          We bring fun and engaging educational gamified afterschool online
          tournaments to elementary schools.
        </span>

        <ul className="serviceList">
          <li>
            A 2-week structured math tournament designed for students in grades
            1-3
          </li>
          <li>
            Aligned with fundamental arithmetic concepts (addition, subtraction,
            multiplication, and more)
          </li>
          <li>Kids apply math skills to compete and win a prize at the end</li>
          <li>
            A proven method to reinforce math concepts in a fun and interactive
            way
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeService;
