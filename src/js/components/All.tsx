import * as React from 'react';
import ViewStore from '../stores/ViewStore';
import { observer, inject } from 'mobx-react';
import HeadToHeadDetails from './HeadToHeadDetails';

interface AllProps {
  viewStore?: ViewStore,
  history: any,

};

interface AllState {

}

@inject('viewStore')
@observer
class All extends React.Component<AllProps, AllState> {
  render() {
    const { viewStore, history } = this.props;
    const { headToHeads } = viewStore;
    return (
      <div>
        {
          headToHeads.length > 0 ? headToHeads.map(headToHead => {
            const { key } = headToHead;
            return <HeadToHeadDetails key={key} history={history} headToHead={headToHead}/>
          }) :
          <div className="panel panel-info">
            <div className="panel-heading">No Head To Heads found</div>
            <div className="panel-body">Create at least two <a href="#">Players</a> and one <a href="#">Head To Head</a>.</div>
          </div>

        }
      </div>
    );
  }
}

export default All;