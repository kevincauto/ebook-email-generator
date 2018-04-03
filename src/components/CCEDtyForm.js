import React from 'react';

const FIELDS = [
  { label: 'Title', name: 'title' },
  { label: 'Link', name: 'link' },
  { label: 'Ebook Image Source Link', name: 'img' },
  { label: 'Sponsor Image Source Link', name: 'sponsorImg' }
];

export default class CCEDtyForm extends React.Component {
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
        {this.renderForm()}
      </div>
    )
  }
}


