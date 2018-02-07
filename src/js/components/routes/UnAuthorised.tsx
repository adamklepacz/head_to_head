import * as React from 'react';
import { Link }  from 'react-router-dom';

const UnAuthorised = () => {
  return (
    <div id="login-form" className="panel panel-warning" >
      <div className="panel-heading">
        <div className="panel-title">You need to be logged in to access this page.</div>
      </div>
      <div className="panel-body" >
        <form className="form" role="form">
          <div className="col-sm-12">
            <div className="form-group">
              <Link to="/login" className="btn btn-primary btn-block">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UnAuthorised;