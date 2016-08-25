jQuery(function ($) {
    "use strict";

    /*	Table OF Contents
	==========================

	1-Navigation
	2-Accordion
	3-TABS
	4-Flexslider
	5-Portfolio Isotope
	6-Parallax
	7-Animations
	
	
    /*===================
    1-Navigation
    ===================*/

    $(".navbar-nav a[href^='#']").click(function () {
        $('.navbar-nav li').removeClass('active');
        $(this).parent().addClass('active');
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - $('#sticktop').height()
        }, 500);
        return false;
    });
   

    /*==================================
		2-Accordion
	====================================*/
    $("#accordion").collapse();
    $('.panel-title > a').click(function () {
        $('.active .accordion-icon').addClass('icon-plus', 200).removeClass('icon-minus', 200);
        $('.panel-title > a').removeClass('active');
        $(this).addClass('active');
        $('.active .accordion-icon').removeClass('icon-plus', 200).addClass('icon-minus', 200);
    });

    /*==================================
		3-TABS
	====================================*/
    $('#ornatTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    /*==================================
		4-Flexslider
	====================================*/
	
	
	
    $('#promoslide').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: true,
        pauseOnHover: true,
        slideshowSpeed: 6000,
        direction: "horizontal" //Direction of slides
    });


	$('.close-folio').click(function(){
		$('.projects-detail').slideUp('slow');
	});
	
    $('.project').click(function () {

        $('.projects-detail').slideDown('slow');

        $('#detail-flex').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            slideshow: false,
            direction: "horizontal" //Direction of slides
     	});

        var $detailflex = $('#detail-flex');
        $('#folio-next').click(function () {
            $detailflex.flexslider("next");
        });
        $('#folio-prev').click(function () {
            $detailflex.flexslider("prev");
        });

        $('#detail-flex').flexslider($(this).index());
    });

    $(window).on("resize", function () {


        $('.project-desc').carousel({
            interval: 7000
        })

        $('#testi-flex').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            pauseOnHover: true,
            slideshowSpeed: 4000,
            direction: "horizontal", //Direction of slides
            after: function (slider) {
                $('.client-list li').removeClass('active');
                $('.client-list li:eq(' + slider.currentSlide + ')').addClass("active");
            }
        });
		
		$('.video-inner').flexslider({
            animation: "slide",
            directionNav: false,
            controlNav: false,
            pauseOnHover: true,
            slideshowSpeed: 8000,
            
        });
		
		

        $('.client-list li').click(function () {
            $('.client-list li').removeClass('active');
            $(this).addClass('active');
            $('#testi-flex').flexslider($(this).index());
        });

        var $testiflex = $('#testi-flex');
        $('#testimonial-next').click(function () {
            $testiflex.flexslider("next");
        });
        $('#testimonial-prev').click(function () {
            $testiflex.flexslider("prev");
        });

        function xv_lava($el, speed) {
            leftPos = $el.position().left + $('.members li').width() / 2 + 14;
            $animation_tool.stop().animate({
                left: leftPos,
            }, speed);
        }

        if ($('#team-slider').length) {
            $('#team-slider').flexslider({
                animation: "slide",
                directionNav: false,
                controlNav: false,
                pauseOnHover: true,
                slideshowSpeed: 4000,
                direction: "horizontal", //Direction of slides
                after: function (slider) {
                    $('.members li').removeClass('active');
                    $('.members li:eq(' + slider.currentSlide + ')').addClass("active");
                    xv_lava($($('.members li.active')), 700);
                },
            });

            $('.members li').click(function () {
                $('.members li').removeClass("active");
                $(this).addClass("active");
                $('#team-slider').flexslider($('.members li').index(this));
                xv_lava($(this), 500);
            });

            var offset_width = ($('.member').width() - $('.members').width()) / 2 - 35,
                leftPos, newWidth, isNavClicked = false,
                $mainNav_animate = $('.member'),
                $animation_tool = $(".triangle");


            $animation_tool
                .css("left", $(".active").position().left)
                .data("origLeft", $(".active").position().left)
                .data("origWidth", $animation_tool.width());

            xv_lava($($('.members li.active')), 500);


        }

        /*===================
		5-Portfolio 
		===================*/
		
		
		function onImagesLoaded($container, callback) {
            var $images = $container.find("img");
            var imgCount = $images.length;
            if (!imgCount) {
               
                callback();
            } else {
                $("img", $container).each(function () {
                    $(this).one("load error", function () {
                        imgCount--;
                        if (imgCount === 0) {
                            callback();
                        }
                    });
                    if (this.complete) $(this).load();
                });
            }
        }

        onImagesLoaded($(".projects"), function () {

           var $containerfolio = $('.projects');
            $containerfolio.show();

           if ($containerfolio.length) {
				$containerfolio.isotope({
					layoutMode: 'fitRows',
					filter: '*',
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
			}
	
			$('#filter-out li a').click(function () {
				$('#filter-out li').removeClass("active");
				$(this).parent().addClass("active");
				var selector = $(this).attr('data-filter');
				$containerfolio.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
				return false;
			});

        });
		
    }).resize();


    /*===================
    6-Parallax
    ===================*/

    //.parallax(xPosition, speedFactor, outerHeight) options:
    //xPosition - Horizontal position of the element
    //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
    //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var testMobile = isMobile.any();
    if (testMobile === null) {
        $('.parallax').parallax("50%", 0.5);
		$('.parallax2').parallax("50%", 0.4);
		


    /*===================
    7-Animations
    ===================*/


        $('.team-visual').bind('inview', function (event, visible) {
            if (visible === true) {

                $('.team-visual').addClass('fadeInUpBig animated');
            }
        });

        $('.contact-info').bind('inview', function (event, visible) {
            if (visible === true) {

                $('.contact-info').addClass('fadeInUp animated');
                $('.footer-social').addClass('fadeInUp animated');
            }
        });

        $('.left').bind('inview', function (event, visible) {
            if (visible === true) {

                $(this).addClass('slideInLeft animated');
            }
        });

        $('.right').bind('inview', function (event, visible) {
            if (visible === true) {

                $(this).addClass('slideInRight animated');
            }
        });

        $('.bottom').bind('inview', function (event, visible) {
            if (visible === true) {

                $(this).addClass('fadeInUpBig animated');
            }
        });

    }

});