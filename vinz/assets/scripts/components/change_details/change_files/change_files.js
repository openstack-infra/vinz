import {Component} from 'react';
import template from "./change_files.html.js";

import FileBar from "./file_bar/file_bar.js";

export default class ChangeFiles extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      files: {'foo': 'bar'}
    };
  }
  render() {
    this.renderTemplate = template.bind(this);
    return this.renderTemplate(this.state, this.props);
  }
  componentDidMount() {
    let url = "/api/changes/" + this.props.change +  "/revisions/" + this.props.revision + "/files";
    this.serverRequest = $.getJSON(url, function(result) {
      this.setState({
        files: result
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
}