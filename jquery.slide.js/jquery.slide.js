;(function($){
  $.fn.slide = function(options){
    var defaults = {
      'speed': 500
    };
    var settings = $.extend( {}, defaults, options );

    return this.each(function(){
      $(this).on('click', function(){
        $(this).next().not(':animated').slideToggle(settings.speed);
      });
    });
  };
}(jQuery));