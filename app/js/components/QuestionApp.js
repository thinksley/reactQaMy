var React=require('react');
var ShowAddButton=require('./ShowAddButton.js');
var QuestionForm=require('./QuestionForm.js');
var QuestionList=require('./QuestionList.js');
var json=require('../data/json');
var _=require('lodash');

module.exports=React.createClass({
	getInitialState:function(){
		var questions=json;
		console.log(questions)
		return{
			questions:questions,
			formDisplayed:false
		}
	},
	onToggleForm:function(){
		this.setState({
			formDisplayed:!this.state.formDisplayed
		})

	},
	onNewQuestion:function(newQuestion){
		newQuestion.key=this.state.questions.length+1;

		var newQuestions=this.state.questions.concat(newQuestion);
		console.log(newQuestions)
		newQuestions=this.sortQuestion(newQuestions);
		
		this.setState({
			questions:newQuestions,
		})
	},
	sortQuestion:function(questions){
		questions.sort(function(a,b){
			return b.voteCount-a.voteCount;
		})
		return questions;
	},
	onVote:function(key,newCount){
		var questions=_.uniq(this.state.questions);
		
		var index=_.findIndex(questions,function(qst){
			return qst.key==key;
		})

		questions[index].voteCount=newCount;
		questions=this.sortQuestion(questions);

		this.setState({
			questions:questions
		})
	},
	render:function(){
		return (

				<div>
					<div className="jumbotron text-center">
					    <div className="container">
					      <h1>React问答</h1>
					      <ShowAddButton onToggleForm={this.onToggleForm} />
					    </div>
					</div>
					<div className="main container">
					  <QuestionForm onNewQuestion={this.onNewQuestion} formDisplayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
					  <QuestionList onVote={this.onVote} questions={this.state.questions} />

					</div>
				</div>		
			)
	}
})