import React from 'react';

import './HomePage.scss';

const HomePage = () => {
  return (
    <div className='homepage'>
      <hgroup className='homepage__title-container'>
        <h1 className='homepage__title'>The Shaker</h1>
        <svg
          width='54'
          height='62'
          viewBox='0 0 54 62'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          class='homepage__title-logo'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M23.2407 55.3098L28.3516 55.2296C30.3676 55.198 32.0351 57.2711 32.0757 59.8597C32.0838 60.3776 31.7637 60.8023 31.3603 60.8086L9.45662 61.1521C9.05323 61.1585 8.71992 60.7441 8.7118 60.2261C8.6712 57.6375 10.2728 55.5132 12.2889 55.4816L17.3998 55.4014L17.1696 40.7278L1.45942 21.197C0.0144572 19.4006 0.968705 16.276 2.97198 16.2446L36.4335 15.7198C38.4368 15.6884 39.4885 18.7815 38.1006 20.6224L23.0106 40.6362L23.2407 55.3098ZM27.7501 12.1052C29.4573 5.53801 34.1968 0.751773 39.9109 0.662156C47.1692 0.548321 53.1716 8.01082 53.3178 17.3304C53.4639 26.6499 47.6985 34.297 40.4402 34.4108C37.9386 34.45 35.6093 33.5395 33.5944 32.0122L36.7476 27.8298C37.8555 28.4501 39.0706 28.8061 40.352 28.786C45.1827 28.7103 49.0343 23.6027 48.937 17.3991C48.8397 11.1954 44.8298 6.21117 39.9991 6.28693C36.7711 6.33756 34.0123 8.66059 32.5452 12.03L27.7501 12.1052ZM6.46636 20.3606L20.0269 36.5975L33.206 19.2598L6.46636 20.3606Z'
            fill='white'
          />
        </svg>
      </hgroup>
      <h2 class='homepage__subtitle'>It´s time to have fun</h2>
      <button class='homepage__button'>
        Random Cocktail <i class='fas fa-random'></i>
      </button>
    </div>
  );
};

export default HomePage;
