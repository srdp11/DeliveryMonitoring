class ClientLoginForm extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <form className="form-signin" method="post">
            <h3 className="form-signin-heading">Sign in to track your orders!</h3>

            <div className="form-group">
              <label className="control-label">Phone number</label>
              <input type="text" className="form-control" name="phone_num" />
            </div>

            <div className="form-group">
              <label className="control-label">Mail ID</label>
  			      <input type="text" className="form-control" name="mail_id" />
            </div>

            <button className="btn btn-lg btn-primary btn-block"  name="Submit" value="Login" type="Submit">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}
