import * as React from 'react';
import ViewStore from '../../../stores/ViewStore';
import { inject, observer } from 'mobx-react';

interface AddHeadToHeadFormProps {
  viewStore?: ViewStore;
}


interface AddHeadToHeadFormState {
  headToHeadName: string,
  playerA: string,
  playerB: string
}


@inject("viewStore")
@observer
class AddHeadToHeadForm extends React.Component<AddHeadToHeadFormProps, AddHeadToHeadFormState> {
  constructor(props) {
    super(props);

    this.state = {
      headToHeadName: '',
      playerA: '',
      playerB: ''
    };
  }

  handleInputChange(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { viewStore } = this.props;
    const { headToHeadName, playerA, playerB } = this.state;

    if (headToHeadName && playerA.trim().length !== 0 && playerB.trim().length !== 0) {
      // add player to firebase 
      viewStore.addHeadToHead(headToHeadName, playerA, playerB);

      // clear the form 
      this.setState({
        headToHeadName: '',
        playerA: '',
        playerB: ''
      });
    }
  }
  
  render() {
    const { players } = this.props.viewStore;
    const { headToHeadName, playerA, playerB } = this.state;

    return (
      <div className="panel panel-success">
        <div className="panel-heading"><h3 className="panel-title">Add new Head To Head</h3></div>
        <div className="panel-body">
          <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="headToHeadName">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="headToHeadName" 
                    name="headToHeadName" 
                    placeholder="VS Your Mate"
                    value={headToHeadName}
                    onChange={(e) => this.handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="playerA">Your Name</label>
                  <select 
                    className="form-control" 
                    id="playerA" 
                    name="playerA" 
                    value={playerA}
                    onChange={(e) => this.handleInputChange(e)}
                  > 
                    <option value=''>Select a player</option>
                    {
                      players.length > 0 && players.map(player => {
                        const { name, key } = player;
                        return <option key={key} value={key}>{name}</option>
                      })
                        
                    }
                  </select>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="playerB">Your Friend</label>
                  <select 
                  className="form-control"
                  id="playerB" 
                  name="playerB"
                  value={playerB}
                  onChange={(e) => this.handleInputChange(e)}
                > 
                  <option value=''>Select a player</option>
                  {
                    players.length > 0 && players.map(player => {
                      const { name, key } = player;
                      return <option key={key} value={key}>{name}</option>
                    })
                  }
                  </select>
                </div>
              </div>
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddHeadToHeadForm;