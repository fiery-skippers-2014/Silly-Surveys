
function Ajax(method, action){
  this.method = method
  this.action = action
}

Ajax.prototype = {
  request: function(form){



    var response = $.ajax({
      type: this.method,
      url: this.action,
      data: { type: form } // this is how we pass the survey id to the params hash
     // we are hard coding what serialize does ie using the input names of the form as keys
     // and the values of those names as values in the params hash.
    })

    return response

  },

  onSuccess: function(serverData){
     console.log("lala");

     // creating the container for the graph
     // var graphContainer = document.createElement("div");
     // graphContainer.id = 'container';
     // graphContainer.style.minWidth = "310px";
     // graphContainer.style.minHeight = "400px";
     // graphContainer.style.margin = "0 auto";


     //appends the newly created div
    // $(".graphs").append($(graphContainer));




     // checking the serverData type
     console.log(typeof serverData)
     // console.log(serverData)

     // creating a JS array of the questions from the ruby multi string
     var questions = serverData.split(";")
       console.log(questions);
       console.log(questions.length)

       //testing one string

       for (var q = 0; q < questions.length ; q++) {
                         // Sets the index for the div
                         var index = q+1;
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

                   for (var i = 0; i <question.length ; i++) {

                         // if even ie a word
                        if((i+2)%2==0) {
                          words.push(question[i]);
                        }
                        else {
                          frequencies.push(parseInt(question[i]));
                        }

                   }


                   //printing them out for testing purposes
                   console.log(words);
                   console.log(frequencies);

                  //  // merging them together
                   questionResults = []

                   for (var i = 0; i < words.length; i++) {
                        questionResults.push([words[i],frequencies[i]]);
                   }

                  console.log(questionResults);




                   // console.log(numbers)
                   // console.log(serverData.length);

                 //uploading it to the graph
                              $(function () {
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
                                      data:   questionResults

                                  }]
                              };
                           // end of the highchar
                            $('#container.'+graphNumber).highcharts(options)
                          });

      //end of the for loop

    }

  //  end of the on success method
   },

  onFail: function(){
    console.log("balls")
  }
}





$(document).ready(function(){

       // debug one thing at a time, submit is unique to the form tag
  $('.survey_details').submit(function(event){
        console.log(this)
       // when an event fires its specific to its trigger
       // this would be a dom element but $() converts it to a jquery object
     var form = $(this).attr("id")

    console.log(form)
    console.log(event)

   event.preventDefault();
   var ajax = new Ajax('get','/survey/details')
   ajax.request(form).done(ajax.onSuccess).fail(ajax.onFail)

   // testing to see what the alert does


  })




  domSelectors = {
    addQuestionButton: ".question"
  }

  var view = new View(domSelectors)
  var client = new Client()
  var controller = new Controller(client, view)
  controller.listeners()


});


// function to remove the graph divs
 function removeGraphs(){ $('.graphs').empty()};