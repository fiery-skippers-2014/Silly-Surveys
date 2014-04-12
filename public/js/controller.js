function Controller(client, view){
  this.client = client
  this.view = view
}

Controller.prototype = {
  listeners: function(){
    var questionButton = this.view.getQuestionButton()
    questionButton.addEventListener('click', this.pingServer.bind(this), false)
  },
  pingServer: function(event){
    event.preventDefault()
    this.client.request("question")
    .done(this.onSuccess.bind(this))
    .fail(this.onFail)
  },
  onSuccess: function(data){
    this.view.placeQuestionField(data)
  },
  onFail: function() {
    console.log("noooo")
  }
}