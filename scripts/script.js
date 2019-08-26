var $ = jQuery.noConflict();

$(document).ready(function($) {


    /*-------------------------------------------------*/
    /* =  Mobile Menu
    /*-------------------------------------------------*/

    // Create the dropdown base
    $("<select />").appendTo(".navigation");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value"   : "",
        "text"    : "Go to..."
    }).appendTo(".navigation select");

    // Populate dropdown with menu items
    $(".sf-menu a").each(function() {
        var el = $(this);
        if(el.next().is('ul.sub-menu')){
            $("<optgroup />", {
                "label"    : el.text()
            }).appendTo(".navigation select");
        } else {
            $("<option />", {
                "value"   : el.attr("href"),
                "text"    : el.text()
            }).appendTo(".navigation select");
        }
    });

    // Change style
    $('.navigation select').selectbox({
        effect: "slide"
    });

    // To make dropdown actually work
    // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
    $(".navigation select").change(function() {
        window.location = $(this).find("option:selected").val();
    });


    /*-------------------------------------------------*/
    /* =  Services
    /*-------------------------------------------------*/

    $('.services p').filter(':nth-child(n+4)').addClass('hide');

    $('.services h2').on('click', function() {
        if ( !$(this).hasClass('active')) {
            $('.services h2').removeClass('active');
            $(this)
                .addClass('active')
                .next()
                .slideDown(200)
                .siblings('.services p')
                .slideUp(200);
        }
    });

    /*-------------------------------------------------*/
    /* =  Testimonials
    /*-------------------------------------------------*/

    // Hiding all the testimonials, except for the first one.
    $('.testimonials li').hide().eq(0).show();

    // A self executing function that loops through the testimonials:
    (function showNextTestimonial(){

        // Wait for 7.5 seconds and hide the currently visible testimonial:
        $('.testimonials li:visible').delay(7500).fadeOut('slow',function(){

            // Move it to the back:
            $(this).appendTo('.testimonials ul');

            // Show the next testimonial:
            $('.testimonials li:first').fadeIn('slow',function(){

                // Call the function again:
                showNextTestimonial();
            });
        });
    })();


    /*-------------------------------------------------*/
    /* =  isotope
    /*-------------------------------------------------*/

    // Needed variables
    var $container	 	= $('.project-container');
    var $filter 		= $('.filter-project');

    $('.project-container img').load(function(){
        try {
            $container.isotope({
                filter				: '*',
                layoutMode   		: 'masonry',
                animationOptions	: {
                    duration			: 750,
                    easing				: 'linear'
                }
            });
        } catch(err) {

        }

    });

    $(window).bind('resize', function(){
        var selector = $filter.find('a.active4').attr('data-filter');
        try {
            $container.isotope({
                filter	: selector,
                animationOptions: {
                    duration: 750,
                    easing	: 'linear',
                    queue	: false,
                }
            });
            return false;
        } catch(err) {

        }
    });

    // Isotope Filter
    $filter.find('a').click(function(){
        var selector = $(this).attr('data-filter');

        try {

            $container.isotope({
                filter	: selector,
                animationOptions: {
                    duration: 750,
                    easing	: 'linear',
                    queue	: false,
                }
            });
            return false;

        } catch(err) {

        }
    });

    /*-------------------------------------------------*/
    /* =  singlepost - Author
    /*-------------------------------------------------*/
    $('.member-post li a').on('click', function(e){
        e.preventDefault();
    });
    $('.member-post li').on('click', function(){
        var $this = $(this),
            x = $(this).index();
        if( !$this.hasClass('active')) {
            $('.member-post li').removeClass('active');
            $this.addClass('active');
            $('.member-data li').fadeOut(200);
            $('.member-data li:eq('+ x +')').delay(200).fadeIn(200);
        }
    });

    /*-------------------------------------------------*/
    /* =  singlepost - Author
    /*-------------------------------------------------*/

    $('.tab-list li').on('click', function(){
        var $this = $(this),
            x = $(this).index();
        if( !$this.hasClass('active')) {
            $('.tab-list li').removeClass('active');
            $this.addClass('active');
            $('.tab-cont li').fadeOut(200);
            $('.tab-cont li:eq('+ x +')').delay(200).fadeIn(200);
        }
    });

    /*-------------------------------------------------*/
    /* =  shortcodes serv-widget
    /*-------------------------------------------------*/
    $('.serv-item p').filter(':nth-child(n+4)').addClass('hide');

    $('.serv-item h3').on('click', function() {
        if ( !$(this).hasClass('active')) {
            $('.serv-item h3').removeClass('active');
            $(this)
                .addClass('active')
                .next()
                .slideDown(200)
                .siblings('.serv-widget div p')
                .slideUp(200);
        }
    });


    /* ---------------------------------------------------------------------- */
    /*	Contact Map
    /* ---------------------------------------------------------------------- */
    var contact = {"lat":"42.672421", "lon":"21.16453899999999"}; //Change a map coordinate here!

    try {
        $('#map').gmap3({
                action: 'addMarker',
                latLng: [contact.lat, contact.lon],
                map:{
                    center: [contact.lat, contact.lon],
                    zoom: 14
                },
            },
            {action: 'setOptions', args:[{scrollwheel:true}]}
        );
    } catch(err) {

    }
});

