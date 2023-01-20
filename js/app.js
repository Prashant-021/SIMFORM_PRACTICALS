$('.owl-carousel').owlCarousel({
    loop:false,
    mouseDrag:false,
    nav:true,
    dots:false,
    lazyLoad:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4.30,
            merge: true,
        },
        1440:{
            items:6.30,
        },
        2560:{
            items:7.30
        }
    }
})

