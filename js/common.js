window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", () => {
	const btnBurger = document.querySelector('.js-toggle-menu');
	const menuTop = document.querySelector('#header_menu');
	const body = document.querySelector('body');

	const btnSearch = document.querySelector('.toggle-search');
	const btnSearchClose = document.querySelector('.close-search');
	const headerSearch = document.querySelector('.header__search');
	
	if (document.documentElement.clientWidth <= 991) {
		btnBurger.addEventListener('click', function () {
			if (!(menuTop.classList.contains('active'))) {
				btnBurger.classList.add('close');
				menuTop.classList.add('active');
				body.classList.add('no-scroll');
			} else {
				btnBurger.classList.remove('close');
				menuTop.classList.remove('active');
				body.classList.remove('no-scroll');
			}
		});
	}

	btnSearch.addEventListener('click', function () {
		if (!(headerSearch.classList.contains('active'))) {
			headerSearch.classList.add('active');
		} else {
			headerSearch.classList.remove('active');
		}
	});

	btnSearchClose.addEventListener('click', function () {
		headerSearch.classList.remove('active');
	});

	if (document.documentElement.clientWidth >= 768 && document.querySelector(".test__nav")) {

		const testNav = document.querySelector(".test__nav");
		const testBox = testNav.closest('.test');
		const testBoxTop = testBox.offsetTop;
		const testWidth = testBox.offsetWidth;
		const testBoxHeight = testBoxTop + testBox.offsetHeight;


		window.addEventListener('scroll', function () {
			let scrollTop = window.scrollY;

			if (scrollTop >= testBoxTop && scrollTop <= testBoxHeight - testNav.offsetHeight) {
				testNav.classList.add('fixed');
				testNav.style.width = testWidth + 'px';
			} else {
				testNav.classList.remove('fixed');
				testNav.style.width = 'auto';
			}
		});
	};

	document.querySelectorAll('.input-file input[type=file]').forEach(input => {
    input.addEventListener('change', function() {
        let file = this.files[0];
        this.closest('.input-file').querySelector('.input-file-text').innerHTML = file.name;
    });
	});
	
	var outerSwiper = new Swiper('.outer-swiper', {
		speed: 500,
		
		navigation: {
			nextEl: '.js-schedule-next',
			prevEl: '.js-schedule-prev',
		},
		

	});
		
	const innerSwiper = new Swiper('.inner-swiper', {
		speed: 500,
		effect: "fade",
			navigation: {
				nextEl: '.js-month-next',
				prevEl: '.js-month-prew',
		},
		
	});

	const scheduleSwiper = new Swiper('.schedule-new-swiper', {
		speed: 500,
		spaceBetween: 20,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'progressbar'
		},
		
		navigation: {
			nextEl: '.schedule-new-swiper .btn-prev',
			prevEl: '.schedule-new-swiper .btn-next',
		},
		breakpoints: {
			0: {
				touchRatio: 0,
				allowTouchMove: false,
			},
			1600: {
				touchRatio: 1,
				allowTouchMove: true,
		}
	},
		
	});

	//валидация email
	const emailInput = document.querySelectorAll('.form-email .email');
	emailInput.forEach(email => {
		email.addEventListener('input', function (event) {
			const input = event.target;
			const value = input.value;
			
			// Найти позицию символа '@'
			const atIndex = value.indexOf('@');
	
			// Если '@' найден, отрезаем часть после него
			if (atIndex !== -1) {
				input.value = value.slice(0, atIndex);
			}
		});
	});




		ymaps.ready(function () {
			var myMap = new ymaps.Map('map', {
				center: [53.18708907123992, 50.094066499999926],
				zoom: 15,

			}, {
				searchControlProvider: 'yandex#search'
			}),

				myPlacemark = new ymaps.Placemark([53.18708907123992, 50.094066499999926], {
					hintContent: 'Текст при наведении',
					balloonContent: 'Описание'
				}, {
					preset: 'islands#blueEducationIcon',
					iconColor: '#1068D7'
				
				});
			myMap.controls.remove('searchControl');
			myMap.geoObjects
				.add(myPlacemark);

		});

			
	



});
