(function($) {

	$.fn.aeImageResize = function( options ) {

		var strHeight = "height"
		,	strWidth = "width"
		,	mathFloor = Math.floor
		,	browser = $.browser
		,	isIE6 = browser.msie && (parseInt(browser.version) == 6)
		,	aspectRatio = 0
		,	params = $.extend({
				height: 0,
				width: 0
			}, options)
		;

		// We cannot do much unless we have one of these
		if ( !params[strHeight] && !params[strWidth] ) {
			return;
		}

		// Calculate aspect ratio now, if possible
		if ( params[strHeight] && params[strWidth] ) {
			aspectRatio = params[strWidth] / params[strHeight];
		}

		// Attach handler to load
		// Handler is executed just once per element
		// Load event required for Webkit browsers
		$( this ).one( "load", function() {

			// Remove all attributes and CSS rules
			$( this ).removeAttr( strHeight )
					 .removeAttr( strWidth )
					 .css({
						 height: '',
						 width: ''
					 });

			var imgHeight = this[strHeight]
			,	imgWidth = this[strWidth]
			,	imgAspectRatio = imgWidth / imgHeight
			,	bxHeight = params[strHeight]
			,	bxWidth = params[strWidth]
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
				$( this ).trigger( "load" );
			}
		});
	};
})(jQuery);