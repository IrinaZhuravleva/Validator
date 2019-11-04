//функция конструктор, создающая объект
const Validator = function(options) {
	const 	form = document.getElementById(options.id),
			elementsForm = [...form.elements].filter(item => item.tagName !== 'BUTTON'),
			
			//создаем коллекцию
			error = new Set(),
			pattern = {
				email: /^\w+@\w+\.\w+$/,
				phone: /^\+?[78]([()-]*\d){10}$/
			},
			validatorMethod = {
				notEmpty(elem) {
					if(elem.value.trim() === ''){
						return false;
					}
					return true;
				},
				pattern(elem, pattern) {
					return pattern.test(elem.value);
				}
			};
	// console.log('elementsForm: ', elementsForm);

	const isValid = (elem) => {
		const method = options.method[elem.id];
		// console.log(method);
		if (method !== undefined) {
			return method.every(item => validatorMethod[item[0]](elem, pattern[item[1]]));	
		}

		return true;
	};


	const checkIt = (event) => {
		let target = event.target;

		if (isValid(target)) {
			//элемент, на котором произошло событие
			showSuccess(target);
			error.delete(target);
		} else {
			showError(target);
			error.add(target);
		}
		// console.log(error);
	};

	// const checkItElem = (elem) => {
		
	// 	// const temp = elementsForm.some((item) => {
	// 	// 	return elem === item
	// 	// });

	// 	// const temp = elementsForm.some(item => elem === item);

	// 	if (elementsForm.some(item => elem === item)) {
	// 		target = elem;
	// 	}

	// 	if (isValid(elem)) {
	// 		//элемент, на котором произошло событие
	// 		showSuccess(elem);
	// 		error.delete(elem);
	// 	} else {
	// 		showError(elem);
	// 		error.add(elem);
	// 	}
	// };

	elementsForm.forEach((elem) => {
			elem.addEventListener('change', checkIt);
	});

	// for(item i=0; i < form.elements.length; i++){
	// 	elementsForm = (form.elements[i].tagName !== 'BUTTON') ?
	// }


	//делаем из псевдомассива - массив
	// console.log([...form.elements]);


	// console.log(options.id)
	const showError = (elem) => {
		elem.classList.remove('validator_success');
		elem.classList.add('validator_error');
		// elem.style.cssText = 'border: 2px solid red';
		// elem.style.border = '2px solid red';

		//создаем элемент
		const errorDiv = document.createElement('div');
		//прописываем ему стили
		errorDiv.textContent = 'Ошибка в этом поле';
		errorDiv.classList.add('error-message');
		// errorDiv.style.cssText = 'font-size: 12px; color: red;';
		elem.insertAdjacentElement('afterend', errorDiv);

	};

	const showSuccess = (elem) => {
		elem.classList.remove('validator_error');
		elem.classList.add('validator_success');
		if(elem.nextElementSibling.classList.contains('error-message')){
			elem.nextElementSibling.remove();
		}
	};

	for(let key in options.pattern) {
		pattern[key] = options.pattern[key];
	}
	// console.log(pattern);

	//ограничить отправку формы
	form.addEventListener('submit', (event) => {
		elementsForm.forEach((elem) => {
			checkIt({target: elem});
		});
		if (error.size){
			event.preventDefault();
		}
	})

};



