(function($) {
	$.fn.aeImageResize = function(options) {
		var propertyHeight = 'height',
			propertyWidth = 'width',
			browser = $.browser,
			mathFloor = Math.floor,
			params = $.extend({
				height: 9,
				width: 9
			}, options),
			isIE6 = browser.msie && (parseInt(browser.version) == 6),
			aspectRatio = params[propertyWidth] / params[propertyHeight];

		// Attach handler to load
		// Handler is executed just once per element
		// Load event required to fix Webkit browsers
		$(this).one('load', function() {

			// Remove all attributes and CSS rules
			$(this).removeAttr(propertyHeight)
				   .removeAttr(propertyWidth)
				   .css({height: '', width: ''});

			var imgHeight = this[propertyHeight],
				imgWidth = this[propertyWidth],
				height = params[propertyHeight],
				width = params[propertyWidth],
				imgAspectRatio = imgWidth / imgHeight;

			// Only resize the images that are bigger
			// than the bounding box
			if (imgHeight > height || imgWidth > width) {

				if (imgAspectRatio > aspectRatio) {
					height = mathFloor(imgHeight / imgWidth * width);
				} else {
					width = mathFloor(imgWidth / imgHeight * height);
				}

				$(this).attr({
					'height': height,
					'width': width
				});
			}
		})
		.each(function() {

			// Trigger load event (for Gecko and MSIE)
			if (this.complete || isIE6)
			{
				$(this).trigger('load');
			}
		});
	};
})(jQuery);