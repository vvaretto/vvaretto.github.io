$(document).ready(function() {
/***********
VARIABLES
**********/
    var $body = $('body');
    var $checkbox = $('#switch');
    var megaMenuItem = $('.mega-menu a')
    var menuHeight = $('.mega-menu').outerHeight();
    var hamburgerMenuHeight = $('.hamburger-menu').outerHeight();
    var hamburgerMenuItem = $('.hamburger-menu a');
    var birthDate = new Date(1998, 7, 8); // Month is 0-indexed (7 = August)
    var today = new Date();
    var years = today.getFullYear() - birthDate.getFullYear();
    var description = $('.description');


/***********
SCROLL TO TOP
 **********/

const $myButton = $('#toTop');
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $myButton.fadeIn();
        } else {
            $myButton.fadeOut();
        }
    });
    $myButton.on('click', function() {
        $('html, body').scrollTop(0);
    });

/***********
 CHANGE FAVICON ON HOVER
 **********/

    const originalSrc = '/assets/favicon.png';
    const hoverSrc = '/assets/favicon_alt.png';

    $('.favicon').hover(
        function() {
            $(this).attr('src', hoverSrc);
        },
        function() {
            $(this).attr('src', originalSrc);
        }
    );

/***********
 MENU BORDER
 **********/
    $(megaMenuItem).on('click', function() {

        $(megaMenuItem).removeClass('active');

        $(this).addClass('active');

    });
/***************
 HAMBURGER MENU TOGGLE
******************/

    $('.hamburger-toggle').on('click', function() {
        $('.hamburger-menu-container').toggleClass('open');
    });

    hamburgerMenuItem.on('click', function() {
        $('.hamburger-menu-container').removeClass('open');
    });
    /************
     WORK EXPERIENCE EXPAND/COLLAPSE
     *************/
    $('.accordion-short').on('click', function () {
        const moreInfo = $(this).next('.accordion-more-info');
        const icon = $(this).find('i.text-end');

        moreInfo.slideToggle(300);
        moreInfo.toggleClass('expand minimize');


        $(this).toggleClass('expand minimize');

        if (icon.hasClass('fa-plus')) {
            icon.removeClass('fa-plus').addClass('fa-minus');
            moreInfo.css('display', 'flex');
        } else {
            icon.removeClass('fa-minus').addClass('fa-plus');
        }
    });
    /*********
     MENU SCROLL
     *********/

    function handleMenuClick(menuItem, offsetHeight) {
        $(menuItem).on('click', function(event) {
            event.preventDefault();

            var target = $(this.getAttribute('href'));
            if (target.length) {
                var scrollOffset = target.offset().top - offsetHeight;
                $('html, body').animate({
                    scrollTop: scrollOffset
                }, 0);
            }
        });
    }
    handleMenuClick(hamburgerMenuItem, hamburgerMenuHeight);
    /************
     SCROLL AWARDS
     *************/
    const $contentWrapper = $('.content-wrapper');

    $('#scroll-left').on('click', function() {
        $contentWrapper.animate({
            scrollLeft: '-=500' // Adjust the number to control scroll speed
        }); // Adjust the animation speed as needed
    });

    $('#scroll-right').on('click', function() {
        $contentWrapper.animate({
            scrollLeft: '+=500' // Adjust the number to control scroll speed
        }); // Adjust the animation speed as needed
    });

    /*********
     DISPLAY IMAGES DYNAMICALLY
     *********/

    const imageContainer = $('#gallery-image-container');
    const totalImages = 68;

    for (let i = 0; i <= totalImages; i++) {

        const imageWrapper = $('<div>', {
            class: 'image-wrapper col-lg-3 col-md-4 col-sm-6 col-12'
        });

        const figure = $('<figure>');

        const img = $('<img>', {
            src: `/assets/images/gallery/life_in_digital_${i}.jpg`,
            alt: `life_in_digital_${i}`,
            class: 'dynamic-image'
        });

        figure.append(img);
        imageWrapper.append(figure);
        imageContainer.append(imageWrapper);
    }

    /*********
     LAST PUSH API
     *********/
    var repoOwner = 'marcokleimans';
    var repoName = 'marcokleimans.github.io';

    $.get(`https://api.github.com/repos/${repoOwner}/${repoName}/events`, function(data) {
        var lastPushEvent = data.find(event => event.type === 'PushEvent');
        if (lastPushEvent) {
            var lastPushTimestamp = lastPushEvent.created_at;
            var lastPushDate = new Date(lastPushTimestamp);
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            var formattedDate = lastPushDate.toLocaleString("en-US", options);
            $('.last-push').text(formattedDate);
        }
    });
});

