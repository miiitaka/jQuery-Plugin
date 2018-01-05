;(function($){
  "use strict";

  /**
   * Instagram API Settings
   * @param options
   * @returns {instagramApi}
   */
  function instagramApi(options) {
    var defaults = {
      accessToken: null,
      clientId: null,
      count: 5,
      endPointType: "users",
      endPoint: {
        User: {
          userId: "self",
          media: false,
          recent: false,
          liked: false,
          search: null
        }
      },
      url: "https://api.instagram.com/v1/",
    },
    settings = $.extend({}, defaults, options),
    request = createParam(settings);

    $.ajax({
      type: "GET",
      dataType: "json",
      url: request.url,
      data: request.data
    })
    .done(function(data) {
      console.log(data);
    })
    .fail(function(data) {
      console.log(data);
    });
  }

  /**
   * End Point Type switch
   *
   * @param settings
   * @returns {{url: string, data: *}}
   */
  function createParam(settings){
    var response = {};

    switch (settings.endPointType) {
      case "users":
        response = endPointUser(settings);
        break;
    }
    return response;
  }

  function endPointUser(settings) {

  }

  /**
   * Instagram API Param Settings
   */
  $(function() {
    var response = instagramApi({
      accessToken: ""
    });

    console.log(response);
  });
}(jQuery));