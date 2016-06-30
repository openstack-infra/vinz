import {Component} from 'react';
import template from "./change_log.html.js";

export default class ChangeCommit extends Component {
  render() {
    this.renderTemplate = template.bind(this);
    return this.renderTemplate(this.props);
  }
}