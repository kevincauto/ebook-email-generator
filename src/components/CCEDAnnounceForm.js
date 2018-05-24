import React from 'react';

const FIELDS = [
  { label: 'Email Name', name: 'emailName' },
  { label: 'eBook Title', name: 'ebookTitle' },
  { label: 'First CE Title', name: 'title1' },
  { label: 'First Author', name: 'author1' },
  { label: 'First Provider', name: 'provider1' },
  { label: 'Second CE Title', name: 'title2' },
  { label: 'Second Author', name: 'author2' },
  { label: 'Second Provider', name: 'provider2' },
  { label: 'Link', name: 'link' },
  { label: 'Ebook Image Source Link', name: 'img' },
  { label: 'Sponsor Name', name: 'sponsor' },
  { label: 'Sponsor Image Source Link', name: 'sponsorImg' }
];

export default class CCEDAnnounceForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(e) {
    this.props.onDateChange(e.target.value, e.target.name);
  }

  handleTextChange(e) {
    this.props.onTextChange(e.target.value, e.target.name);
  }

  renderForm() {
    return FIELDS.map(field => {
      return (
        <div
          className="label"
          key={field.name}
        >
          <input
            type="text"
            placeholder={field.label}
            name={field.name}
            value={this.props.info[this.props.info.selected_template][field.name]}
            onChange={this.handleTextChange}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="form">
        <h3>2. Complete the information below.</h3>
        <div className="label">
          <select
            name="unsubscribe"
            value={this.props.info[this.props.info.selected_template].list}
            onChange={this.handleTextChange}
            fullWidth={true}
          >
            <option value="">Select an Email List  </option>
            <option value="%%PLUGIN_UNSUBSCRIBE: 1654490-UNSUBSCRIBE%%">ID eBook List</option>
            <option value="%%PLUGIN_UNSUBSCRIBE: 2145850-UNSUBSCRIBE%% ">IDT eBook List</option>
            <option value="%%PLUGIN_UNSUBSCRIBE: 2141821-UNSUBSCRIBE%%">CCED eBook List</option>
            <option value="%%PLUGIN_UNSUBSCRIBE: 1635405-UNSUBSCRIBE%%">CDEW eBook List</option>
          </select>
        </div>
        <div id="month-dropdown" className="label">
          <select
            name="month"
            value={this.props.info.month}
            onChange={this.handleDateChange}
          >
            <option value="1">Send Month: January</option>
            <option value="2">Send Month: February</option>
            <option value="3">Send Month: March</option>
            <option value="4">Send Month: April</option>
            <option value="5">Send Month: May</option>
            <option value="6">Send Month: June</option>
            <option value="7">Send Month: July</option>
            <option value="8">Send Month: August</option>
            <option value="9">Send Month: September</option>
            <option value="10">Send Month: October</option>
            <option value="11">Send Month: November</option>
            <option value="12">Send Month: December</option>
          </select>
        </div>
        <div id="year-dropdown" className="label">
          <select
            name="year"
            value={this.props.info.year}
            onChange={this.handleDateChange}
          >
            <option value="2018">Send Year: 2018</option>
            <option value="2019">Send Year: 2019</option>
            <option value="2020">Send Year: 2020</option>
            <option value="2021">Send Year: 2021</option>
            <option value="2022">Send Year: 2022</option>
          </select>
        </div>
        {this.renderForm()}
      </div>
    )
  }
}


