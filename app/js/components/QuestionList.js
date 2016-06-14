var React=require('react');
var QuestionItem=require('./QuestionItem.js')
module.exports=React.createClass({

	render:function(){
		var questions=this.props.questions;
		var qustionComps=questions.map(function(qst){
			return <QuestionItem key={qst.key}
					   questionKey={qst.key}
					   title={qst.title}
					   description={qst.description} 
					   voteCount={qst.voteCount}
					   onVote={this.props.onVote}
					   />
		}.bind(this))

		return (
				<div id="questions" className="">
				  
					
					{qustionComps}
				</div> 
			)
	}
})