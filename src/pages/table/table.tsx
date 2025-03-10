import HomeHeader from '../../components/home-screen/home-header/home-header';
import { TableMainBlock } from '../../components/table-main-block/table-main-block';
import './styles.css';

const Table = () => {
  return (
    <div className="tableContainer">
      <HomeHeader />
      <TableMainBlock />
    </div>
  );
};

export default Table;
