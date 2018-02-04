import * as React from 'react';
import ViewStore from '../../../stores/ViewStore';
import { HeadToHead } from '../../../models';
import { observer, inject } from 'mobx-react';

interface HeadToHeadRowProps {
  index: number,
  headToHead: HeadToHead,
  viewStore?: ViewStore,
}

interface PlayerRowState {

}

@inject('viewStore')
@observer
class HeadToHeadRow extends React.Component<HeadToHeadRowProps, PlayerRowState> {
  handleInputChange(e) {
    const { name, value } = e.target;
    const { viewStore, headToHead } = this.props;

    if (value && value.trim().length !== 0) {
      viewStore.updateHeadToHead(headToHead.key, name, value);
    }
  }

  handleDeleteClick(key: string) {
    const { viewStore, headToHead } = this.props;
    viewStore.removeHeadToHead(key);
  }

  render() {
    const { headToHead, index, viewStore } = this.props;
    const { players } = viewStore;
    const { title, playerA, playerB } = headToHead;
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <input 
            type="text" 
            className="form-control" 
            id={`title`} 
            name="title" 
            placeholder="Head To Head Title" 
            value={title}
            onChange={(e) => this.handleInputChange(e)}
          />
        </td>
        <td>
          <div className="form-group">
            <select 
              className="form-control" 
              id="playerA" 
              name="playerA" 
              value={playerA}
              onChange={(e) => this.handleInputChange(e)}
            > 
              {
                players.length > 0 && players.map(player => {
                  const { name, key } = player;
                  return <option key={key} value={key}>{name}</option>
                })
              }
            </select>
          </div>
        </td>
        <td>
          <div className="form-group">
            <select 
              className="form-control" 
              id="playerB" 
              name="playerB" 
              value={playerB}
              onChange={(e) => this.handleInputChange(e)}
            > 
              {
                players.length > 0 && players.map(player => {
                  const { name, key} = player;
                  return <option key={key} value={key}>{name}</option>
                })
              }
            </select>
          </div>
        </td>
        <td>
          <button className="btn btn-default" onClick={() => this.handleDeleteClick(headToHead.key)}>X</button>
        </td>
      </tr>
    );
  }
}

export default HeadToHeadRow;