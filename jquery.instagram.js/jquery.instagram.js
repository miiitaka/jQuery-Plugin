;(function($){
  "use strict";

  $.fn.instagram = function(options){
    var defaults = {
      accessToken: null,
      clientId: null,
      count: 5,
      url: "https://api.instagram.com/v1/",
      hash: null,
      userId: "self",
      location: null,
      search: null
    },
    settings = $.extend({}, defaults, options),
    request = createUrl(settings);

    $.ajax({
      dataType: "json",
      url: request.url,
      data: request.data,
      success: function(response) {
        //console.log(response);
      }
    });

    return this;
  };

  function createUrl(options){
    var url = "https://api.instagram.com/v1";

    if (options.url != null) {
      url = options.url;
    } else if (options.hash != null) {
      url += "/tags/" + options.hash + "/media/recent";
    } else if (options.search != null) {
      url += "/media/search";
    } else if (options.userId != null) {
      url += "/users/" + options.userId + "/media/recent";
    } else if (options.location != null) {
      url += "/locations/" + options.location.id + "/media/recent";
    } else {
      url += "/media/popular";
    }

    return {url: url, data: data}
  }
}(jQuery));

$(function() {
  var data = instagram({
    accessToken: "4786756916.6d7757a.a7f89817fe2b434f8d5d91201458abaa"
  });
  console.log(data)
});