function Client(method, action){
  this.method = method
  this.action = action
}

Client.prototype = {
  request: function(resource) {
    var response = $.ajax({
      type: this.method,
      url: this.action,
      data: { type: resource }
    })
    return response
  }
}


