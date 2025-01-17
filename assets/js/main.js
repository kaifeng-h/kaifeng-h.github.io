/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $main = $('#main'),
        $panels = $main.children('.panel'),
        $nav = $('#nav'),
        $nav_links = $nav.children('a');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['361px', '736px'],
        xsmall: [null, '360px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Nav.
    $nav_links
        .on('click', function(event) {

            var href = $(this).attr('href');

            // Not a panel link? Bail.
            if (href.charAt(0) != '#' ||
                $panels.filter(href).length == 0)
                return;

            // Prevent default.
            event.preventDefault();
            event.stopPropagation();

            // Change panels.
            if (window.location.hash != href)
                window.location.hash = href;

        });

    // Panels.

    // Initialize.
    (function() {

        var $panel, $link;

        // Get panel, link.
        if (window.location.hash) {

            $panel = $panels.filter(window.location.hash);
            $link = $nav_links.filter('[href="' + window.location.hash + '"]');

        }

        // No panel/link? Default to first.
        if (!$panel ||
            $panel.length == 0) {

            $panel = $panels.first();
            $link = $nav_links.first();

        }

        // Deactivate all panels except this one.
        $panels.not($panel)
            .addClass('inactive')
            .hide();

        // Activate link.
        $link
            .addClass('active');

        // Reset scroll.
        $window.scrollTop(0);

    })();

    // Hashchange event.
    $window.on('hashchange', function(event) {

        var $panel, $link;

        // Get panel, link.
        if (window.location.hash) {

            $panel = $panels.filter(window.location.hash);
            $link = $nav_links.filter('[href="' + window.location.hash + '"]');

            // No target panel? Bail.
            if ($panel.length == 0)
                return;

        }

        // No panel/link? Default to first.
        else {

            $panel = $panels.first();
            $link = $nav_links.first();

        }

        // Deactivate all panels.
        $panels.addClass('inactive');

        // Deactivate all links.
        $nav_links.removeClass('active');

        // Activate target link.
        $link.addClass('active');

        // Set max/min height.
        $main
            .css('max-height', $main.height() + 'px')
            .css('min-height', $main.height() + 'px');

        // Delay.
        setTimeout(function() {

            // Hide all panels.
            $panels.hide();

            // Show target panel.
            $panel.show();

            // Set new max/min height.
            $main
                .css('max-height', $panel.outerHeight() + 'px')
                .css('min-height', $panel.outerHeight() + 'px');

            // Reset scroll.
            $window.scrollTop(0);

            // Delay.
            window.setTimeout(function() {

                // Activate target panel.
                $panel.removeClass('inactive');

                // Clear max/min height.
                $main
                    .css('max-height', '')
                    .css('min-height', '');

                // IE: Refresh.
                $window.triggerHandler('--refresh');

                // Unlock.
                locked = false;

            }, (breakpoints.active('small') ? 0 : 500));

        }, 250);

    });

    // IE: Fixes.
    if (browser.name == 'ie') {

        // Fix min-height/flexbox.
        $window.on('--refresh', function() {

            $wrapper.css('height', 'auto');

            window.setTimeout(function() {

                var h = $wrapper.height(),
                    wh = $window.height();

                if (h < wh)
                    $wrapper.css('height', '100vh');

            }, 0);

        });

        $window.on('resize load', function() {
            $window.triggerHandler('--refresh');
        });

        // Fix intro pic.
        $('.panel.intro').each(function() {

            var $pic = $(this).children('.pic'),
                $img = $pic.children('img');

            $pic
                .css('background-image', 'url(' + $img.attr('src') + ')')
                .css('background-size', 'cover')
                .css('background-position', 'center');

            $img
                .css('visibility', 'hidden');

        });

    }


})(jQuery);

hiddenFlag = true;
// url = window.location.href
//     code = url.split('?')[1]
//     code2 = code.split('=')[1]
//     console.log(code2)
//     if (code2 != null && code2.length == 20) {
//         console.log('code success');
//         data = {
//                 "code": code2
//             }
//         $.ajax({
//             type: 'POST',
//             headers: { 'Access-Control-Allow-Origin': '*' },
//             data: data,
//             success: function(jsondata) {
//                 console.log(jsondata);
//             },
//             dataType: 'json'
//         });
//     }

// }

keyboardJS.bind('home', (e) => {
    window.location.href = "#home";
});
keyboardJS.bind('end', (e) => {
    window.location.href = "#contact";
});

function updown(s) {
    url = window.location.href;
    data = url.split('/')
    page_name = data[data.length - 1]
    page_name = page_name.split('#')
    page_name = page_name[page_name.length - 1]
    console.log(page_name)
    // pages = ['home','news', 'publication', 'education', 'awards', 'contact']
    pages = ['home','news', 'publication', 'tools', 'service', 'contact']
    index = 0;
    for (i = 0; i < pages.length; i++) {
        tmp = pages[i];
        if (tmp == page_name) {
            index = i;
            break;
        }
    }
    if (s == 'up') {
        index = index - 1;
    }
    if (s == 'down') {
        index = index + 1;
    }
    if (index >= pages.length) {
        index = index - 1;
    }
    if (index < 0) {
        index = index + 1;
    }
    new_page = pages[index]
    window.location.href = '#' + new_page;
}

keyboardJS.bind('left', (e) => {
    updown('up')
});
keyboardJS.bind('right', (e) => {
    updown('down')
});
keyboardJS.bind('pageup', (e) => {
    updown('up')
});
keyboardJS.bind('pagedown', (e) => {
    updown('down')
});
keyboardJS.bind('h + k+ f', (e) => {
    if(hiddenFlag){
        li = $('.hidden')
        i =0 ;
        for(;i<li.length;i++){
            li[i].removeAttribute('hidden')
        }
        hiddenFlag = false;
    }else{
        li = $('.hidden')
        i =0 ;
        for(;i<li.length;i++){
            li[i].setAttribute("hidden","true")
        }
        hiddenFlag = true;
    }
    


});



const toggleButton = document.getElementById('toggleButton');
const collapsibleList = document.getElementById('collapsibleList');

toggleButton.addEventListener('click', () => {
    const newItems = collapsibleList.querySelectorAll('.newsunshow');
    console.log(newItems.length)
    newItems.forEach(item => {
        // item.style.removeProperty = "display";
        item.classList.remove('newsunshow')
    });
    toggleButton.style.display = 'none'
});