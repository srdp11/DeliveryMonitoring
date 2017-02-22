class Client extends React.Component {
  render() {
    if (this.props.getClientMode() == "login") {
      return <ClientLoginForm switchClientMode={ this.props.switchClientMode }
                              getClientMode={ this.props.getClientMode }
                              setPhoneNum={ this.props.setPhoneNum }
                              onSignin={ this.props.onSignin }
                              setupSubscription={ this.props.setupSubscription }
                              setAuthStatus={ this.props.setAuthStatus }
                              getAuthStatus={ this.props.getAuthStatus }
                              />
    }
    else if (this.props.getClientMode() == "client_info") {
      return <ClientProfile getPhoneNum={ this.props.getPhoneNum }
                            onSignout={ this.props.onSignout }
                            phone_num={ this.props.phone_num }
                            records={ this.props.records }
                            mail_id={ this.props.mail_id }
                            status_list={ this.props.status_list }
                            />
    }
  }
}
