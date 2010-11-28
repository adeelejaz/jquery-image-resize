(function( $ ) {

  $.fn.aeImageResize = function( params ) {

    var aspectRatio = 0
      // Nasty I know but it's done only once, so not too bad I guess
      // Alternate suggestions welcome :)
      ,	isIE6 = $.browser.msie && (6 == ~~ $.browser.version)
      , txtHeight = "height"
      , txtWidth = "width"
      ;

    // We cannot do much unless we have one of these
    if ( !params[txtHeight] && !params[txtWidth] ) {
      return this;
    }

    // Calculate aspect ratio now, if possible
    if ( params[txtHeight] && params[txtWidth] ) {
      aspectRatio = params[txtWidth] / params[txtHeight];
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

      var imgHeight = this[txtHeight]
        ,	imgWidth = this[txtWidth]
        ,	imgAspectRatio = imgWidth / imgHeight
        ,	bxHeight = params[txtHeight]
        ,	bxWidth = params[txtWidth]
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
          bxHeight = ~~ ( imgHeight / imgWidth * bxWidth );
        } else {
          bxWidth = ~~ ( imgWidth / imgHeight * bxHeight );
        }

        this[txtHeight] = bxHeight;
        this[txtWidth] = bxWidth;
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