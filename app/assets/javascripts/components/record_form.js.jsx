class RecordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.statusList[0]
    };
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
        this.props.addNewRecord(data);
        this.props.updateRecord(this.state, data)
        this.refs.form.reset();
        this.props.setOperatorRequestStatus(true);
        this.props.refreshClientInfo();
      },
      error: (xhr, status, err) => {
        this.props.setOperatorRequestStatus(false);
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
          <input className="form-control" name="mail_id" onChange={ (event) => this.handleChange(event) } />
        </div>

        <div className="info-block">
          <label>Sender address</label>
          <input className="form-control" name="sender_address" onChange={ (event) => this.handleChange(event)} />
        </div>

        <div className="info-block">
          <label>Recipient address</label>
          <input className="form-control" name="recipient_address" onChange={ (event) => this.handleChange(event) } />
        </div>

        <div className="info-block">
          <label>Status</label>
          <select className="form-control" name="status" onChange={ (event) => this.handleChange(event) }>
            {
              this.props.statusList.map(function(item) {
                return <option>{ item }</option>
              })
            }
          </select>
        </div>

        <div className="info-block">
          <label>Recipient number</label>
          <input className="form-control" name="phone_num" onChange={ (event) => this.handleChange(event) } />
        </div>

        <div className="info-block">
          <button type="button" onClick={ (event) => this.handleSubmit(event) } className="btn btn-primary btn-sbm">Create record</button>
        </div>
      </form>
    );
  }
}
