$(document).ready(function(){

    /* ==========================================================================
     Parallax
     ========================================================================== */

    scrollParallax($('.label-metall_palladium'), $('.landing-head'), 10);
    scrollParallax($('.label-metall_aurum'), $('.landing-head'), 10, true);
    scrollParallax($('.label-metall_platinum'), $('.landing-head'), 7, true);
    scrollParallax($('.label-metall_argentum'), $('.landing-head'), 7);
    scrollParallax($('.landing-head__photo-small'), $('.landing-head'), 10);

    function scrollParallax(obj, parent, ratio, isBottom) {
        let margin = isBottom ? 'margin-bottom' : 'margin-top';

        obj.css(margin, ($(document).scrollTop() - parent.offset().top)/ratio + 'px');

        $(document).on('scroll', function() {
            if ( window.matchMedia('(min-width: 999px)').matches ) {
                obj.css(margin, ($(document).scrollTop() - parent.offset().top)/ratio + 'px');
            }
        });
    }

    /* ======================================================================== */
});
