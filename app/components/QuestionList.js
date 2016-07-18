var React = require('react');
var QuestionItem = require('./QuestionItem.js');

module.exports = React.createClass({
  render : function () {
    var questions = this.props.questions;
    if ( !Array.isArray(questions)) throw new Error('this.props.questions问题必须是数组');
    // 这里的bind是为了map出来的元素能绑定到事件上，不用bind可能会无法响应事件
    var questionComps = questions.map(function(qst){
      return <QuestionItem key = {qst.key}
                           questionKey = {qst.key}
                           title = {qst.title}
                           description = {qst.description}
                           voteCount = {qst.voteCount}
                           onVote = {this.props.onVote}
                           />
    }.bind(this));

    return (
      <div id="quesionts" className="">
        {questionComps}
      </div>
    )
  }
})
