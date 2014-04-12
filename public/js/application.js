


$(document).ready(function(){
  domSelectors = {
    addQuestionButton: ".question"
  }

  var view = new View(domSelectors)
  var client = new Client()
  var controller = new Controller(client, view)
  controller.listeners()

});