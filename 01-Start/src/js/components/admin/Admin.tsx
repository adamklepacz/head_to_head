import * as React from 'react';

// import ManagePlayers from './ManagePlayers';
// import ManageHeadToHeads from './ManageHeadToHeads';
// import ManageGames from './ManageGames';

import { ManageGames, ManageHeadToHeads, ManagePlayers } from './';

class Admin extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { viewStore } = this.props;
    return (
      <div className="col-sm-8">
        
        <ManagePlayers/>
        {/* <ManageHeadToHeads />
        <ManageGames /> */}
        
      </div>
    );
  }
}

export default Admin;