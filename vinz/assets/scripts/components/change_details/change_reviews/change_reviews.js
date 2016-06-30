import {Component} from 'react';
import template from "./change_reviews.html.js";

import ReviewBox from "./review_box/review_box.js";

export default class ChangeFiles extends Component {
  render() {
    this.renderTemplate = template.bind(this);
    return this.renderTemplate(this.props);
  }
}