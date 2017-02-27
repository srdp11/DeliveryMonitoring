let login_phone_num_input = null;
let login_mail_id_input = null;

const ClientLoginForm = (props) => {
  const authNotification = props.getAuthStatus() ? "alert alert-danger hide" : "alert alert-danger";

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
            <input type="text" className="form-control" ref={(input) => { login_phone_num_input = input; }}  />
          </div>

          <div className="form-group">
            <label className="control-label">Mail ID</label>
            <input type="text" className="form-control" ref={(input) => { login_mail_id_input = input; }} />
          </div>

          <button className="btn btn-lg btn-primary btn-block"
                  onClick={ (event) => props.onSignin(event, login_mail_id_input.value, login_phone_num_input.value) }>Sign in</button>
        </form>
      </div>
    </div>
  );
}
