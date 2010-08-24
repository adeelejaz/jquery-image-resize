(function($) {
	$.fn.aeImageResize = function(options) {
		var mathFloor = Math.floor,
			params = jQuery.extend({
				height: 9,
				width: 9
			}, options),
			isIE6 = $.browser.msie && (parseInt($.browser.version) == 6);

		// Attach handler to load
		// Handler is executed just once per element
		// Load event required to fixe Webkit browsers
		$(this).one('load', function() {

			// Remove all attributes and CSS rules
			$(this).removeAttr('height')
				   .removeAttr('width')
				   .css({height: '', width: ''});

			var imgHeight = this.height,
				imgWidth = this.width,
				height = params.height,
				width = params.width;

			if (imgHeight > height || imgWidth > width) {
				if (imgHeight > imgWidth) {
					width = mathFloor(imgWidth / imgHeight * height);
				} else {
					height = mathFloor(imgHeight / imgWidth * width);
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