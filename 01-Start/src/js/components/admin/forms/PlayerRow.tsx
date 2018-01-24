import * as React from 'react';
import ViewStore from '../../../stores/ViewStore';
import { Player } from '../../../models';
import { observer, inject } from 'mobx-react';

interface PlayerRowProps {
  index: number,
  player: Player,
  viewStore?: ViewStore,
}

interface PlayerRowState {

}

@inject("viewStore")
@observer
class PlayerRow extends React.Component<PlayerRowProps, PlayerRowState> {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleInputChange(e) {
    const { value } = e.target;
    const { viewStore, player } = this.props;

    if(value && value.trim().length !== 0) {
      viewStore.updatePlayer(player.key, value); 
    }
  }

  handleDeleteClick(key: string) {
    const { viewStore, player } = this.props;
    viewStore.removePlayer(key); 
  }
 
  render() {
    const { index, player } = this.props;
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <input 
            type="text" 
            className="form-control" 
            id="playerName" 
            name="name" 
            placeholder="Player Name" 
            value={`${player.name}`} 
            onChange={(e) => {this.handleInputChange(e)}}
          />
        </td>
        <td>
          <button 
            className={`btn btn-default`}
            onClick={() => this.handleDeleteClick(player.key)}
          >X</button>
        </td>
      </tr>
    );
  }
}

export default PlayerRow;