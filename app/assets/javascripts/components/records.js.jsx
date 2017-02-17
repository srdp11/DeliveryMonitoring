class Records extends React.Component {
  constructor(props) {
    super(props);

    this.statusList = ["This order is awaiting payment",
                       "The supplier is processing order",
                       "The seller has shipped order",
                       "Delivered",
                       "Not delivered"];

    this.addNewRecord = this.addNewRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);

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

  updateRecord(record, data) {
    idx = this.state.records.indexOf(record);
    records = this.state.records;
    records.splice(idx, 1, record);
    this.setState({ records: records });
  }

  render() {
    return(
      <div className="container">
        <h2>Orders</h2>

        <RecordForm handleNewRecord={ this.addNewRecord } statusList={ this.statusList } />

        <table className="table table-orders">
          <thead>
            <th>ID</th>
            <th>Sender address</th>
            <th>Recipient address</th>
            <th>Status</th>
            <th>Recipient number</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {
              this.state.records.map((record) => {
                return <Record record={ record } statusList={ this.statusList } updateRecord={ this.updateRecord } />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
