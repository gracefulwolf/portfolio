let scrTop= 0;
let ui = {
	swiper : function (){ 
		const uiSwiper = new Swiper('.ui-swiper', {
			slidesPerView: 1,
      spaceBetween: 30,
			centeredSlides: true,
			autoHeight : false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
				renderBullet: function (index, className) {
					return '<button type="button" class="' + className + '">' + [index+1] + '번째 슬라이드</button>';
				},
      },
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1200: {
				  slidesPerView: 3,
				},
				800: {
				  slidesPerView: 2,
				},
			},

		});
		$('.swiper-btn-prev').on('click', function(){

		})
	},
	ajaxEvent : function (){
		$('.ui-ajax').each(function(idx, el){
			$.ajax({
				type:"get",
				url:$(el).attr('data-ajax-url'),
				dataType:"json",
				success: function(data){
					if ($(el).hasClass('swiper-wrapper')) {
						let html = '';
						
						for (var i = 0; i < data.length; i++) {
							html = `
							<div class="swiper-slide">
								<a href="${data[i].url ? data[i].url : '#popAlert'}" ${data[i].url ? 'target="_blank" title="새창열림"' : ''} class="project-item ${data[i].url ? '' :'ui-popup' }" >
									<div class="img-wrap"><img src="${data[i].imgSrc ? data[i].imgSrc : '../../images/noimagne.png'}" alt="${data[i].imgAlt == undefined ? '' : data[i].imgAlt}"></div>
									<div class="project-info">
										<div class="project-tit">${data[i].name}</div>
										<div class="project-txt">${data[i].txt}</div>
									</div>
								</a>
							</div>
						`
						$(el).append(html);
						}
					}

					ui.popup();
				},
				error:function(){
					console.log("통신에러");
				}
			})
		})
	},
	intro :  function (){
		$('.ui-bg').addClass('on');
		setTimeout( function (){
			ui.mainText();
		},2000)
	},
	mainText: function(){
		$('.main-title1').addClass('on');
		$('.main-title2').addClass('on');
		setTimeout(function(){
			$('.arrow-icon').addClass('on');
		},2000)
	},
	scrollTo: function(value){
		let target
		if (typeof value != 'number') {
			if (value == '#intro') {
				target = document.querySelector('body')
			} else {
				target = document.querySelector(value)
			}
			
			window.scrollTo({top:$(target).offset().top, behavior: 'smooth'} )
		} else {
			window.scrollTo({top:value, behavior: 'smooth'} )
		}
	},
	scrollAnimation: function (){
		let $animation = $('[data-animation]');
		let $window = $(window);

		$(window).on('scroll resize',function(){
			$elements = $.find('*[data-animation]');
			if($elements.length > 0){
				checkInView();
			}
		 });
		 function checkInView() {
			let $winHeight = $window.height(),
				$scrollTop = $window.scrollTop(),
				$winBottom = ($scrollTop + $winHeight);
	
			$.each($elements, function() {
				let $el = $(this),
					$elHeight = $($el).outerHeight(),
					$elTop = $($el).offset().top,
					//$elCenter = $elTop + ($elHeight/2),
					$elBottom = $elTop + $elHeight,
					$animationClass = $el.data('animation'),
					$delay = $el.data('delay'),
					$duration = $el.data('duration'),
					$gap = 200;
	
				if(!$el.hasClass('animated') && $animationClass != 'on'){
					if($delay > 0){
						$el.css({
							'-webkit-animation-delay':$delay+'ms',
							'animation-delay':$delay+'ms'
						});
					}
					if($duration > 0){
						$el.css({
							'-webkit-animation-duration':$duration+'ms',
							'animation-duration':$duration+'ms'
						});
					}
	
					$el.addClass('animated');
				}
	
				if ($elTop >= $scrollTop && $elBottom <= $winBottom) {
					$el.addClass($animationClass);
				}
			});
		}
	},
	nav: function(){
		$('#nav a').on('click', function(e){
			e.preventDefault();

			ui.scrollTo($(this).attr('href'))
		})
	},
	popup : function (){
		const $popup = $('.ui-popup');
    $popup.each(function(){
        let $this = $(this);
        $this.on('click',function(){
        	const $thHref = $this.attr('href');
					if ($this.closest('.swiper-slide-active').length > 0 ) {
						$($thHref).addClass('visible');
						$('body').css({
							'overflow':'hidden',
							'touch-action':'none',
							'-webkit-overflow-scolling':'none',
							'overscroll-behavior':'none'
						});
					}
					
        });
    });

    var $popClose = $('.pop-close');

    $popClose.on('click',function(){
        $(this).parents('.pop-wrap').removeClass('visible');
        $('body').removeAttr('style');
    });
	}
}


$(function(){
	ui.swiper();
	ui.ajaxEvent();
	$('.main-title1').lettering()
	$('.main-title2').lettering()
	ui.intro();
	ui.nav();
	ui.scrollAnimation();
	$('.btn-scroll').on('click', function(){
		ui.scrollTo('#works')
	})
	$('.btn-top').on('click', function(){
		ui.scrollTo(0)
	})
	$('.content').each(function(idx,el){
		if ($(el).attr('scr-top') == undefined){
			$(el).attr('scr-top', $(el).offset().top)
		}
	})
	$('.title').each(function(idx,el){
		if ($(el).attr('scr-top') == undefined){
			$(el).attr('scr-top', $(el).offset().top)
		}
	})
	$(window).on('scroll', function(){
		scrTop = $(this).scrollTop();

		if (scrTop >= Number($('#works').attr('scr-top'))) {
			$('.arrow-icon').stop().animate({
				opacity :0
			})
			if (!$('.btn-top').hasClass('on')){
				$('.btn-top').addClass('on')
			}
			
		} else {
			$('.arrow-icon').stop().animate({
				opacity :1
			})
			if ($('.btn-top').hasClass('on')){
				$('.btn-top').removeClass('on')
			}
			
		}

		if (scrTop >= Number($('#works').attr('scr-top')) - 90){
			if (!$('header').hasClass('on')) {
				$('header').addClass('on')
			}
		} else {
			if ($('header').hasClass('on')) {
				$('header').removeClass('on')
			}
		}
	})
	ui.popup();

	$('.btn-nav').on('click', function(){
		if ($(this).hasClass('active')){
			$(this).removeClass('active');
			$('#nav').removeClass('active')
			$('header').removeClass('active')
		} else {
			$(this).addClass('active')
			$('#nav').addClass('active')
			$('header').addClass('active')
		}
	})
})