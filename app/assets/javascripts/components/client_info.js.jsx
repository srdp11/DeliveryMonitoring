class ClientInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_num: this.props.phone_num,
      records: this.props.records,
      status_list: this.props.status_list
    };
  }

  collapseRow(record) {
    return (
      <div className="wrap">
        <button className="btn btn-info collapse-btn text-left" data-toggle="collapse" data-target={"#".concat(record.mail_id)}>
          <span className="pull-left">
            { "Order number: ".concat(record.mail_id) }
          </span>
        </button>

        <div id={ record.mail_id } className="collapse">
          <div className="info-block">
            <label>Sender address:</label>
            <span>{ record.sender_address }</span>
          </div>

          <div className="info-block">
            <label>Recipient address:</label>
            <span>{ record.recipient_address }</span>
          </div>

          <div className="info-block">
            <label>Current status:</label>
            <span>{ record.status }</span>
          </div>

          <div className="info-block">
            { this.statusListCollapse(this.state.status_list[record.mail_id], record.mail_id) }
          </div>
        </div>
      </div>
    );
  }

  statusListCollapse(status_list, mail_id) {
    let block;

    if (status_list.length > 0) {
      block = (
        <ul>
        {
          status_list.map((item) => {
            return (
              <li>{ item }</li>
            );
          })
        }
        </ul>
      )
    }
    else {
      block = (
        <em>History is empty</em>
      )
    }

    return (
      <div className="wrap">
        <button className="btn btn-info" data-toggle="collapse" data-target={ "#status_".concat(mail_id) }>Status history</button>

        <div id={ "status_".concat(mail_id) } className="collapse">
          { block }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h3>Phone: { this.state.phone_num }</h3>
        <h3>Orders:</h3>

        {
          this.state.records.map((record) => {
            return this.collapseRow(record);
          })
        }
      </div>
    );
  }
}
