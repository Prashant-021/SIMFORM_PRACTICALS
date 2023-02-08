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
            items:6.5,
            merge: true,
        }
    }
})

