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
        games.length > 0 && games.reverse().map(game => {
          const { key, awayTeamName, homeTeamName, homeTeamGoals, awayTeamGoals } = game;

          const homeTeamClass = classNames({
            'center-teams__home': true,
            'is-winner': homeTeamGoals > awayTeamGoals,
          });
          const centerClass = classNames({
            'center-teams__center': true,
            'is-winner-home': homeTeamGoals > awayTeamGoals,
            'is-winner-away': awayTeamGoals > homeTeamGoals,
            'is-draw': homeTeamGoals === awayTeamGoals,
          });
          const awayTeamClass = classNames({
            'center-teams__away': true,
            'is-winner': awayTeamGoals > homeTeamGoals
          });
          return <span key={key} className="center-teams is-game">

            {/* available classes is-winner */}
            <span className={homeTeamClass}>{homeTeamName}</span>

            {/* TODO ZASTAPIC warunkowe renderowanie klas -> classNames cons */ } 
            {/* available classes is-winner-home, is-draw, is-winner-away */}
            <span className={centerClass}>{homeTeamGoals}:{awayTeamGoals}</span>

            {/* available classes is-winner */}
            <span className={awayTeamClass}>{awayTeamName}</span>

          </span>
        })
      }
      
    </div>
  );
};

export default inject("viewStore")(observer(Games));