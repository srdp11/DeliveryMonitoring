function collapseRow(record, status_list, is_opened) {
  var collapseClass = is_opened ? "collapse in" : "collapse";

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
          { statusListCollapse(status_list, record.mail_id) }
        </div>
      </div>
    </div>
  );
}

function statusListCollapse(status_list, mail_id) {
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

const ClientProfile = (props) => {
  var records = props.records;

  const firstElement = records.find(x => x.mail_id == props.mail_id);
  records = records.filter(x => x != firstElement);
  records.unshift(firstElement);

  return (
    <div className="container">
      <div className="prof-block">
        <h3>Phone: { props.getPhoneNum() }</h3>

        <button className="btn btn-xs btn-primary btn-out" onClick={ (event) => props.onSignout(event) }>Sign out</button>
      </div>

      <h3>Orders:</h3>

      {
        records.map((record) => {
          return collapseRow(record, props.status_list[record.mail_id], props.mail_id == record.mail_id);
        })
      }
    </div>
  );
}
