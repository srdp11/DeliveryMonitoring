class DeliveryMonitoring extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: this.props.records,
      app_mode: "main",
      auth_status: false,
      operator_request_status: true,
      edit: false,
      client_mode: "login"
    }
  }

  setupSubscription() {
    App.comments = App.cable.subscriptions.create("UpdaterChannel", {
      phone_num: this.state.phone_num,
      updateRecord: this.updateRecord.bind(this),
      setState: this.setState.bind(this),
      state: this.state,

      connected: function () {
        this.perform('follow', { phone_num: this.phone_num });
      },

      received: function (data) {
        const record = data.data.record;
        const status_list = data.data.status_list;

        this.updateRecord(this.state.records.find(x => x.mail_id == record.mail_id), record);
        this.setState({
          status_list: status_list
        })
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
    records = this.state.records.slice();
    records.push(record);
    this.setState({
      records: records
    });
  }

  refreshOperatorRecord(record) {
    idx = this.state.records.findIndex(x => x.mail_id == record.mail_id);
    records = this.state.records;
    records.splice(idx, 1, data);
    this.setState({ records: records });
  }

  updateRecord(record, data) {
    idx = this.state.records.indexOf(record);
    records = this.state.records;
    records.splice(idx, 1, data);
    this.setState({ records: records });
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
  updateClientInfo(event, mail_id, phone_num, error) {
    if (event != null) {
      event.preventDefault();
    }

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
          records: data.records,
          status_list: data.status_list
        });

        this.switchClientMode();
        this.setupSubscription();
      },
      error: error
    });
  }

  resetCredentials() {
    this.setState({
      mail_id: "",
      phone_num: "",
    });
  }

  refreshClientInfo() {
    this.updateClientInfo(null, this.state.mail_id, this.state.phone_num);
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

  getPhoneNum() {
    return this.state.phone_num;
  }

  getProfileRecords() {
    return this.state.records;
  }

  setAuthStatus(status) {
    this.setState({
      auth_status: status
    });
  }

  setPhoneNum(phone_num) {
    this.setState({
      phone_num: phone_num
    })
  }

  render() {
    var block;

    if (this.state.app_mode == "operator") {
      block = (
        <Operator records={ this.state.records }
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
                updateClientInfo={ this.updateClientInfo.bind(this) }
                resetCredentials={ this.resetCredentials.bind(this) }
                setupSubscription={ this.setupSubscription.bind(this) }
                phone_num={ this.state.phone_num }
                records={ this.state.records }
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
