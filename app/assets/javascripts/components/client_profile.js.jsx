class ClientProfile extends React.Component {
  collapseRow(record) {
    var collapseClass = this.props.mail_id == record.mail_id ? "collapse in" : "collapse";

    return (
      <div className="wrap">
        <button className="btn btn-info collapse-btn text-left" data-toggle="collapse" data-target={"#".concat(record.mail_id)}>
          <span className="pull-left">
            { "Order number: ".concat(record.mail_id) }
          </span>
        </button>

        <div id={ record.mail_id } className= { collapseClass }>
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
            { this.statusListCollapse(this.props.status_list[record.mail_id], record.mail_id) }
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
    var records = this.props.records;

    const firstElement = records.find(x => x.mail_id == this.props.mail_id);
    records = records.filter(x => x != firstElement);
    records.unshift(firstElement);

    return (
      <div className="container">
        <div className="prof-block">
          <h3>Phone: { this.props.getPhoneNum() }</h3>

          <button className="btn btn-xs btn-primary btn-out" onClick={ (event) => this.props.onSignout(event) }>Sign out</button>
        </div>

        <h3>Orders:</h3>

        {
          records.map((record) => {
            return this.collapseRow(record);
          })
        }
      </div>
    );
  }
}
