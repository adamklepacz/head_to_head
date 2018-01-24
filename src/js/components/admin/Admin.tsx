import * as React from 'react';

// import ManagePlayers from './ManagePlayers';
// import ManageHeadToHeads from './ManageHeadToHeads';
// import ManageGames from './ManageGames';

import { ManageGames, ManageHeadToHeads, ManagePlayers } from './';
import ViewStore from '../../stores/ViewStore';
import { observer, inject } from 'mobx-react';

interface AdminProps {
  viewStore?: ViewStore
}

@inject("viewStore")
@observer
class Admin extends React.Component<AdminProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { viewStore } = this.props;
    const { players } = viewStore;
    return (
      <div className="col-sm-8">
        
        <ManagePlayers/>
        {
          players.length > 1 && <ManageHeadToHeads />
        }
        {/* <ManageGames /> */}
        
      </div>
    );
  }
}

export default Admin;