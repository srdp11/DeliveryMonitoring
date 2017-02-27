function getStatusList() {
  return ["This order is awaiting payment",
          "The supplier is processing order",
          "The seller has shipped order",
          "Delivered",
          "Not delivered"];
}

const Operator = (props) => {
  const errorBlock = props.getOperatorRequestStatus() ? "alert alert-danger hide" : "alert alert-danger";

  return(
    <div className="container">
      <h2>Orders</h2>

      <div className={ errorBlock }>
        <strong>Error!</strong> Wrong data format! Please enter a valid data.
      </div>

      <RecordForm addNewRecord={ props.addNewRecord }
                  statusList={ getStatusList() }
                  setOperatorRequestStatus={ props.setOperatorRequestStatus }
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
            props.records.map((record) => {
              return <Record record={ record }
                             statusList={ getStatusList() }
                             refreshOperatorRecord={ props.refreshOperatorRecord }
                             setOperatorRequestStatus={ props.setOperatorRequestStatus }
                             />;
            })
          }
        </tbody>
      </table>
    </div>
  );
}
