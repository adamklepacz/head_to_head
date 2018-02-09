import * as React from 'react';
import PlayerIcon from './PlayerIcon';
import Games from './Games';
import { HeadToHead } from '../models';
import ViewStore from '../stores/ViewStore';
import { observer, inject } from 'mobx-react';

interface HeadToHeadDetailsProps {
  viewStore?: ViewStore,
  headToHead: HeadToHead,
  history: any
}

interface HeadToHeadDetailsState {
  showAllGames: boolean,
}

@inject('viewStore')
@observer
class HeadToHeadDetails extends React.Component<HeadToHeadDetailsProps, HeadToHeadDetailsState> {
  constructor(props) {
    super(props);

    this.state = {
      showAllGames: false,
    }

  }

  handleShowAll = () => {
    const { viewStore } = this.props;
    const { selectedHeadToHead } = viewStore;

    // fetch all the games
    viewStore.fetchGames(selectedHeadToHead, true);

    this.setState({
      showAllGames: true,
    });
  }

  render() {
    const { history, headToHead, viewStore } = this.props;
    const { selectedHeadToHead, getPlayerNames, games } = viewStore;
    const { location } = history;
    const isAll = location.pathname === '/all'; //check where we are 
    const goToDetail = () => {
      viewStore.selectHeadToHead(headToHead)
      history.push(`/details/${headToHead.key}`);
    }
    const { playerA, playerB, playerAWinCount, playerBWinCount, drawsCount, title} = headToHead || selectedHeadToHead;
    const { showAllGames } = this.state;

    return (
      //with-details
      <div className={`hth-block ${!isAll ? 'with-details' : ''}`} onClick={() => {
        isAll && goToDetail();
      }}>
        <div className={`hth-block__item is-winning away-team`} >
          
          {/* Head To Head title - start */}
          <span className="hth-block__item__title center-teams">
            <span className="center-teams__home">
              <span><PlayerIcon /> {getPlayerNames(playerA)}</span>
            </span> 
            <span className="center-teams__center">vs</span> 
            <span className="center-teams__away">
              <span>{getPlayerNames(playerB)}<PlayerIcon /></span>
            </span>
          </span>
          {/* Head To Head title - end */}

          {/* Head To Head body - start */}
          <span className="hth-block__item__body">
            <span className="hth-block__item__label"><em>All times score</em></span>
            
            {/* Total score - start */}
            <span className="center-teams">
              <span className="center-teams__home">{playerAWinCount}</span> 
              <span className="center-teams__center">- {drawsCount} -</span> 
              <span className="center-teams__away">{playerBWinCount}</span>
            </span>
            {/* Total score - end */}

            <span className="hth-block__details">

              <span className="hth-block__item__label is-large">{title}</span>
              {
                games.length > 0 ?
                  <Games /> :
                  <span className="hth-block__item__label"><em>No games found.</em></span>
              }
            </span>

          </span>
          {/* Head To Head body - end */}
          {
            !showAllGames && games.length > 0 && games.length < 11 && <button type="button" className="btn btn-default btn-lg btn-block btn-show-all" onClick={() => {
              this.handleShowAll();
            }}>Show All</button>
          }
          
          

        </div>
      </div>
    );
  }
}

export default HeadToHeadDetails;