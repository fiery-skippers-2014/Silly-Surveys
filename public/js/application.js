$(document).ready(function(){
  domSelectors = {
    addQuestionButton: ".question",
    submitFormButton: ".submit",
    questionCreationCell: ".questionCreation",
    saveFormButton: ".saveFormButton",
    surveyTitle: ".title"
  }

  var view = new View(domSelectors)
  var client = new Client()
  var controller = new Controller(client, view)
  controller.listeners()

});