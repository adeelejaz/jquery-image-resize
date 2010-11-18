(function( $ ) {

  $.fn.aeImageResize = function( params ) {

    // We cannot do much unless we have one of these
    if ( !params.height && !params.width ) {
      return this;
    }

    var mathFloor = Math.floor
      ,	browser = $.browser
      ,	isIE6 = browser.msie && (parseInt(browser.version) == 6)
      ,	aspectRatio = 0
      ;

    // Calculate aspect ratio now, if possible
    if ( params.height && params.width ) {
      aspectRatio = params.width / params.height;
    }

    // Attach handler to load
    // Handler is executed just once per element
    // Load event required for Webkit browsers
    return this.one( "load", function() {

      // Remove all attributes and CSS rules
      this
        .removeAttr( "height" )
        .removeAttr( "width" )
        .css({
          height: "",
          width: ""
        });

      var imgHeight = this.height
        ,	imgWidth = this.width
        ,	imgAspectRatio = imgWidth / imgHeight
        ,	bxHeight = params.height
        ,	bxWidth = params.width
        ,	bxAspectRatio = aspectRatio;
				
      // Work the magic!
      // If one parameter is missing, we just force calculate it
      if ( !bxAspectRatio ) {
        if ( bxHeight === 0 ) {
          bxAspectRatio = imgAspectRatio - 1;
        } else {
          bxAspectRatio = imgAspectRatio + 1;
        }
      }

      // Only resize the images that need resizing
      if ( (bxHeight && imgHeight > bxHeight) || (bxWidth && imgWidth > bxWidth) ) {

        if ( imgAspectRatio > aspectRatio ) {
          bxHeight = mathFloor( imgHeight / imgWidth * bxWidth );
        } else {
          bxWidth = mathFloor( imgWidth / imgHeight * bxHeight );
        }

        $( this ).attr({
          "height": bxHeight,
          "width": bxWidth
        });
      }
    })
    .each(function() {

      // Trigger load event (for Gecko and MSIE)
      if ( this.complete || isIE6 ) {
        this.trigger( "load" );
      }
    });
  };
})( jQuery );