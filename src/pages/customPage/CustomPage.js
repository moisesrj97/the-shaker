import './CustomPage.scss';
import { Link, useHistory } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';
import ThumbnailGalleryCustom from '../../components/thumbnailGalleryCustom/ThumbnailGalleryCustom';

const CustomPage = () => {
  let history = useHistory();

  const { store } = useContext(DataContext);

  return (
    <div className="add">
      <Link to="/create-custom">
        <button className="add-button">Add +</button>
      </Link>

      <ThumbnailGalleryCustom
        sampleData={{
          drinks: store.user.custom.filter((e, index) => index > 0),
        }}
      />
    </div>
  );
};

export default CustomPage;
