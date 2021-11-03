import './CustomPage.scss';
import { useHistory } from 'react-router-dom';
import ThumbnailGallery from '../../components/thumbnailGallery/ThumbnailGallery';
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';

const CustomPage = () => {
  let history = useHistory();

  const { store } = useContext(DataContext);

  return (
    <div>
      <button
        className="add-button"
        onClick={() => history.push('/create-custom')}
      >
        Add +
      </button>
      <ThumbnailGallery
        sampleData={{
          drinks: store.user.custom.filter((e, index) => index > 0),
        }}
      />
    </div>
  );
};

export default CustomPage;
