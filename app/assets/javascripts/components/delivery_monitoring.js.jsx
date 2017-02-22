class DeliveryMonitoring extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operator_records: this.props.records,
      app_mode: "main",
      auth_status: true,
      operator_request_status: true,
      edit: false,
      client_mode: "login"
    }
  }

  setupSubscription() {
    App.comments = App.cable.subscriptions.create("UpdaterChannel", {
      phone_num: this.state.phone_num,
      setState: this.setState.bind(this),
      refreshClientRecord: this.refreshClientRecord.bind(this),
      refreshStatusList: this.refreshStatusList.bind(this),
      state: this.state,

      connected: function () {
        this.perform('follow', { phone_num: this.phone_num });
      },

      received: function (data) {
        const record = data.data.record;
        const status_list = data.data.status_list;

        this.refreshClientRecord(record);
        this.refreshStatusList(status_list);
      }
    })
  }

  // modes
  operatorMode() {
    this.setState({
      app_mode: "operator"
    });
  }

  clientMode() {
    this.setState({
      app_mode: "client"
    });
  }

  // operator
  addNewRecord(record) {
    records = this.state.operator_records.slice();
    records.push(record);
    this.setState({
      operator_records: records
    });
  }

  refreshOperatorRecord(record) {
    idx = this.state.operator_records.findIndex(x => x.mail_id == record.mail_id);
    records = this.state.operator_records;
    records.splice(idx, 1, record);
    this.setState({ operator_records: records });
  }

  setOperatorRequestStatus(status) {
    this.setState({
      operator_request_status: status
    });
  }

  getOperatorRequestStatus() {
    return this.state.operator_request_status;
  }

  getEditStatus() {
    return this.state.edit;
  }

  // client
  onSignin(event, mail_id, phone_num) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/clients/',
      data: {
        mail_id: mail_id,
        phone_num: phone_num
      },
      success: (data) => {
        this.setState({
          mail_id: mail_id,
          phone_num: phone_num,
          client_records: data.records,
          status_list: data.status_list
        });

        this.switchClientMode();
        this.setupSubscription();
      },
      error: (xhr, status, err) => {
        this.setAuthStatus(false);
      }
    });
  }

  onSignout(event) {
    event.preventDefault();

    this.resetCredentials();
    this.switchClientMode();
    this.setAuthStatus(true);
  }

  resetCredentials() {
    this.setState({
      mail_id: "",
      phone_num: "",
    });
  }

  switchClientMode() {
    if (this.state.client_mode == "login") {
      this.setState({
        client_mode: "client_info"
      })
    }
    else {
      this.setState({
        client_mode: "login"
      })
    }
  }

  getClientMode() {
    return this.state.client_mode;
  }

  getAuthStatus() {
    return this.state.auth_status;
  }

  setAuthStatus(status) {
    this.setState({
      auth_status: status
    });
  }

  getPhoneNum() {
    return this.state.phone_num;
  }

  setPhoneNum(phone_num) {
    this.setState({
      phone_num: phone_num
    })
  }

  refreshClientRecord(record) {
    idx = this.state.client_records.findIndex(x => x.mail_id == record.mail_id);
    records = this.state.client_records;
    records.splice(idx, 1, record);
    this.setState({ client_records: records });
  }

  refreshStatusList(status_list) {
    new_status_list =  this.state.status_list;
    Object.assign(new_status_list, status_list);
    this.setState({ status_list: new_status_list });
  }

  render() {
    var block;

    if (this.state.app_mode == "operator") {
      block = (
        <Operator records={ this.state.operator_records }
                  addNewRecord={ this.addNewRecord.bind(this) }
                  refreshOperatorRecord={ this.refreshOperatorRecord.bind(this) }
                  setOperatorRequestStatus={ this.setOperatorRequestStatus.bind(this) }
                  getOperatorRequestStatus={ this.getOperatorRequestStatus.bind(this) }
                  />
      );
    }
    else if (this.state.app_mode == "client") {
      block = (
        <Client switchClientMode={ this.switchClientMode.bind(this) }
                getClientMode={ this.getClientMode.bind(this) }
                getAuthStatus={ this.getAuthStatus.bind(this) }
                getPhoneNum={ this.getPhoneNum.bind(this) }
                setAuthStatus={ this.setAuthStatus.bind(this) }
                setPhoneNum={ this.setPhoneNum.bind(this) }
                onSignin={ this.onSignin.bind(this) }
                onSignout={ this.onSignout.bind(this) }
                resetCredentials={ this.resetCredentials.bind(this) }
                setupSubscription={ this.setupSubscription.bind(this) }
                phone_num={ this.state.phone_num }
                records={ this.state.client_records }
                status_list={ this.state.status_list }
                />
      );
    }

    return (
      <div className="wrap">
        <h1 className="main-h1">Delivery Monitoring</h1>

        <div className="app-block">
          <div className="navbar">
            <button className="btn btn-info navbar-elem" onClick={ () => this.operatorMode() }>Operator</button>
            <button className="btn btn-info navbar-elem" onClick={ () => this.clientMode() }>Client</button>
          </div>

          <div className="mode-block">
            { block }
          </div>
      </div>
    </div>
    );
  }
}
