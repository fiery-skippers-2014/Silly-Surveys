function Controller(client, view){
  this.client = client
  this.view = view
}

//||||||||||||
// Listeners
//||||||||||||
Controller.prototype = {
  listeners: function(){
    $('body').on('click', ".question", this.pingServer.bind(this))
    $('body').on('click', ".submit", this.createQuestion.bind(this))
    $('body').on('click', ".saveFormButton", this.saveSurvey.bind(this))
  },
//||||||||||||
// Ajax requests
//||||||||||||
  pingServer: function(event){
    event.preventDefault()
    this.client.request('get', '/surveys/question/new')
    .done(this.placeQuestionForm.bind(this))
    .fail(this.onFail)
  },
  createQuestion: function(){
    event.preventDefault()
    this.client.request('POST', "/surveys/questions", ".questionForm")
    .done(this.placeSaveForm.bind(this))
    .fail(this.onFail)
  },
  saveSurvey: function(){
    var thing = this.view.getSurveyTitle().selector
    this.client.request('POST', "/surveys", thing).done(this.survey)
  },
//||||||||||||
// Callbacks
//||||||||||||
  placeQuestionForm: function(data){
    this.view.placeNode(data, ".questionCreation")
    this.view.slideQuestionDown()
  },
  placeSaveForm: function(data){
    this.view.placeNode(data, ".saveForm")
    this.view.slideQuestionUp()
  },
  survey: function(data){
    console.log(data)
  },
  onFail: function() {
    console.log("noooo")
  }
}