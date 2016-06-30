import {Component} from 'react';
import template from "./change_commit.html.js";

export default class ChangeCommit extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      context: {
        message: ''
      }
    };
  }
  render() {
    this.renderTemplate = template.bind(this);
    return this.renderTemplate(this.state.context);
  }
  componentDidMount() {
    let url = "/api/changes/" + this.props.change +  "/revisions/" + this.props.revision + "/commit?links";
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