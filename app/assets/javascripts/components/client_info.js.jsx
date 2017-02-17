class ClientInfo extends React.Component {
  constructor(props) {
    super(props);

    this.phone_num = this.props.phone_num;
    this.records = this.props.records;
  }

  collapseRow(record) {
    return (
      <tr>
        <td>{ record.mail_id }</td>
        <td>{ record.sender_address }</td>
        <td>{ record.recipient_address }</td>
        <td>{ record.status }</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="container">
        <h3>Phone: { this.phone_num }</h3>

        <table className="table table-orders">
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
    </div>
    );
  }
}
