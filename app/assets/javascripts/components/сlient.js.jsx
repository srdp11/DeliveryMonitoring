class Client extends React.Component {
  render() {
    if (this.props.getClientMode() == "login") {
      return <ClientLoginForm switchClientMode={ this.props.switchClientMode }
                              getClientMode={ this.props.getClientMode }
                              setPhoneNum={ this.props.setPhoneNum }
                              updateProfileInfo={ this.props.updateProfileInfo }
                              setAuthStatus={ this.props.setAuthStatus }
                              getAuthStatus={ this.props.getAuthStatus }
                              />
    }
    else if (this.props.getClientMode() == "client_info") {
      return <ClientInfo getPhoneNum={ this.props.getPhoneNum }
                         phone_num={ this.props.phone_num }
                         records={ this.props.records }
                         status_list={ this.props.status_list }
                          />
    }
  }
}
