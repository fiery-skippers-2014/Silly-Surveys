function Ajax(method, action) {
    this.method = method
    this.action = action
}

Ajax.prototype = {
    request: function(form) {
      var response = $.ajax({
        type: this.method,
        url: this.action,
        data: {
            type: form
        } // this is how we pass the survey id to the params hash
        // we are hard coding what serialize does ie using the input names of the form as keys
        // and the values of those names as values in the params hash.
      })
        return response
    },
    onSuccess: function(serverData) {
      // checking the serverData type


      // creating a JS array of the questions from the ruby multi string
      var questions = serverData.split(";")

      //testing one string

      for (var q = 0; q < questions.length; q++) {
          // Sets the index for the div
          var index = q + 1;
          graphNumber = parseInt(index);

          // create the div for the graph
          var graphContainer = document.createElement("div");
          graphContainer.id = 'container';
          graphContainer.className = parseInt(index);
          graphContainer.style.minWidth = "310px";
          graphContainer.style.minHeight = "400px";
          graphContainer.style.margin = "0 auto";

          $(".graphs").append($(graphContainer));




          question_string = questions[q];
          console.log(question_string);

          question = question_string.split(",");
          console.log(question)

          // separating the words from the questions
          words = []
          frequencies = []

          for (var i = 0; i < question.length; i++) {

              // if even ie a word
              if ((i + 2) % 2 == 0) {
                  words.push(question[i]);
              } else {
                  frequencies.push(parseInt(question[i]));
              }

          }
          //  // merging them together
          questionResults = []

          for (var i = 0; i < words.length; i++) {
              questionResults.push([words[i], frequencies[i]]);
          }

          //uploading it to the graph
          $(function() {
              var options = {
                  chart: {
                      plotBackgroundColor: null,
                      plotBorderWidth: null,
                      plotShadow: false
                  },
                  title: {
                      text: 'Question ' + graphNumber
                  },
                  tooltip: {
                      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                  },
                  plotOptions: {
                      pie: {
                          allowPointSelect: true,
                          cursor: 'pointer',
                          dataLabels: {
                              enabled: true,
                              color: '#000000',
                              connectorColor: '#000000',
                              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                          }
                      }
                  },
                  series: [{
                      type: 'pie',
                      name: 'Browser share',
                      data: questionResults

                  }]
              };
              // end of the highchar
              $('#container.' + graphNumber).highcharts(options)
          });

          //end of the for loop

      }

      //  end of the on success method
  },

  onFail: function() {
    console.log("balls")
  }
}

$(document).ready(function() {

  // debug one thing at a time, submit is unique to the form tag
  $('.survey_details').submit(function(event) {
    var form = $(this).attr("id")
    event.preventDefault();
    var ajax = new Ajax('get', '/survey/details')
    ajax.request(form).done(ajax.onSuccess).fail(ajax.onFail)
  })




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


// function to remove the graph divs

function removeGraphs() {
    $('.graphs').empty()
};