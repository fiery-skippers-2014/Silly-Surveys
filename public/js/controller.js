function Controller(client, view){
  this.client = client
  this.view = view
}

Controller.prototype = {
  listeners: function(){
    var questionButton = this.view.getQuestionButton()
    $('body').on('click', ".question", this.pingServer.bind(this))
    $('body').on('click', ".submit", this.createQuestion.bind(this))
  },
  pingServer: function(event){
    event.preventDefault()
    this.client.request('get', '/surveys/question/new')
    .done(this.onSuccess.bind(this))
    .fail(this.onFail)
  },
  getCurrentUser: function(event){
    this.client.request('GET', "/users/session-id").done(this.getData.bind(this)).fail(this.onFail)
  },
  // createSurvey: function(event){
  //   event.preventDefault()
  //   var currentUser = this.getCurrentUser()
  //   console.log(currentUser)
  //   return this.client.request('POST','"/users/' + currentUser + '/surveys"').done(this.getData).fail(this.onFail)
  // },
  createQuestion: function(){
    event.preventDefault()
    this.client.request('POST', "/surveys/questions", ".questionForm")
    .done(this.onSuccess.bind(this))
    .fail(this.onFail)
  },
  onSuccess: function(data){
    this.view.placeQuestionField(data)
  },
  getData: function(data, b, c){
    console.log(b)
    console.log(data)
    console.log(c.responseText)
    return c.responseText
  },
  onFail: function() {
    console.log("noooo")
  }
}