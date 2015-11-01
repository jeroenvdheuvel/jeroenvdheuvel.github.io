(function(win, doc, $) {
    $(function() {
        // Assign the HTML, Body as a variable...
        var viewport = $('html, body');

        $('img[src*=\'loading.gif\']').lazyload({
            threshold : 200,
            skip_invisible : false
        });

        $('aside *[title]').tooltip({delay: {show: 250, hide:100}});

        // Detect whether device supports 'orientationchange' event, otherwise fall back to the resize event.
        var supportsOrientationChange = 'onorientationchange' in win,
            orientationEvent          = supportsOrientationChange ? 'orientationchange' : 'resize',
            previousOrientation       = win.orientation;

        win.addEventListener(orientationEvent, function(e) {
            if(win.orientation !== previousOrientation) {
                previousOrientation = win.orientation;

                $('aside *[title]').tooltip('hide');
            }
        }, false);

        $('.carousel').carousel();
        $('.carousel').swipe({
            swipe: function(event, direction, distance, duration, fingerCount){
                switch (direction) {
                    case $.fn.swipe.directions.LEFT:
                        $(this).carousel('next');
                        break;

                    case $.fn.swipe.directions.RIGHT:
                        $(this).carousel('prev');
                        break;
                }
            },
            allowPageScroll: $.fn.swipe.pageScroll.VERTICAL,
            fingers: $.fn.swipe.fingers.ONE
        });

        $('#footer .back-to-top').click(function(e){
            e.preventDefault();

            var offset = win.pageYOffset;

            if (offset > 0) {
                var windowHeight  = $(win).height();
                var screenOffsets = offset / windowHeight;
                screenOffsets     = screenOffsets > 3 ? 3 : screenOffsets;
                var time          = screenOffsets * 250;

                viewport.animate({
                    scrollTop: 0
                }, time);
            }

            return false;
        });

        var onScroll = function(e){
            var offset = win.pageYOffset;
            var btn = $('#footer .back-to-top');

            if (offset > 0) {
                btn.addClass('visible');
            }
            else {
                btn.removeClass('visible')
            }
        };

        onScroll.call(this, null);
        $(win).scroll(onScroll);

        // Stop the animation if the user scrolls. Defaults on .stop() should be fine
        viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup touchmove', function(e){
            if ( e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel' || e.type === 'touchmove'){
                if (viewport.is(':animated')) {
                    viewport.stop();
                }
            }
        });

        var hostname = win.location.hostname;
        $('a[href^=http],a[href^=https],a[href^="\/\/"]').each(function(){
            if(this.href.indexOf(hostname) < 0) {
                $(this).attr({target: '_blank'});
            }
        });
    });
})(window, document, jQuery);
