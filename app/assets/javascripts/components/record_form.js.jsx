class RecordForm extends React.Component {
  constructor(props) {
    super(props);

    this.statusList = this.props.statusList;
    this.handleNewRecord = this.props.handleNewRecord;
    this.setReqStatus = this.props.setReqStatus;
    this.getReqStatus = this.props.getReqStatus;

    this.state = { status: this.statusList[0] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/records/',
      data: { record: this.state },
      success: (data) => {
        this.handleNewRecord(data);
        this.refs.form.reset();
        this.setReqStatus(true);
      },
      error: (xhr, status, err) => {
        this.setReqStatus(false);
        console.error(this.props.url, status, err.toString());
        this.refs.form.reset();
      }
    });
  }

  render() {
    return (
      <form ref="form" className="add-form form-inline">
        <div className="info-block">
          <label>ID</label>
          <input className="form-control" name="mail_id" onChange={ this.handleChange } />
        </div>

        <div className="info-block">
          <label>Sender address</label>
          <input className="form-control" name="sender_address" onChange={ this.handleChange } />
        </div>

        <div className="info-block">
          <label>Recipient address</label>
          <input className="form-control" name="recipient_address" onChange={ this.handleChange } />
        </div>

        <div className="info-block">
          <label>Status</label>
          <select className="form-control" name="status" onChange={ this.handleChange }>
            {
              this.statusList.map(function(item) {
                return <option>{ item }</option>
              })
            }
          </select>
        </div>

        <div className="info-block">
          <label>Recipient number</label>
          <input className="form-control" name="phone_num" onChange={ this.handleChange } />
        </div>

        <div className="info-block">
          <button type="button" onClick={ this.handleSubmit } className="btn btn-primary btn-sbm">Create record</button>
        </div>
      </form>
    );
  }
}
