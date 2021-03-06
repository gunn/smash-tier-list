import React from 'react';
import PropTypes from 'prop-types';

import smashSrc from 'assets/svg/smash.svg';

import { Wrapper, InnerWrapper, Logo } from './SuperTitle.styles';

const SuperTitle = ({ children }) => (
  <Wrapper>
    <InnerWrapper>
      <Logo src={smashSrc} alt="Smash Logo" />
      <h1 className="title">{children}</h1>
    </InnerWrapper>
  </Wrapper>
);

SuperTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SuperTitle;
