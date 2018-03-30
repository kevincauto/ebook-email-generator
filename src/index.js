import React from 'react';
import ReactDOM from 'react-dom';
// import _ from 'lodash';
import './index.css';

import IDtyForm from './components/IDtyForm';
import IDtyHTML from './components/IDtyHTML';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_template: 'id_ty',
      month: undefined,
      year: undefined,
      id_ty: {},
      idt_ty: {},
      cced_ty: {},
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    //Auto detect the month and year for the url.  
    let d = new Date();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    this.setState({ month, year });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleDateChange(value, name) {
    this.setState({ [name]: value });
  }

  handleTextChange(value, name, html) {
    this.setState({
      [this.state.selected_template]: {
        ...this.state[this.state.selected_template],
        [name]: value,
        html: html
      }
    });
  }

  handleTemplateChange(template) {
    //create a blank object for the template if it does not exist
    if (!this.state[template]) {
      this.setState({ template: {} });
    }
    this.setState({ selected_template: template });
  }

  render() {
    return (
      <div id="container">
        <Form
          info={this.state}
          onTextChange={this.handleTextChange}
          onTemplateChange={value => this.handleTemplateChange(value)}
          onDateChange={this.handleDateChange}
        />
        <TextResults info={this.state} />
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(value, name) {
    this.props.onDateChange(value, name)
  }

  handleTextChange(value, name, html) {
    this.props.onTextChange(value, name, html);
  }

  handleTemplateChange(e) {
    this.props.onTemplateChange(e.target.value);
  }

  render() {
    let displayForm;
    if (this.props.info.selected_template === 'id_ty') {
      displayForm = (
        <IDtyForm
          info={this.props.info}
          onTextChange={this.handleTextChange}
          onDateChange={this.handleDateChange}
        />
      );
    }


    return (
      <div id="main-form">
        <h3>1. Select an email template.</h3>
        <select
          value={this.props.info.selected_template}
          onChange={this.handleTemplateChange}
        >
          <option value="">Select an Email Template</option>
          <option value="id_ty">ID Thank You Email</option>


        </select>

        {displayForm}
      </div>
    );
  }
}

class TextResults extends React.Component {
  render() {
    let htmlDisplay = "Nothing to display right now.";
    if (this.props.info.selected_template === 'id_ty') { htmlDisplay = <IDtyHTML info={this.props.info} /> }

    return (
      <div id="text-results">
        {htmlDisplay}
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));

