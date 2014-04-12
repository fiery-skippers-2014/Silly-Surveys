function Controller(client, view){
  this.client = client
  this.view = view
}

Controller.prototype = {
  listeners: function(){
    var questionButton = this.view.getQuestionButton()
    $('body').on('click', ".question", this.pingServer.bind(this))
    $('body').on('click', ".submit", function(){
      event.preventDefault()
      var client = new Client('POST', "/charles")
      $.ajax({
        type: 'POST',
        url: '/charles',
        data:$(".questionForm").serialize()
      })
      .done(this.onSuccess.bind(this))
      .fail(this.onFail)
    }.bind(this))
  },
  pingServer: function(event){
    event.preventDefault()
    this.client.request()
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