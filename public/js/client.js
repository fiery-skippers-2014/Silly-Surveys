function Client(){
}

Client.prototype = {
  request: function(method, action, resource) {
    var response = $.ajax({
      type: method,
      url: action,
      data: $(resource).serialize(),
      dataType: "text"
    })
    return response
  }
}


