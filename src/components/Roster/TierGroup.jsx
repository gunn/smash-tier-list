import React from 'react';
import PropTypes from 'prop-types';
import Character from './Character';

import { Wrapper, Header, Main } from './TierGroup.styles';

const TierGroup = ({ gameSlug, tier, characters }) => (
  <Wrapper>
    <Header>
      Tier {tier}
    </Header>
    <Main>
      {characters.map(c => <Character key={c.id} gameSlug={gameSlug} {...c} />)}
    </Main>
  </Wrapper>
);

TierGroup.propTypes = {
  gameSlug: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TierGroup;
