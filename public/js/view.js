function View(selectors){
  this.addQuestionButton = selectors["addQuestionButton"]
  this.addAnswerButton   = selectors["addAnswerButton"]
  this.submitFormButton  = selectors["submitFormButton"]
}

View.prototype = {
  getQuestionButton: function(){
    return document.querySelector(this.addQuestionButton)
  },
  getAnswerButton: function(){
    return document.querySelector(this.addAnswerButton)
  },
  getSubmitFormButton: function(){
    return document.querySelector(this.submitFormButton)
  },
  placeQuestionField: function(question){
    var form = document.querySelector("form")
    $(form).after(question)
  }
}