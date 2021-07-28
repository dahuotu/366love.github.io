(function($) {
	"use strict"
	// Preloader
	$(window).on('load', function() {
		app.loadData();
	});

	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function() {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});

	// Mobile dropdown
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});

	// On Scroll
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	// Owl Carousel
	$('#about-slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 15,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		dots: true,
		autoplay: true,
		animateOut: 'fadeOut'
	});

	$('#testimonial-slider').owlCarousel({
		loop: true,
		margin: 15,
		dots: true,
		nav: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			992: {
				items: 2
			}
		}
	});

})(jQuery);

var app = new Vue({
	el: '#appform',
	data: {
		dataList: "",
		dataPage: "",
		productId: 0,
	},
	methods: {
		loadData: function() {
			$.ajax({
				type: 'get',
				url: 'product/product.txt',
				dataType: "json",
				success: function(res) {
					if(res != null) {
						var id = app.getQueryString('id');
						if(id) {
							app.loadProduct(id);
							app.dataList = res.data;
							app.productId = id;
						} else {
							app.dataList = res.data;
							$("#preloader").delay(600).fadeOut();
						}
					}
				}
			});
		},
		goProduct: function(id) {
			// 去订单详情
			location.href = 'tel:13922371126';
		},
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
			if(r != null) return unescape(r[2]);
			return null;
		}
	}
});