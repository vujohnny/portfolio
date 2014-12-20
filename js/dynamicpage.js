$(function() {
    var newHash      = "",
        $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0;

    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();

    $("nav").delegate("a", "click", function() {
        window.location.hash = $(this).attr("href");
        return false;
    });

    $(window).bind('hashchange', function(){

        newHash = window.location.hash.substring(1);

        if (newHash) {
            $mainContent
                .find("#guts")
                .fadeOut(200, function() {
                    $mainContent.hide()
                        .load(newHash + " #guts", function() {
                        $mainContent.fadeIn(200, function() {
                            $pageWrap.animate({
                                height: baseHeight + $mainContent.height() + "px"
                            });
                        });
                        $("nav li").removeClass("active");
                        $("nav li a[href="+newHash+"]").parent("li").addClass("active");
                    });
                });
        };

    });

    $(window).trigger('hashchange');

    var mainHeaderWidth=0;
    function getHeaderWidth(){
        mainHeaderWidth=$('.mainHeader').width()-$('#left').width()*2;
        if (jQuery(this).scrollTop() > 30) {
            jQuery('.mainMenu').css({"position":"fixed","top":"0","width":mainHeaderWidth});
        }
        else {
            jQuery('.mainMenu').removeAttr("style");
            jQuery('#top').css("height","30px");
        }
    }

    $(window).resize(function(){
        getHeaderWidth();
        });

    jQuery(document).scroll(function() {
        getHeaderWidth();
    });

});
