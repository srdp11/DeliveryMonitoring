class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_record: false
    }
  }

  switchMode() {
    this.setState({
      edit_record: !this.state.edit_record
    });
  }

  updateRecord(event) {
    event.preventDefault();

    data = {
      mail_id: this.props.record.mail_id,
      sender_address: this.refs.sender_address.value,
      recipient_address: this.refs.recipient_address.value,
      status: this.refs.status.value,
      phone_num: this.refs.phone_num.value
    }

    $.ajax({
      type: 'PUT',
      url: "/records/",
      dataType: 'JSON',
      data: { record: data },
      success: (data) => {
        updated_record = this.props.record;

        for (var prop in updated_record) updated_record[prop] = data[0][prop]

        this.props.setOperatorRequestStatus(true);
        this.props.refreshOperatorRecord(updated_record);
        this.switchMode();
      },
      error: (xhr, status, err) => {
        this.props.setOperatorRequestStatus(false);
        this.switchMode();
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  recordDisplayMode() {
    var editBlock;

    if (this.props.record.status !== "Delivered") {
      editBlock = (
        <td><button className="btn btn-default" onClick={ (event) => this.switchMode() }>Edit</button></td>
      )
    }
    else {
      editBlock = (
        <td></td>
      )
    }

    return(
      <tr>
        <td><span className="record-info">{ this.props.record.mail_id }</span></td>
        <td><span className="record-info">{ this.props.record.sender_address }</span></td>
        <td><span className="record-info">{ this.props.record.recipient_address }</span></td>
        <td><span className="record-info">{ this.props.record.status }</span></td>
        <td><span className="record-info">{ this.props.record.phone_num }</span></td>
        { editBlock }
      </tr>
    );
  }

  recordFormMode() {
    return(
      <tr>
        <td><span className="record-info" ref="mail_id">{ this.props.record.mail_id }</span></td>
        <td><input className="form-control" ref="sender_address" defaultValue={ this.props.record.sender_address } /></td>
        <td><input className="form-control" ref="recipient_address" defaultValue={ this.props.record.recipient_address } /></td>
        <td>
          <select className="form-control" ref="status" defaultValue={ this.props.record.status }>
            {
              this.props.statusList.map(function(item) {
                return <option>{ item }</option>
              })
            }
          </select>
        </td>
        <td><input className="form-control" ref="phone_num" defaultValue={ this.props.record.phone_num } /></td>
        <td>
          <button className="btn btn-default btn-sm" onClick={ (event) => this.updateRecord(event) }>Update</button>
          <button className="btn btn-default btn-sm" onClick={ (event) => this.switchMode() }>Cancel</button>
        </td>
      </tr>
    );
  }

  render() {
    return this.state.edit_record ? this.recordFormMode() : this.recordDisplayMode();
  }
}
