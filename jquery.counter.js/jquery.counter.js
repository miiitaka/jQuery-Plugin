;(function($){
  $.fn.counter = function(options){
    var defaults = {
      'start': 0,
      'end': 0,
      'easing': 'swing',
      'duration': 400
    };
    var settings = $.extend( {}, defaults, options );

    return this.each(function(){
      var self = $(this);

      $({count: settings.start}).animate({
        count: settings.end
      },{
        easing: settings.easing,
        duration: settings.duration,
        step: function() {
          self.text(Math.ceil(this.count));
        }
      });
    });
  };
}(jQuery));