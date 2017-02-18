class ClientLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.changeMode = this.props.changeMode;
    this.setPhoneNum = this.props.setPhoneNum;
    this.updateProfileInfo = this.props.updateProfileInfo;
    this.isFailedAuth= this.props.isFailedAuth;
    this.setAuthStatus  = this.props.setAuthStatus

    this.onSignin = this.onSignin.bind(this);
  }

  onSignin(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/clients/',
      data: {
        mail_id: this.refs.mail_id.value,
        phone_num: this.refs.phone_num.value
      },
      success: (data) => {
        parsed_data = data;

        this.setPhoneNum(this.refs.phone_num.value);
        this.updateProfileInfo(parsed_data.records, parsed_data.status_list);
        this.changeMode();
      },
      error: (xhr, status, err) => {
        this.setAuthStatus(true);
      }
    });
  }

  render() {
    const authNotification = this.isFailedAuth() ? "alert alert-danger" : "alert alert-danger hide";

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

            <button className="btn btn-lg btn-primary btn-block" onClick={ this.onSignin }>Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}
