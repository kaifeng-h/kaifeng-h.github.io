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
    // $body.on('load', function() {
    // $window.on('load', function() {
    // console.log('sss')
        // window.setTimeout(function() {
            // $body.removeClass('is-preload');
        // }, 100);
    // });

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
        $body.removeClass('is-preload');
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

//  body fade
// const observer = lozad(".lozad", {
//     loaded: function (el) {
//       el.classList.add("loaded");
//       const blurImage = el.querySelector(".blur");
//       if (blurImage) {
//         blurImage.style.opacity = 0; // 隐藏模糊缩略图
//       }
//     },
//   });
// observer.observe();

// const blurredImageDiv = document.querySelector(".blurred-img")
// const img = blurredImageDiv.querySelector("img")
// console.log("bbbb")

// function loaded() {
//     console.log("aaaa")
//     blurredImageDiv.classList.add("loaded")
// }

// // if (img.complete) {
// //   loaded()
// // } else {
// img.addEventListener("load", loaded)
// // }


// lazy load 
const fullImage = new Image();
fullImage.src = 'assets/css/images/bg2.jpg';
const thumbnail = document.querySelector('body')
fullImage.onload = function() {
        document.body.style.backgroundImage = `url('assets/css/images/bg2.jpg')`;
};
fullImage.onerror = function() {
    console.error('Failed to load the full-size image.');
};

const avatar = new Image()
avatar.src = 'https://i.postimg.cc/Twt9sWkR/avatar.jpg'
const thumbnailAvatar = document.querySelector('#home > div > img.avatar')
avatar.onload = function (){
    thumbnailAvatar.src = avatar.src;
}

const hl_vmud = new Image()
hl_vmud.src = 'https://i.postimg.cc/jdL8GZ0B/highlights-vmud.png'
const thumbnail1 = document.querySelector('#home > section:nth-child(6) > table > tbody > tr:nth-child(1) > td:nth-child(2) > img')
hl_vmud.onload = function (){
    thumbnail1.src = hl_vmud.src;
}

const hl_vision = new Image()
hl_vision.src = 'https://i.postimg.cc/ncgdZBnr/highlights-vision.png'
const thumbnail2 = document.querySelector('#home > section:nth-child(6) > table > tbody > tr:nth-child(2) > td:nth-child(2) > img')
hl_vision.onload = function (){
    thumbnail2.src = hl_vision.src;
}

const hl_1 = new Image()
hl_1.src = 'https://i.postimg.cc/MZsPPg4y/hl1.png'
const thumbnail3 = document.querySelector('#home > section:nth-child(6) > table > tbody > tr:nth-child(3) > td:nth-child(2) > img')
hl_1.onload = function (){
    thumbnail3.src = hl_1.src;
}

const new_img = new Image()
new_img.src = 'images/new2.gif'

new_img.onload = function (){
    const new_images = document.querySelectorAll('#collapsibleList > li > p:nth-child(1) > span > img')
    new_images.forEach((image, index) => {
    image.src = new_img.src;
    });
}

const tongjimail = new Image()
tongjimail.src = 'https://i.postimg.cc/CKHJj2kn/tongjimail.png'

const mailEle = document.querySelector('#contact > form > section > dl:nth-child(2) > img')
tongjimail.onload = function (){
    mailEle.src = tongjimail.src;
}