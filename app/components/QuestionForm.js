var React = require('react');

module.exports = React.createClass({
  handleForm:function(e){
    e.preventDefault();
    if(!this.refs.title.value) return;

    var newQuestion = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      voteCount: 0,
    }

    // reset()HTML方法，重置为默认值,PS:只有表单能用,在比如input标签就不能使用，会报错
    this.refs.addQuestionFrom.reset();
    this.props.onNewQuestion(newQuestion);
  },
  render:function(){
    var styleObj={
      display:this.props.formDisplayed ? 'block':'none',
    }

    return(
      <form ref="addQuestionFrom" style={styleObj}
            name="addQuestion" className="clearfix"
            onSubmit={this.handleForm}>
            <div className="form-group">
              <label htmlFor="qtitle">问题</label>
              <input ref="title" type="text" className="form-control" id="qtitle" placeholder="您的问题标题" />
            </div>
            <textarea ref="description" className="form-control" placeholder="问题的描述"></textarea>
            <button className="btn btn-success pull-right">确认</button>
            <a className="btn btn-default pull-right" onClick={this.props.onToggleForm}>取消</a>
      </form>
    )
  }

})
