import {Component} from 'react';
import template from "./review_box.html.js";

export default class ReviewBox extends Component {
  render() {
    this.renderTemplate = template.bind(this);
    return this.renderTemplate(this.props);
  }
}