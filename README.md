#jQuery Image Resize Plugin

Version: v2.1.3

A super light jQuery plugin (less than 0.5KB) to dynamically resize the images without distorting the proportions or adding any extra HTML.

####HTML:
```html
<img class="resizeme" src="sample1.jpg">
```

####JavaScript
```js
$(function() {
    $( ".resizeme" ).aeImageResize({ height: 250, width: 250 });
});
```

####Options
height
An integer representing the maximum height for the image.

width
An integer representing the maximum width for the image.
