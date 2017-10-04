/**
*  @name video player
*  @description Using mediaElement to playing video and is used in "Video player" component
*  @version 1.0
*/
(function ($) {
    'use strict';
    $(document).ready(function () {
        $('video, audio').each(function () {
            var media = $(this);
            media.mediaelementplayer({
                success: function (me) {
                    if (media.data('autoplay') !== undefined) {
                        me.play();
                    }
                }
            });
        });
    });
}(jQuery));
