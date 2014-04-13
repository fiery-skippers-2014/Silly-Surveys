
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

     // checking the serverData type
     console.log(typeof serverData)
     console.log(serverData)

     // creating a JS array from the ruby string
     var numbers = serverData.split(",")
       console.log(numbers);

     // separating the words from the questions
    words = []
    frequencies = []

     for (var i = 0; i <numbers.length ; i++) {

           // if even ie a word
          if((i+2)%2==0) {
            words.push(numbers[i]);
          }
          else {
            frequencies.push(parseInt(numbers[i]));
          }

     }


     //printing them out for testing purposes
     console.log(words);
     console.log(frequencies);

     // merging them together
     questionResults = []

     for (var i = 0; i < words.length; i++) {
          questionResults.push([words[i], frequencies[i]]);
     }

    console.log(questionResults);




     // console.log(numbers)
     // console.log(serverData.length);

   //uploading it to the graph
                $(function () {
                $('#container').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'Browser market shares at a specific website, 2010'
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
                        //   [
                        //     ['first',   numbers[0]],
                        //     ['duplicate answer',  numbers[numbers.lastIndexOf(2) - 1]],
                        //     ['duplicate answer',    numbers[numbers.lastIndexOf(2)]],
                        //     ['another question',     numbers[1]],
                        //     ['another question',   numbers[2]]
                        // ]
                    }]
                });
            });

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

  })


// $(function () {
//     $('#container').highcharts({
//         chart: {
//             plotBackgroundColor: null,
//             plotBorderWidth: null,
//             plotShadow: false
//         },
//         title: {
//             text: 'Browser market shares at a specific website, 2010'
//         },
//         tooltip: {
//           pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     color: '#000000',
//                     connectorColor: '#000000',
//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//                 }
//             }
//         },
//         series: [{
//             type: 'pie',
//             name: 'Browser share',
//             data: [
//                 ['Firefox',   45.0],
//                 ['IE',       26.8],
//                 {
//                     name: 'Chrome',
//                     y: 12.8,
//                     sliced: true,
//                     selected: true
//                 },
//                 ['Safari',    8.5],
//                 ['Opera',     6.2],
//                 ['Others',   0.7]
//             ]
//         }]
//     });
// });





  domSelectors = {
    addQuestionButton: ".question"
  }

  var view = new View(domSelectors)
  var client = new Client()
  var controller = new Controller(client, view)
  controller.listeners()


});