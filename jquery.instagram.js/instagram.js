;(function($){
  function createUrl(options){
    // https://www.instagram.com/developer/endpoints/
    var url = 'https://api.instagram.com/v1';
    var data = {};

    if (options.accessToken == null && options.clientId == null) {
      throw '';
    }

    data = $.extend(data, {
      access_token: options.accessToken,
      client_id: options.clientId,
      count: options.count
    });

    if (options.url != null) {
      url = options.url;
    } else if (options.hash != null) {
      url += '/tags/' + options.hash + '/media/recent';
    } else if (options.search != null) {
      url += '/media/search';
      data = $.extend(data, options.search);
    } else if (options.userId != null) {
      if (options.accessToken == null) {
        throw '';
      }
      url += '/users/' + options.userId + '/media/recent';
    } else if (options.location != null) {
      url += '/locations/' + options.location.id + '/media/recent';
      delete options.location.id;
      data = $.extend(data, options.location);
    } else {
      url += '/media/popular';
    }

    return {url: url, data: data}
  }
  $.fn.instagram = function(options){
    var that = this;
    options = $.extend({}, $.fn.instagram.defaults, options);
    var request = createUrl(options);
    $.ajax({
      dataType: "jsonp",
      url: request.url,
      data: request.data,
      success: function(response) {
        that.trigger('didLoadInstagram', response);
      }
    });
    this.trigger('willLoadInstagram', options);
    return this;
  }
  $.fn.instagram.defaults = {
    accessToken: null,
    clientId: null,
    count: null,
    url: null,
    hash: null,
    userId: null,
    location: null,
    search: null
  }
}(jQuery));

$(function(){
  if($('#instagram').size() > 0){
    $('#instagram').bind('didLoadInstagram', function(event, response) {
      var self = $(this);
      createTags(self, response.data);
    });
    $('#instagram').instagram({
      userId: 'self',
      clientId: '',
      accessToken: '',
      count: 5
    });
    function createTags(wrap,data){
      $.each(data,function(key,val){
        var images = $('<img />').attr('src',(val.images.low_resolution.url));
        var a = $('<a>').attr({href:val.link,target:'_blank'}).append(images);
        var div = $('<div>').attr('class', 'instagram-photo').append(a);
        wrap.append(div);
      });
      return wrap;
    }
  }
})