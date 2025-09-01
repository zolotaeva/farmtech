window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", () => {

	const phoneMask = document.querySelectorAll('.phone');
	const phoneFormInput = document.querySelectorAll('.phoneForm .phone');
	
	
	const maskOptions = {
		mask: '{8}(000)000-00-00',
		lazy: false
	};

	// Функция проверки валидности номера
	const isPhoneValid = (phone) => {
    const cleanedPhone = phone.replace(/_/g, ''); // Убираем _
    const regex = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    return regex.test(cleanedPhone);
};
	

phoneMask.forEach(item => {
  const mask = IMask(item, maskOptions);

  item.addEventListener('focus', () => {
    setTimeout(() => {
      item.setSelectionRange(0, 0);
    }, 0);
  });
});

	phoneFormInput.forEach(item => {
		const submitButton = item.closest('.phoneForm').querySelector('input[type="submit"]');

		item.addEventListener('input', () => {
			const cleanedValue = item.value.replace(/_/g, '');
			submitButton.disabled = !isPhoneValid(cleanedValue);
		});
	});

 document.querySelectorAll(".btn-close").forEach(button => {
		button.addEventListener("click", function () {
				let modal = button.closest(".modal");
				if (modal) {
						modal.querySelectorAll("form").forEach(form => {
								form.reset();
			modal.querySelectorAll('.form-control').forEach(item => {
				item.classList.remove('filled');
			})

						});
				}
		});
});

		
		// Обработка клика по элементам .password-control
    document.body.addEventListener('click', function (event) {
			if (event.target.classList.contains('password-control')) {
					event.preventDefault();
					const passwordInput = event.target.closest('.form-input').querySelector('input');
					if (passwordInput.type === 'password') {
							passwordInput.type = 'text';
							event.target.classList.add('view');
					} else {
							passwordInput.type = 'password';
							event.target.classList.remove('view');
					}
			}
	});
	// Отслеживание заполнения полей
	const formControl = document.querySelectorAll('#reg-example .form-control');
	formControl.forEach(item => {
		if (item.value.trim() !== '') {
			item.classList.add('filled');
		} else {
			item.classList.remove('filled');
		}
	})

    document.body.addEventListener('input', function (event) {
			if (event.target.classList.contains('form-control')) {
					if (event.target.value.trim() !== '') {
							event.target.classList.add('filled');
					} else {
							event.target.classList.remove('filled');
					}
			}
		});
	
		document.body.addEventListener('textarea', function (event) {
			if (event.target.classList.contains('form-control')) {
					if (event.target.value.trim() !== '') {
							event.target.classList.add('filled');
					} else {
							event.target.classList.remove('filled');
					}
			}
		});
	
	// Инициализация Bootstrap tooltips
	const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.forEach(function (tooltipTriggerEl) {
			new bootstrap.Tooltip(tooltipTriggerEl);
	});
	if (document.getElementById('file-upload')) {
		document.getElementById('file-upload').onchange = function(e) {
			document.querySelector('.custom-file-upload').innerText = e.target.files[0].name || 'Прикрепить файл';
		};
	}

	
	
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
  const wrapper = input.closest('.input-file');
  const fileText = wrapper.querySelector('.input-file-text');
  const fileListContainer = fileText;
  const limit = parseInt(input.dataset.limit || 1, 10);

  let files = []; // новые файлы
  let existingFiles = []; // уже загруженные файлы

  function renderFileItem(file, isExisting = false, fileId = null) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    if (isExisting) fileItem.classList.add('existing-file');
    if (fileId) fileItem.dataset.fileId = fileId;

    let nameEl;
    if (isExisting && file.url) {
      nameEl = document.createElement('a');
      nameEl.href = file.url;
      nameEl.target = "_blank";
      nameEl.textContent = file.name;
    } else {
      nameEl = document.createElement('span');
      nameEl.className = 'file-name';
      nameEl.textContent = file.name;
    }

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'file-remove';
    removeBtn.textContent = '×';

    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isExisting) {
        existingFiles = existingFiles.filter(f => f.id !== fileId);
      } else {
        files = files.filter(f => f !== file);
      }
      fileItem.remove();
    });

    fileItem.append(nameEl, removeBtn);
    fileListContainer.appendChild(fileItem);
  }

  // обработка новых файлов
  input.addEventListener('change', function() {
		const newFiles = Array.from(this.files);
		const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

		newFiles.forEach(file => {
			const ext = file.name.split('.').pop().toLowerCase();
			const isAllowed = allowedTypes.includes(file.type) || ['pdf', 'jpg', 'jpeg', 'png'].includes(ext);
			if (!isAllowed) {
				alert(`Файл "${file.name}" имеет недопустимый формат. Разрешены только PDF, JPG, PNG.`);
				return; 
			}
      if (files.length + existingFiles.length < limit) {
        if (!files.some(f => f.name === file.name) && 
            !existingFiles.some(f => f.name === file.name)) {
          files.push(file);
          renderFileItem(file);
        }
      }
    });

    input.value = '';
  });

  // функция для добавления уже загруженных файлов
  //function addExistingFile(name, fileId, url) {
  //  existingFiles.push({ name, id: fileId, url });
  //  renderFileItem({ name, url }, true, fileId);
  //}

  // соберём файлы, что уже есть в DOM
  wrapper.querySelectorAll('.file-item.existing-file').forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      const name = link.textContent.trim();
      const url = link.href;
      const id = item.dataset.fileId || null;
      existingFiles.push({ name, id, url });

      // вешаем обработчик удаления на уже существующую кнопку
      const removeBtn = item.querySelector('.file-remove');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          existingFiles = existingFiles.filter(f => f.id !== id);
          item.remove();
        });
      }
    }
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

	const filterItems = document.querySelectorAll('.filter__item .filter-title');

	filterItems.forEach(item => {
		item.addEventListener('click', () => {
			if (item.parentElement.classList.contains('active')) {
				item.parentElement.classList.remove('active');
				
			} else {
				document.querySelectorAll('.filter__item').forEach(item => {
					item.classList.remove('active');
				});
				item.parentElement.classList.add('active');
				
			}
		})
	})

	//регистрация на курс
	
	//document.querySelectorAll('.select-dates.required').forEach(function (wrapper) {
	//	const select = wrapper.querySelector('select');
	//	const displaySpan = wrapper.querySelector('.fsb-button span');
	//	function updateAsterisk() {
	//		const selectedOption = select.options[select.selectedIndex];
	//		const text = selectedOption.textContent.trim();

	//		if (selectedOption.value === '') {
	//			wrapper.querySelector('.fsb-button span').innerHTML = `${text} <span class="red">*</span>`;
	//		} else {
	//			displaySpan.textContent = text; 
	//		}
	//	}
	//	updateAsterisk();
	
	//	select.addEventListener('change', updateAsterisk);
	//});

	//Инициализация Choices
	const elements = document.querySelectorAll('.js-choices');
		elements.forEach(el => {
			new Choices(el, {
				searchEnabled: false, // поиск не нужен
				itemSelectText: '',   // убираем подсказку "нажмите для выбора"
				allowHTML: false,
				shouldSort: false
			});
		});
	
	//Валидация форм
  document.querySelectorAll('form').forEach(form => {
    // валидация для select
    form.querySelectorAll('.required select').forEach(el => {
      el.addEventListener('change', () => {
        const choicesWrapper = el.closest('.choices');
        if (el.value.trim()) {
          choicesWrapper?.classList.remove('error');
        }
      });
		});
		//валидация для input/textarea
		form.querySelectorAll('.form-input.required input, .form-input.required textarea').forEach(el => {
      el.addEventListener('input', () => {
        if (el.value.trim()) {
          el.classList.remove('error');
        }
      });
		});
		//валидация для файлов
		form.querySelectorAll('.input-file.required').forEach(wrapper => {
			const colItem = wrapper.closest('.col-item');

			// при выборе файла
			wrapper.querySelector('input[type=file]').addEventListener('change', () => {
				const fileList = wrapper.querySelectorAll('.file-item');
				if (fileList.length > 0) {
					wrapper.classList.remove('error');
					if (colItem) colItem.classList.remove('error');
				}
			});

			// при удалении файла
			wrapper.addEventListener('click', (e) => {
				if (e.target.classList.contains('file-remove')) {
					e.preventDefault();
					e.target.closest('.file-item').remove();
					const fileList = wrapper.querySelectorAll('.file-item');
					if (fileList.length === 0) {
						wrapper.classList.add('error');
						if (colItem) colItem.classList.add('error');
					}
				}
			});
		});

    // Проверка при сабмите
    form.addEventListener('submit', function (e) {
      let isValid = true;
      let firstErrorEl = null;

			// Проверка select
      form.querySelectorAll('.required select').forEach(el => {
        if (!el.value.trim()) {
          isValid = false;

          const choicesWrapper = el.closest('.choices');
          if (choicesWrapper) {
            choicesWrapper.classList.add('error');
            if (!firstErrorEl) {
              firstErrorEl = choicesWrapper;
            }
          }
        }
			});
			
			// Проверка input/textarea
			form.querySelectorAll('.form-input.required input, .form-input.required textarea').forEach(el => {
        if (!el.value.trim()) {
          isValid = false;
          el.classList.add('error');
          if (!firstErrorEl) firstErrorEl = el;
				}
				if (el.closest('.form-control.phone')) {
					const digits = el.value.replace(/\D/g, '');

					if (digits.length < 11) { 
						isValid = false;
						el.classList.add('error');
						if (!firstErrorEl) firstErrorEl = el;
					} else {
						el.classList.remove('error');
					}
				}
				
			
			});


			
			// Проверка файлов
     form.querySelectorAll('.input-file.required').forEach(wrapper => {
			const colItem = wrapper.closest('.col-item');
			const fileList = wrapper.querySelectorAll('.file-item');

			if (fileList.length === 0) {
				isValid = false;
				wrapper.classList.add('error');
				if (colItem) colItem.classList.add('error');
				if (!firstErrorEl) firstErrorEl = wrapper;
			} else {
				wrapper.classList.remove('error');
				if (colItem) colItem.classList.remove('error');
			 }
			
		});

			//Если есть ошибки не отправляем форму
      if (!isValid) {
        e.preventDefault();

        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }

        console.warn("Валидация формы не пройдена");
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
if (document.querySelector('#rangeSlider')) {
let rangeMin = document.querySelector(".range-min");
let rangeMax = document.querySelector(".range-max");           
	const rangeSlider = new rSlider({
		target: '#rangeSlider',
		values: { min: 2000, max: 40000 },
		step: 1000,
		range: true,
		tooltip: false,
		scale: false,
		labels: false,
		set: [4000, 24000],
		//width: '360px',
		onChange: function (vals) {
			var arrVals = vals.split(',');
			rangeMin.value = arrVals[0];
			rangeMax.value = arrVals[1];
		}

	});
}
document.addEventListener("DOMContentLoaded", () => {
	const cookieBlock = document.querySelector('.cookie');
	const cookieBtn = document.querySelector('.cookie__btn');

	// Проверка: есть ли уже согласие
	if (getCookie('cookie_consent') === 'accepted') {
		cookieBlock.style.display = 'none';
	}

	// Обработка клика
	cookieBtn.addEventListener('click', function () {
		setCookie('cookie_consent', 'accepted', 365);
		cookieBlock.style.display = 'none';
	});

	// Установка cookie
	function setCookie(name, value, days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
	}

	// Получение cookie
	function getCookie(name) {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		return match ? match[2] : null;
	}
});


	
