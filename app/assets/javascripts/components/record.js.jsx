class Record extends React.Component {
  constructor(props) {
    super(props);

    this.statusList = this.props.statusList;
    this.updateRecord = this.props.updateRecord;
    this.state = {
      edit: false,
      record: this.props.record
     };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();

    this.setState({
      edit: !this.state.edit
    });
  }

  handleEdit(event) {
    event.preventDefault();

    data = {
      mail_id: this.props.record.mail_id,
      sender_address: this.refs.sender_address.value,
      recipient_address: this.refs.recipient_address.value,
      status: this.refs.status.value,
      phone_num: this.refs.phone_num.value
    }
    console.log(data);

    $.ajax({
      type: 'PUT',
      url: "/records/",
      dataType: 'JSON',
      data: { record: data },
      success: (data) => {
        updated_record = this.state.record;

        for (var prop in updated_record) updated_record[prop] = data[0][prop]

        this.setState({
          edit: false,
          record: updated_record
        });

        this.updateRecord(this.state.record, data);
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  recordDisplayMode() {
    var editBlock;

    if (this.props.record.status !== "Delivered") {
      editBlock = (
        <td><button className="btn btn-default" onClick={ this.handleToggle }>Edit</button></td>
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
        <td><input className="form-control" ref="sender_address" defaultValue={ this.props.record.sender_address } onChange={ this.handleChange } /></td>
        <td><input className="form-control" ref="recipient_address" defaultValue={ this.props.record.recipient_address } onChange={ this.handleChange } /></td>
        <td>
          <select className="form-control" ref="status" defaultValue={ this.props.record.status } onChange={ this.handleChange }>
            {
              this.statusList.map(function(item) {
                return <option>{ item }</option>
              })
            }
          </select>
        </td>
        <td><input className="form-control" ref="phone_num" defaultValue={ this.props.record.phone_num } onChange={ this.handleChange } /></td>
        <td>
          <button className="btn btn-default btn-sm" onClick={ this.handleEdit }>Update</button>
          <button className="btn btn-default btn-sm" onClick={ this.handleToggle }>Cancel</button>
        </td>
      </tr>
    );
  }

  render() {
    return this.state.edit ? this.recordFormMode() : this.recordDisplayMode();
  }
}
