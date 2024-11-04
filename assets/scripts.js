$(document).ready(function() {
/***********
VARIABLES
**********/
    var megaMenuItem = $('.mega-menu a')
    var menuHeight = $('.mega-menu').outerHeight();
    var hamburgerMenuHeight = $('.hamburger-menu').outerHeight();
    var hamburgerMenuItem = $('.hamburger-menu a');

/***********
SCROLL TO TOP
 **********/

const $myButton = $('#toTop');
    $('body').on('scroll', function() {
        if ($(this).scrollTop() > 200) {
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
     DISPLAY IMAGES DYNAMICALLY
     *********/

    const imageContainer = $('#gallery-image-container');
    const totalImages = 35;
    
    for (let i = 0; i <= totalImages; i++) {
    
        const imageWrapper = $('<div>', {
            class: 'image-wrapper col-lg-3 col-md-4 col-sm-6 col-12'
        });
    
        const figure = $('<figure>');
    
        const img = $('<img>', {
            src: `assets/images/gallery/gallery_${i}.jpg`,
            alt: `life_in_digital_${i}`,
            class: 'dynamic-image'
        });
    
        figure.append(img);
        imageWrapper.append(figure);
        imageContainer.append(imageWrapper);
    }
});

