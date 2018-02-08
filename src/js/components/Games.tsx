import * as React from 'react';
import ViewStore from '../stores/ViewStore';
import { observer, inject } from 'mobx-react';
import * as classNames from 'classnames';


interface GamesProps {
  viewStore?: ViewStore
}

const Games = (props: GamesProps) => {
  const { games } = props.viewStore;
  return (
    <div>
      {
        games.length > 0 && games.map(game => {
          const { key, awayTeamName, homeTeamName, homeTeamGoals, awayTeamGoals, winnerKey, homeTeamKey, awayTeamKey} = game;
          return <span key={key} className="center-teams is-game">

            {/* available classes is-winner */}
            <span className={`center-teams__home ${winnerKey === homeTeamKey ? 'is-winner' : ''}`}>{homeTeamName}</span>

            {/* TODO ZASTAPIC warunkowe renderowanie klas -> classNames cons */ } 
            {/* available classes is-winner-home, is-draw, is-winner-away */}
            <span className={`center-teams__center is-winner-home ${winnerKey === '' ? 'is-draw' : ''} ${winnerKey === homeTeamKey ? 'is-winner-home' : ''} ${winnerKey === awayTeamKey ? 'is-winner-away' : ''}`}>{homeTeamGoals}:{awayTeamGoals}</span>

            {/* available classes is-winner */}
            <span className={`center-teams__away ${winnerKey === awayTeamKey ? 'is-winner' : ''}`}>{awayTeamName}</span>

          </span>
        })
      }
      
    </div>
  );
};

export default inject("viewStore")(observer(Games));