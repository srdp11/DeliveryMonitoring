class Operator extends React.Component {
  getStatusList() {
    return ["This order is awaiting payment",
            "The supplier is processing order",
            "The seller has shipped order",
            "Delivered",
            "Not delivered"];
  }

  render() {
    const errorBlock = this.props.getOperatorRequestStatus() ? "alert alert-danger hide" : "alert alert-danger";

    return(
      <div className="container">
        <h2>Orders</h2>

        <div className={ errorBlock }>
          <strong>Error!</strong> Wrong data format! Please enter a valid data.
        </div>

        <RecordForm handleNewRecord={ this.props.addNewRecord }
                    statusList={ this.getStatusList() }
                    setOperatorRequestStatus={ this.props.setOperatorRequestStatus }
                    getOperatorRequestStatus={ this.props.getOperatorRequestStatus }
                    />

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
              this.props.records.map((record) => {
                return <Record record={ record }
                               statusList={ this.getStatusList() }
                               updateRecord={ this.props.updateRecord }
                               setOperatorRequestStatus={ this.props.setOperatorRequestStatus }
                               getOperatorRequestStatus={ this.props.getOperatorRequestStatus }
                               getEditStatus={ this.props.getEditStatus }
                               />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
