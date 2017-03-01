class DeliveryMonitoring extends React.Component {
  constructor(props) {
    super(props);

    const app_mode = sessionStorage.getItem("app_mode") ? sessionStorage.getItem("app_mode") : "main"

    const operator_records = this.props.operator_records.slice().sort((a, b) => {
      return a.mail_id - b.mail_id;
    });

    this.state = {
      operator_records: operator_records,
      app_mode: app_mode,
      is_failed_auth: false,
      operator_request_status: true,
      mail_id: this.props.mail_id,
      phone_num: this.props.phone_num,
      client_records: this.props.client_records,
      status_list: this.props.status_list,
      is_auth: this.props.is_auth
    }

    if (this.state.mail_id != null) {
      this.setupSubscription();
    }
  }

  setupSubscription() {
    App.updater = App.cable.subscriptions.create("UpdaterChannel", {
      phone_num: this.state.phone_num,
      setState: this.setState.bind(this),
      refreshClientRecord: this.refreshClientRecord.bind(this),
      refreshStatusList: this.refreshStatusList.bind(this),
      saveClientData: this.saveClientData.bind(this),
      state: this.state,

      connected: function () {
        this.perform('follow', { phone_num: this.phone_num });
      },

      received: function (data) {
        const record = data.data.record;
        const status_list = data.data.status_list;

        this.refreshClientRecord(record);
        this.refreshStatusList(status_list);

        this.saveClientData(this.state.client_records, this.state.status_list);
      }
    })
  }

  // modes
  operatorMode() {
    sessionStorage.setItem("app_mode", "operator")

    this.setState({
      app_mode: "operator"
    });
  }

  clientMode() {
    sessionStorage.setItem("app_mode", "client")

    this.setState({
      app_mode: "client"
    });
  }

  // operator
  isAuth() {
    return this.state.is_auth;
  }

  setAuth(status) {
    this.setState({
      is_auth: status
    });
  }

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
        this.saveClientData(data.records, data.status_list);

        this.setCredentials(mail_id, phone_num);
        this.setAuth(true);
        this.setupSubscription();
      },
      error: (xhr, status, err) => {
        this.setFailedAuth(true);
      }
    });
  }

  saveClientData(records, status_list) {
    this.setState({
      client_records: records,
      status_list: status_list
    });
  }

  onSignout(event) {
    event.preventDefault();

    $.ajax({
      type: 'DELETE',
      url: '/clients/',
      data: {data: "33"},
      success: (data) => {
        App.updater.unsubscribe();
        this.setAuth(false);
        this.resetCredentials();
        this.setFailedAuth(false);
      }
    });
  }

  setCredentials(mail_id, phone_num) {
    this.setState({
      mail_id: mail_id,
      phone_num: phone_num
    });
  }

  resetCredentials() {
    this.setState({
      mail_id: null,
      phone_num: null
    });
  }

  getClientMode() {
    return this.state.client_mode;
  }

  isFailedAuth() {
    return this.state.is_failed_auth;
  }

  setFailedAuth(status) {
    this.setState({
      is_failed_auth: status
    });
  }

  getPhoneNum() {
    return this.state.phone_num;
  }

  setPhoneNum(phone_num) {
    this.setState({
      phone_num: phone_num
    });
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
        <Client getClientMode={ this.getClientMode.bind(this) }
                isFailedAuth={ this.isFailedAuth.bind(this) }
                getPhoneNum={ this.getPhoneNum.bind(this) }
                setFailedAuth={ this.setFailedAuth.bind(this) }
                setPhoneNum={ this.setPhoneNum.bind(this) }
                onSignin={ this.onSignin.bind(this) }
                onSignout={ this.onSignout.bind(this) }
                resetCredentials={ this.resetCredentials.bind(this) }
                setupSubscription={ this.setupSubscription.bind(this) }
                isAuth={ this.isAuth.bind(this) }
                phone_num={ this.state.phone_num }
                mail_id={ this.state.mail_id }
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
