document.addEventListener('DOMContentLoaded', function () {
    const checkButton = document.getElementById('text-switch');
    let form;
    const root = document.documentElement;

    checkButton.addEventListener('click', () => {
        if (checkButton.checked) {
            form = document.createElement('form');
            form.innerHTML = '<fieldset> ' +
                '<legend>Settings</legend> ' +
                '<label> ' +
                '<button type="button" id="increase-font" style="width: 30px; height: 30px">+</button> ' +
                '<button type="button" id="decrease-font" style="width: 30px; height: 30px">-</button>' +
                'Text size ' +
                '</label> ' +
                '<br> ' +
                '<label> ' +
                '<input type="color" id="text-color-picker">' +
                'Text color ' +
                '</label> ' +
                '</fieldset>'
            form.id = 'settings-form';
            checkButton.parentElement.appendChild(form);
            const increaseFontButton = document.getElementById('increase-font');
            const decreaseFontButton = document.getElementById('decrease-font');
            const textColorPicker = document.getElementById('text-color-picker');

            if (sessionStorage.getItem('textColor')) {
                textColorPicker.value = sessionStorage.getItem('textColor');
            }

            increaseFontButton?.addEventListener('click', function () {
                const currentFontSize = window.getComputedStyle(root).getPropertyValue('font-size');
                const newSize = (parseInt(currentFontSize) + 1) + 'px'; // Увеличиваем на 1px
                root.style.fontSize = newSize;

                // Сохраняем новый размер шрифта в sessionStorage
                sessionStorage.setItem('fontSize', newSize);
            });

            decreaseFontButton?.addEventListener('click', function () {
                const currentFontSize = window.getComputedStyle(root).getPropertyValue('font-size');
                const newSize = (parseInt(currentFontSize) - 1) + 'px'; // Уменьшаем на 1px
                root.style.fontSize = newSize;

                // Сохраняем новый размер шрифта в sessionStorage
                sessionStorage.setItem('fontSize', newSize);
            });

            textColorPicker?.addEventListener('input', function () {
                const selectedColor = textColorPicker.value;
                root.style.color = selectedColor;

                // Сохраняем новый цвет текста в sessionStorage
                sessionStorage.setItem('textColor', selectedColor);
            });
        } else {
            form.remove();
        }
    });

    // Проверяем наличие сохраненных настроек в sessionStorage
    if (sessionStorage.getItem('fontSize')) {
        root.style.fontSize = sessionStorage.getItem('fontSize');
    }

    if (sessionStorage.getItem('textColor')) {
        root.style.color = sessionStorage.getItem('textColor');
    }
});