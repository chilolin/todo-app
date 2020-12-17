import React, { FC } from 'react';

import 'components/molecules/Spinner/Spinner.css';

const Spinner: FC = () => (
  <div className="spinner-overlay">
    <div className="spinner-container" />
  </div>
);

export default Spinner;
