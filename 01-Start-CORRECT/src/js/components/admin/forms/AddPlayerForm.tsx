import * as React from 'react';
import ViewStore from '../../../stores/ViewStore';
import { inject, observer } from 'mobx-react';

interface AddPlayerFormProps {
  viewStore?: ViewStore;
}

interface AddPlayerFormState {
  playerName: string
}

@inject("viewStore")
@observer
class AddPlayerForm extends React.Component<AddPlayerFormProps, AddPlayerFormState> {
  constructor(props) {
    super(props);

    this.state = {
      playerName: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { viewStore } = this.props;
    const { playerName } = this.state;

    if(playerName && playerName.trim().length !== 0) {
      // add player to firebase 
      viewStore.addPlayer(playerName);

      // clear the form 
      this.setState({
        playerName: ''
      });
    }
  }

  render() {
    return (
      <div className="panel panel-success">
        <div className="panel-heading"><h3 className="panel-title">Add new player</h3></div>
        <div className="panel-body">
          <form 
            className="form" 
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="playerName">Player Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="playerName" 
                    name="playerName" 
                    placeholder="Player name"
                    value={this.state.playerName}
                    onChange={(e) => this.handleInputChange(e) }
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12">
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPlayerForm;