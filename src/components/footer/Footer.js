import React from 'react';
import './Footer.scss';

export default function Footer() {
  const title =
    'Made with 💜 by Miguel, Moisés & Jorge - Powered by TheCocktailDB';
  return (
    <footer className='footer'>
      <h2 className='footer__title'>{title}</h2>
    </footer>
  );
}
