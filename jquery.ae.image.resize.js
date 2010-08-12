(function($) {
	$.fn.aeImageResize = function(options) {
		var mathCeil = Math.ceil,
			mathFloor = Math.floor,
			params = jQuery.extend({
				height: 9,
				width: 9
			}, options);

		this.each(function() {
			var imgHeight = $(this).height(),
				imgWidth = $(this).width(),
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
	};
})(jQuery);