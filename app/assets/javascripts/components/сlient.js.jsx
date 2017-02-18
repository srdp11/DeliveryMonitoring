class Client extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "login"
    }

    this.changeMode = this.changeMode.bind(this);
    this.setPhoneNum = this.setPhoneNum.bind(this);
    this.updateProfileInfo = this.updateProfileInfo.bind(this);
  }

  changeMode() {
    if (this.state.mode == "login") {
      this.setState({
        mode: "client_info"
      })
    }
    else {
      this.setState({
        mode: "login"
      })
    }
  }

  setPhoneNum(phone_num) {
    this.setState({
      phone_num: phone_num
    })
  }

  updateProfileInfo(records, status_list) {
    this.setState({
      records: records,
      status_list: status_list
    })

    console.log(this.state);
  }

  render() {
    if (this.state.mode == "login") {
      return <ClientLoginForm changeMode={ this.changeMode } setPhoneNum={ this.setPhoneNum } updateProfileInfo={ this.updateProfileInfo }  />
    }
    else if (this.state.mode == "client_info") {
      return <ClientInfo phone_num={ this.state.phone_num } records={ this.state.records } status_list={ this.state.status_list } />
    }
  }
}
