


$(document).ready(function(){
  domSelectors = {
    addQuestionButton: ".question"
  }

  var view = new View(domSelectors)
  var client = new Client('get', '/surveys/question/new')
  var controller = new Controller(client, view)
  controller.listeners()

});