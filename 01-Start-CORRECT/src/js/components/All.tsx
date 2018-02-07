import * as React from 'react';
import ViewStore from '../stores/ViewStore';
import { observer, inject } from 'mobx-react';

interface AllProps {
  viewStore?: ViewStore,

};

interface AllState {

}

@inject('viewStore')
@observer
class All extends React.Component<AllProps, AllState> {
  render() {
    const { viewStore } = this.props;
    return (
      <div>
        {/* Render all "compact head to heads" or "No Head To Heads found" */}
        <div className="panel panel-info">
          <div className="panel-heading">No Head To Heads found</div>
          <div className="panel-body">Create at least two <a href="#">Players</a> and one <a href="#">Head To Head</a>.</div>
        </div>
      </div>
    );
  }
}

export default All;