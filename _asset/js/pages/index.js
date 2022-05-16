$(document).ready(function(){

	/* ==========================================================================
     Morphing
     ========================================================================== */

	const s = Snap(".morphing");
	const stampSky = Snap.select('.stamp-sky');
	const stampGrey = Snap.select('.stamp-grey');
	const stampBlue = Snap.select('.stamp-blue');
	const stampGold = Snap.select('.stamp-gold');

	const shapes = {
		'sky': {
			shape: stampSky,
			points: stampSky.node.getAttribute('d'),
			fill: stampSky.node.getAttribute('fill'),
			back: '#97A7C3',
		},
		'grey': {
			shape: stampGrey,
			points: stampGrey.node.getAttribute('d'),
			fill: stampGrey.node.getAttribute('fill'),
			back: '#273045',
		},
		'blue': {
			shape: stampBlue,
			points: stampBlue.node.getAttribute('d'),
			fill: stampBlue.node.getAttribute('fill'),
			back: '#153270',
		},
		'gold': {
			shape: stampGold,
			points: stampGold.node.getAttribute('d'),
			fill: stampGold.node.getAttribute('fill'),
			back: '#D7CBB5',
		},
	}


	/* ==========================================================================
     Promo Slider
     ========================================================================== */

	const promoSlider = document.querySelector('.promo-slider');

	const promoSliderSpeed = 500;
	const promoSliderDelay = 5000;

	const promoSwiper = new Swiper('.promo-slider', {
		grabCursor: true,
		speed: promoSliderSpeed,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		autoplay: {
			delay: promoSliderDelay,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
		},
		navigation: {
			nextEl: '.promo-slider .slider-arrow_next',
			prevEl: '.promo-slider .slider-arrow_prev',
		},
	});

	updateProgresPromoSlider();
	updateNavPromoSliderColor();
	sliderTimer();

	promoSwiper.on('slideChange', function () {
		updateProgresPromoSlider();
		updateNavPromoSliderColor();
		morphing();
		sliderTimer();
	});

	function sliderTimer() {
		const timer = promoSlider.querySelector('.slider-progress__timer>div');
		timer.style.transition = 'background-color .5s, transform .5s';
		timer.style.width = '0%';

		setTimeout(function(){
			timer.style.transition = 'background-color .5s, transform .5s, width linear ' + promoSliderDelay + 'ms';
			timer.style.width = '100%';
		}, 0);
	}

	function morphing() {
		const currentSlide = promoSwiper.slides[promoSwiper.activeIndex];
		const currentMorphing = currentSlide.dataset.morphing;
		const previousSlide = promoSwiper.slides[promoSwiper.previousIndex];
		const previousMorphing = previousSlide.dataset.morphing;
		const bg = promoSlider.querySelector('.promo-slider__bg');
		const back = promoSlider.querySelector('.promo-slider__bg__back');

		if (currentMorphing !== 'none') {
			bg.classList.remove('hide');

			shapes['sky'].shape.animate({
				d: shapes[currentMorphing].points,
				fill: shapes[currentMorphing].fill,
			}, promoSliderSpeed);

			back.classList.remove(previousMorphing);
			back.classList.add(currentMorphing);
		} else {
			bg.classList.add('hide');
		}
	}

	function updateProgresPromoSlider() {
		const current = promoSlider.querySelector('.slider-progress__num_current');
		const total = promoSlider.querySelector('.slider-progress__num_total');

		current.textContent = twoDigitNumber(promoSwiper.activeIndex + 1);
		total.textContent = twoDigitNumber(promoSwiper.slides.length);
	}

	function updateNavPromoSliderColor() {
		const currentSlide = promoSwiper.slides[promoSwiper.activeIndex];
		const currentMorphing = currentSlide.dataset.morphing;
		const nav = promoSlider.querySelector('.promo-slider__nav');
		const classNavDark = 'promo-slider__nav_dark';

		switch (currentMorphing) {
			case 'none':
			case 'blue':
			case 'grey':
				nav.classList.add(classNavDark);
				break;
			default:
				nav.classList.remove(classNavDark);
		}
	}

	function twoDigitNumber(num) {
		const str = String(num);

		if (str.length === 1) {
			return '0' + str;
		}

		return str;
	}

	/* ==========================================================================
     Form Check
     ========================================================================== */

	const formsCheck = document.querySelectorAll('.form-check');

	for (const formCheck of formsCheck) {
		const classSlideActive = 'is-slide';
		const classNavActive = 'is-active';
		const firstLink = formCheck.querySelector('.form-check-nav__item:nth-child(1)');
		const secondLink = formCheck.querySelector('.form-check-nav__item:nth-child(2)');
		const body = formCheck.querySelector('.form-check__body');

		if (window.matchMedia('(max-width: 767px)').matches) {
			firstLink.classList.remove(classNavActive);
		}

		firstLink.addEventListener('click', function (e) {
			secondLink.classList.remove(classNavActive);
			firstLink.classList.add(classNavActive);
			formCheck.classList.remove(classSlideActive);
			bodyShow();
		});

		secondLink.addEventListener('click', function (e) {
			firstLink.classList.remove(classNavActive);
			secondLink.classList.add(classNavActive);
			formCheck.classList.add(classSlideActive);
			bodyShow();
		});

		function bodyShow() {
			if (!body.classList.contains('is-opened')) {
				body.classList.add('is-opened');
			}
		}
	}

	/* ==========================================================================
     Banner Slider
     ========================================================================== */

	const bannerSlider = document.querySelector('.banner-slider');

	const bannerSwiper = new Swiper('.banner-slider', {
		grabCursor: true,
		speed: 500,
		navigation: {
			nextEl: '.banner-slider .slider-arrow_next',
			prevEl: '.banner-slider .slider-arrow_prev',
		},
	});

	updateColorBannerSlider();
	updatePagesBannerSlider();

	bannerSwiper.on('slideChange', function () {
		updateColorBannerSlider();
		updatePagesBannerSlider();
	});

	function updatePagesBannerSlider() {
		const totalSlides = bannerSwiper.slides.length;
		const currentSlides = bannerSwiper.activeIndex;
		const totalElement = bannerSlider.querySelector('[data-total]');
		const currentElement = bannerSlider.querySelector('[data-current]');

		totalElement.textContent = twoDigitNumber(totalSlides);
		currentElement.textContent = twoDigitNumber(currentSlides + 1);
	}

	function updateColorBannerSlider() {
		const classSlideDark = 'banner-slider__slide_dark';
		const classSliderDark = 'banner-slider_dark';
		const currentSlide = bannerSwiper.slides[bannerSwiper.realIndex];

		if (currentSlide.classList.contains(classSlideDark)) {
			bannerSlider.classList.add(classSliderDark);
		} else {
			bannerSlider.classList.remove(classSliderDark);
		}
	}

	/* ======================================================================== */
});









