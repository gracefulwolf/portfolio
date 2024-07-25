let ui = {
	swiper : function (){ 
		const uiSwiper = new Swiper('.ui-swiper', {
			slidesPerView: 3,
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
							console.log(data[i].imgSrc)
							html = `
							<div class="swiper-slide">
								<a href="" class="project-item">
									<img src="${data[i].imgSrc ? data[i].imgSrc : '../../images/noimagne.png'}" alt="${data[i].imgAlt == undefined ? '' : data[i].imgAlt}">
									<div class="project-info">
										<div class="project-tit">${data[i].name}</div>
										<div class="project-txt">${data[i].txt}</div>
									</div>
								</a>
							</div>
						`
						$(el).append(html)
						}
						
					}
				},
				error:function(){
					console.log("통신에러");
				}
			})
		})
	}
}


$(function(){
	ui.swiper();
	ui.ajaxEvent();
	$('.main-title1').lettering()
	$('.main-title2').lettering()
})