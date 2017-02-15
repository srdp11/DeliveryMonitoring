class Records extends React.Component {
  constructor(props) {
    super(props);

    this.addNewRecord = this.addNewRecord.bind(this);

    this.state = {
      records: props.records
    }
  }

  addNewRecord(record) {
    records = this.state.records.slice();
    records.push(record);
    this.setState({
      records: records
    });
  }

  render() {
    return(
      <div className="container">
        <h2>Orders</h2>

        <RecordForm handleNewRecord={ this.addNewRecord } />

        <table className="table table-orders">
          <thead>
            <th>ID</th>
            <th>Sender address</th>
            <th>Recipient address</th>
            <th>Status</th>
            <th>Recipient number</th>
          </thead>
          <tbody>
            {
              this.state.records.map((record) => {
                return <Record record={ record }/>;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
