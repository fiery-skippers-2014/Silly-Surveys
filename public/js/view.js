function View(selectors){
  this.addQuestionButton = selectors["addQuestionButton"]
  this.submitQuestionButton  = selectors["submitQuestionButton"]
  this.questionCreationCell  = selectors["questionCreationCell"]
  this.saveFormButton = selectors["saveFormButton"]
  this.surveyTitle = selectors["surveyTitle"]
}

View.prototype = {
  getQuestionButton: function(){
    return document.querySelector(this.addQuestionButton)
  },
  getAnswerButton: function(){
    return document.querySelector(this.addAnswerButton)
  },
  getSubmitFormButton: function(){
    return document.querySelector(this.submitQuestionButton)
  },
  placeNode: function(data, target){
    $(target).append(data)
  },
  slideQuestionUp: function() {
    $(this.questionCreationCell).slideUp("slow", this.emptyElement)
  },
  slideQuestionDown: function(){
    $(this.questionCreationCell).slideDown()
  },
  emptyElement: function() {
    $(this).empty()
  },
  getSurveyTitle: function(){
    return $(this.surveyTitle)
  }
}