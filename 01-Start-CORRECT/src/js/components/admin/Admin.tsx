import * as React from 'react';
import { ManageGames, ManageHeadToHeads, ManagePlayers } from './';
import ViewStore from '../../stores/ViewStore';
import { observer, inject } from 'mobx-react';

interface AdminProps {
  viewStore?: ViewStore
}

@inject('viewStore')
@observer
class Admin extends React.Component<AdminProps, any> {
  render() {
    const { viewStore } = this.props;
    const { players, headToHeads } = viewStore;
    return (
      <div className="col-sm-8">
        
        <ManagePlayers/>
        {
          players.length > 1 && <ManageHeadToHeads />
        }
        {
          headToHeads.length > 0 && <ManageGames />
        }
      </div>
    );
  }
}

export default Admin;