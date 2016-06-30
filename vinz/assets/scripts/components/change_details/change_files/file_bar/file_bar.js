import {Component} from 'react';
import template from "./file_bar.html.js";

export default class FileBar extends Component {
  render() {
    let context = {
      added: parseInt(this.props.added || 0, 10),
      subtracted:  parseInt(this.props.subtracted || 0, 10)
    };

    let total = context.added + context.subtracted;
    let added_percentage = (context.added/total)*100;
    let subtracted_percentage = (context.subtracted/total)*100;

    // Set up styles
    context.addedStyle = {
      width: added_percentage + '%'
    };

    context.subtractedStyle = {
      width: subtracted_percentage + '%'
    };

    this.renderTemplate = template.bind(this);
    return this.renderTemplate(context);
  }
}