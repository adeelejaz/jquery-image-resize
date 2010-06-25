(function($) {
	$.fn.aeImageResize = function(options) {
		var params = jQuery.extend({
			height: 9,
			width: 9
		}, options);

		this.each(function() {
			var height = params.height,
				width = params.width,
				img_height = $(this).height(),
				img_width = $(this).width(),
				m_ceil = Math.ceil,
				m_floor = Math.floor;

			if (img_height >= img_width) {
				width = m_floor(m_ceil(img_width / img_height * height));
			} else {
				height = m_floor(m_ceil(img_height / img_width * width));
			}
			$(this).attr({
				'height': height,
				'width': width
			});
		});
	};
})(jQuery);