class ClientLoginForm extends React.Component {
  render() {
    const authNotification = this.props.getAuthStatus() ? "alert alert-danger hide" : "alert alert-danger";

    return (
      <div className="container">
        <div className="wrapper">
          <form className="form-signin">
            <h3 className="form-signin-heading">Sign in to track your orders!</h3>

            <div className={ authNotification }>
              <strong>Error!</strong> Wrong mobile number or Mail ID!
            </div>

            <div className="form-group">
              <label className="control-label">Phone number</label>
              <input type="text" className="form-control" ref="phone_num" />
            </div>

            <div className="form-group">
              <label className="control-label">Mail ID</label>
  			      <input type="text" className="form-control" ref="mail_id" />
            </div>

            <button className="btn btn-lg btn-primary btn-block"
                    onClick={ (event) => this.props.onSignin(event, this.refs.mail_id.value, this.refs.phone_num.value) }>Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}
