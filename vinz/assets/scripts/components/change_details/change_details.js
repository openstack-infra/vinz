import {Component} from 'react';
import template from "./change_details.html.js";

import ChangeFiles from "./change_files/change_files.js";

export default class ChangeDetails extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      context: {
        owner: ''
      }
    };
  }
  render() {
    this.renderTemplate = template.bind(this);
    return this.renderTemplate(this.state.context);
  }
  componentDidMount() {
    let url = "/api/changes/" + this.props.change +  "/detail?O=404&o=CURRENT_REVISION";
    this.serverRequest = $.getJSON(url, function(result) {
      this.setState({
        context: result
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
}