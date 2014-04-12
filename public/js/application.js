$(document).ready(function(){
  domSelectors = {
    addQuestionButton: ".question"
  }

  var view = new View(domSelectors)
  var client = new Client('POST', '/surveys')
  var controller = new Controller(client, view)

  controller.listeners()
});