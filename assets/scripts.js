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

/*********
 CALCULATE AGE
 *********/

    var isBeforeBirthday = (today.getMonth() < birthDate.getMonth()) ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
    if (isBeforeBirthday) {
        years--;
    }
    var lastBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (isBeforeBirthday) {
        lastBirthday.setFullYear(today.getFullYear() - 1);
    }
    var daysSinceLastBirthday = Math.floor((today - lastBirthday) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    $('.age').text(years + ' years and ' + daysSinceLastBirthday + ' days old');

    /************
     READ MORE - DESCRIPTION
     *************/
    $('.btn-2.read-more').on('click', function() {
        var description = $(this).prev('.description');

        // Check if the description is expanded
        if (description.hasClass('expanded')) {
            description.removeClass('expanded');
            $(this).text('Read More');
        } else {
            description.addClass('expanded');
            $(this).text('Read Less');
        }
    });
    /************
     Remove shadow on scroll
     *************/
    description.on('scroll', function() {
        if ($(this).hasClass('expanded')) {
            $(this).find('.shadow').css('display', 'none');
        } else {
            $(this).find('.shadow').css('display', 'block');
        }
    });
    $('.btn-2').on('click', function() {
        if (!description.hasClass('expanded')) {
            description.find('.shadow').css('display', 'block');
            description.animate({ scrollTop: 0 }, 'slow');
        }
    });
    /************
     TABS
     *************/
    $('.tab-link').on('click', function() {
        var tabID = $(this).data('tab');
        $('.tab-panel').hide();
        $('.tab-link').removeClass('active');
        $('#' + tabID).fadeIn(300);
        $(this).addClass('active');
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
     HIDE FORM AFTER SUBMISSION
     *********/
    $('form').on('submit', function(event) {
        $(this).fadeOut();
        setTimeout(function() {
            $('.alert-success').show()
        }, 2000);
    })
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

