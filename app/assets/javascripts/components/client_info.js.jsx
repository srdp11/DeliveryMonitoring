class ClientInfo extends React.Component {
  constructor(props) {
    super(props);

    this.phone_num = this.props.phone_num;
    this.records = this.props.records;
  }

  collapseRow(record) {
    return (
      <div className="wrap">
        <button className="btn btn-info collapse-btn" data-toggle="collapse" data-target={"#".concat(record.mail_id )}>{ record.mail_id }</button>

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
            <label>Status:</label>
            <span>{ record.status }</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h3>Phone: { this.phone_num }</h3>
        <h3>Orders:</h3>

        {
        this.records.map((record) => {
          return this.collapseRow(record);
        })
      }
        {/*
        <table className="table table-hover">
          <thead>
            <th>ID</th>
            <th>Sender address</th>
            <th>Recipient address</th>
            <th>Status</th>
          </thead>
          <tbody>
            {
              this.records.map((record) => {
                return this.collapseRow(record);
              })
            }
          </tbody>
        </table>
        */}
    </div>
    );
  }
}
