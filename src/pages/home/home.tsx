import HomeAbout from '../../components/home-screen/home-about/home-about';
import HomeFooter from '../../components/home-screen/home-footer/home-footer';
import HomeHeader from '../../components/home-screen/home-header/home-header';
import HomeMainBlock from '../../components/home-screen/home-main-block/home-main-block';
import HomeService from '../../components/home-screen/home-service/home-service';
import HomeWork from '../../components/home-screen/home-work/home-work';
import './styles.css';

const Home = () => {
  return (
    <div>
      <div className="homeContainer">
        <HomeHeader />
        <HomeMainBlock />
      </div>
      <HomeService />

      <HomeAbout />
      <HomeWork />
      <HomeFooter />
    </div>
  );
};

export default Home;
