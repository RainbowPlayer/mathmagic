import './styles.css';

const HomeMainBlock = () => {
  return (
    <div className="homeMainBlock">
      <span className="title">
        Heroes of Math and Magic: <br />
        Where Learning Meets Adventure!
      </span>

      <span className="subtitle">
        We Bring Online Educational Math Tournaments <br />
        to Afterschool Programs at Elementary Schools
      </span>

      <span className="description">
        Turn math into an exciting competition with Heroes of Math and Magic!
        Our online tournaments transform arithmetic into an immersive learning
        experience where students apply math skills in real-time to solve
        problems, cast spells, and compete with their peers.
      </span>

      <span className="description">
        By integrating game-based learning with structured math challenges, we
        help young learners develop essential arithmetic skills, boost
        problem-solving abilities, and build confidence—all while having fun!
      </span>

      <div className="videoOuter">
        <div className="videoInner">
          <iframe
            src="https://www.youtube.com/embed/R_elOp-2ANM"
            title="Heroes of Math and Magic"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default HomeMainBlock;
