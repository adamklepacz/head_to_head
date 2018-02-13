import * as React from 'react';
import ViewStore from '../stores/ViewStore';
import { observer, inject } from 'mobx-react';
import HeadToHeadDetails from './HeadToHeadDetails';
import { Link } from 'react-router-dom';

interface AllProps {
  viewStore?: ViewStore,
  history: any,

};

interface AllState {

}

@inject('viewStore')
@observer
class All extends React.Component<AllProps, AllState> {
  componentDidMount() {
    const { viewStore } = this.props;
    viewStore.fetchData();
  }

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
            <div className="panel-body">Create at least two
              <Link className="custom_link_link" to="/admin"> Players </Link> and one <Link to="/admin"> Head to Head.</Link>
            </div>
          </div>

        }
      </div>
    );
  }
}

export default All;