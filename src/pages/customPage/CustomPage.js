import { useHistory } from 'react-router';

const CustomPage = () => {
  let history = useHistory();

  return (
    <div>
      <button onClick={() => history.push('/create-custom')}>Add +</button>
    </div>
  );
};

export default CustomPage;
