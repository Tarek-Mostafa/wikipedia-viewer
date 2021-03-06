$(".form-group").submit(function(e) {
  e.preventDefault();

  // Get input value
  var search_input = $(this).find('.search_input').val();

  // empty container before searching
  var container = $(".all_queries");
  container.html('');

  // empty container and search input when close icon clicked
  $('.close').on('click', function() {
    container.html('');
    $('.search_input').val("");
  });

  // Search Limit
  var searchLimit = 10;

  // Get data from wikipedia api
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search_input + "&limit=" + searchLimit + "&namespace=0&format=json",
    dataType: "jsonp",
    cache: false,
    header: {
      'Api-User-Agent': 'Example/1.0'
    },
    success: function(data) {
      // get user input       
      var userInput = $("input").val();
      for (var i = 0; i < searchLimit; i++) {
        // checking for valid input
        if (data[1].length != 0) {
          var pageTitle = data[1][i];
        } else {
          $(".all_queries").append('<p style="color: #fff; text-align: center;">"'+userInput+'" wasn\'t found</p>')
          return false;
        }
        
        var contentSnippet = data[2][i];
        var pageUrl = data[3][i];
        
        $(".all_queries").append("<div class='query'><div id='title'><a href='" + pageUrl + "' target='_blank'>" + pageTitle + "</a></div><div id='content'>" + contentSnippet + "</div></div>");
      }
    }
  });
});