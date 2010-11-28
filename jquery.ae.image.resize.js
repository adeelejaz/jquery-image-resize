(function( $ ) {

  $.fn.aeImageResize = function( params ) {

    // We cannot do much unless we have one of these
    if ( !params.height && !params.width ) {
      return this;
    }

    var aspectRatio = 0
      // Nasty I know but it's done only once, so not too bad I guess
      // Alternate suggestions welcome :)
      ,	isIE6 = $.browser.msie && (6 == ~~ $.browser.version)
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
          bxHeight = ~~ ( imgHeight / imgWidth * bxWidth );
        } else {
          bxWidth = ~~ ( imgWidth / imgHeight * bxHeight );
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