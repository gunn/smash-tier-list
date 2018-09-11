import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faLinkedin,
  faTwitterSquare,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';

import { Wrapper } from './SmashTierList.styles';

import gamesData from '../games-data';
import { addGame, filterByName } from '../redux/game/actions';
import { prevGame, nextGame } from '../redux/app/actions';
import { currentGameSelector } from '../redux/app/selectors';

import Header from '../components/layout/Header';
import {
  theme as headerTheme,
  InnerHeaderSecondLine,
  OuterHeaderSecondLine,
} from '../components/layout/Header.styles';
import Main from '../components/layout/Main';
import Footer from '../components/layout/Footer';
import { FooterLine, SocialIcons, FooterSeparator } from '../components/layout/Footer.styles';

import SuperTitle from '../components/SuperTitle';
import GameSelect from '../components/GameSelect';
import Filter from '../components/Filter';
import HeaderIcon from '../components/HeaderIcon';

import Game from './Game';

class SmashTierList extends React.Component {
  constructor(props) {
    super();
    const { dispatch } = props;

    // add all the games to the redux store
    gamesData.forEach(game => dispatch(addGame(game)));
  }

  state = {
    headerStuck: false,
    secondLineStuck: false,
  };

  componentDidMount = () => {
    window.onscroll = () => {
      const { headerStuck, secondLineStuck } = this.state;
      const currentHeaderStuck = window.scrollY > 0;
      const currentSecondLineStuck = window.scrollY > 30 + 10 + headerTheme.height;

      // don't do unnecessary renders
      if (headerStuck === currentHeaderStuck && secondLineStuck === currentSecondLineStuck) {
        return;
      }

      this.setState({
        headerStuck: currentHeaderStuck,
        secondLineStuck: currentSecondLineStuck,
      });
    };
  }

  onFilterChange = (e) => {
    const { dispatch } = this.props;
    dispatch(filterByName(e.target.value));
  }

  onClickPrev = () => {
    const { dispatch, currentFilter } = this.props;
    dispatch(prevGame());
    dispatch(filterByName(currentFilter));
  }

  onClickNext = () => {
    const { dispatch, currentFilter } = this.props;
    dispatch(nextGame());
    dispatch(filterByName(currentFilter));
  }

  render() {
    const { currentGame, currentFilter } = this.props;
    const { headerStuck, secondLineStuck } = this.state;

    const HeaderSecondLine = TheWrapper => (
      <TheWrapper className={secondLineStuck ? 'stuck' : ''}>
        <Filter onChange={this.onFilterChange} value={currentFilter} />
        <HeaderIcon
          svgPath="/svg/book.svg"
          alt="Smash Wiki"
          url="https://www.ssbwiki.com/tier_list"
        />
        <HeaderIcon
          svgPath="/svg/github.svg"
          alt="Soruce on GitHub"
          url="https://github.com/desko27/smash-tier-list"
        />
      </TheWrapper>
    );

    return (
      <Wrapper>
        <Header className={headerStuck ? 'stuck' : ''}>
          <SuperTitle>Super Smash Bros.</SuperTitle>
          <GameSelect
            gameTitle={currentGame ? currentGame.shortName : ''}
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
          {HeaderSecondLine(InnerHeaderSecondLine)}
        </Header>
        {HeaderSecondLine(OuterHeaderSecondLine)}
        <Main>
          <Game />
        </Main>
        <Footer>
          <FooterLine>
            <span>Made with</span>
            <span>
              <strong><FontAwesomeIcon icon={faHeart} /></strong>
            </span>
            <span>by</span>
            <span><strong>desko27</strong></span>
          </FooterLine>
          <FooterSeparator />
          <SocialIcons>
            <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/desko27">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/desko27">
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/desko27">
              <FontAwesomeIcon icon={faGithubSquare} />
            </a>
          </SocialIcons>
          <FooterSeparator />
          <FooterLine>
            <span>Powered by</span>
            <span>
              <strong><FontAwesomeIcon icon={faReact} size="lg" /></strong>
            </span>
            <span>React</span>
          </FooterLine>
        </Footer>
      </Wrapper>
    );
  }
}

SmashTierList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentGame: PropTypes.object.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    title: state.title,
    currentGame: currentGameSelector(state),
    currentFilter: state.currentFilter,
  }),
)(SmashTierList);
