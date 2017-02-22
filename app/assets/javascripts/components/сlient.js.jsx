class Client extends React.Component {
  render() {
    if (this.props.getClientMode() == "login") {
      return <ClientLoginForm switchClientMode={ this.props.switchClientMode }
                              getClientMode={ this.props.getClientMode }
                              setPhoneNum={ this.props.setPhoneNum }
                              updateClientInfo={ this.props.updateClientInfo }
                              setupSubscription={ this.props.setupSubscription }
                              setAuthStatus={ this.props.setAuthStatus }
                              getAuthStatus={ this.props.getAuthStatus }
                              />
    }
    else if (this.props.getClientMode() == "client_info") {
      return <ClientInfo getPhoneNum={ this.props.getPhoneNum }
                         switchClientMode={ this.props.switchClientMode }
                         resetCredentials= { this.props.resetCredentials }
                         setAuthStatus={ this.props.setAuthStatus }
                         phone_num={ this.props.phone_num }
                         records={ this.props.records }
                         status_list={ this.props.status_list }
                          />
    }
  }
}
