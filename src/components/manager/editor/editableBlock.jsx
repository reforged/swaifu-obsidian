import React from 'react'
import ContentEditable from "react-contenteditable";

class EditableBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      previousKey: ""
    };
  }

  onKeyDownHandler(e) {
    if (e.key === "/") {
      this.setState({ htmlBackup: this.state.html });
    }
    if (e.key === "Enter") {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this.props.addBlock({
          id: this.props.id,
          ref: this.contentEditable.current
        });
      }
    }
    if (e.key === "Backspace" && !this.state.html) {
      e.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current
      });
    }
    this.setState({ previousKey: e.key });
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prevProps, prevState) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    if (htmlChanged || tagChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag
      });
    }
  }

  onChangeHandler(e) {
    this.setState({ html: e.target.value });
  }

  render() {
    return (
      <ContentEditable
        className="Block"
        innerRef={this.contentEditable}
        html={this.state.html}
        tagName={this.state.tag}
        onChange={this.onChangeHandler}
        onKeyDown={this.onKeyDownHandler}
      />
    );
  }
}

export default EditableBlock;