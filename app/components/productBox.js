var React = require('react');
var ShowAddButton = require('./ShowAddButton.js');
var QuestionForm = require('./QuestionForm.js');
var QuestionList = require('./QuestionList.js');
var _ = require('lodash')
var mainApp;

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
require("!style!css!./../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("!style!css!./../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css");

var mainApp = React.createClass({
  getInitialState:function(){
    var questions = [
      {
				key: 1,
				title:'产品经理与程序员矛盾的本质是什么？',
				description:'理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接受来自其他部门的需求，经过设计后交付研发。但这里有好些职责不清楚的地方。',
				voteCount: 10,
			},
			{
				key: 2,
				title:'热爱编程是一种怎样的体验？',
				description:'别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码。',
				voteCount: 8,
			},
    ];

    return{
      questions: questions,
      formDisplayed: false,
    }
  },
  onToggleForm:function(){
    this.setState({
      formDisplayed: !this.state.formDisplayed,
    })
  },
  onNewQuestion:function(newQuestion){
    newQuestion.key = this.state.questions.length + 1;
    // concat 连接多个数组
    var newQuestion = this.state.questions.concat (newQuestion);
    this.setState({
      questions: newQuestion,
    })
  },
  sortQuetion:function(questions){
    questions.sort(function(a,b){
      return b.voteCount - a.voteCount;
    });

    return questions;
  },
  onVote:function(key,newCount){
    // _.uniq() 创建一个数组的一个无重复的版本，使用SameValueZero平等的比较，其中只有每个元素第一次出现被保留
    var questions = _.uniq(this.state.questions);

    // _.findIndex 返回符合 predicate条件的第一个元素的索引
    var index = _.findIndex(questions,function(qst){
      return qst.key == key;
    })

    questions[index].voteCount = newCount;
    console.log(questions[index])
    questions = this.sortQuetion(questions);

    this.setState({
      questions: questions
    })
  },
  render:function(){
    return(
      <div>
        <div className="jumbotron text-center">
          <div className="container">
            <h1>React 问答</h1>
            <ShowAddButton onToggleForm={this.onToggleForm} />
          </div>
        </div>
        <div className="main container">
          <QuestionForm
            onNewQuestion = {this.onNewQuestion}
            onToggleForm = {this.onToggleForm}
            formDisplayed = {this.state.formDisplayed}
            />

          <QuestionList onVote={this.onVote} questions={this.state.questions} />
        </div>
      </div>
    )
  }


})



module.exports = mainApp;
