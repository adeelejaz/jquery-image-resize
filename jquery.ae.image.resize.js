(function($) {
	$.fn.aeImageResize = function(options) {
		var mathCeil = Math.ceil,
			mathFloor = Math.floor,
			params = jQuery.extend({
				height: 9,
				width: 9
			}, options);

		// Loop through each
		this.each(function() {

			// Bind to load event
			// Fixes Webkit browsers as they set
			// height and width after image is loaded
			$(this).load(function() {

				// Remove all attributes and CSS rules
				$(this).removeAttr('height')
					   .removeAttr('width')
					   .css({ height: '', width: ''});

				var imgHeight = this.height,
					imgWidth = this.width,
					height = params.height,
					width = params.width;

				if (imgHeight > height || imgWidth > width) {
					if (imgHeight > imgWidth)
						width = mathFloor(mathCeil(imgWidth / imgHeight * height));
					else
						height = mathFloor(mathCeil(imgHeight / imgWidth * width));

					$(this).attr({
						'height': height,
						'width': width
					});
				}
			});
		});
	};
})(jQuery);