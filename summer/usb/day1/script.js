document.addEventListener('DOMContentLoaded', function() {
    // Загружаем символы из JSON файла
    fetch('passwords.json')
        .then(response => response.json())
        .then(data => {
            const symbols = data.symbols;
            const codeLength = symbols.length;
            const codeInputsContainer = document.getElementById('codeInputs');
            
            // Создаем инпуты для каждого символа
            for (let i = 0; i < codeLength; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.className = 'code-input';
                input.dataset.correctValue = symbols[i];
                codeInputsContainer.appendChild(input);
                
                // Автопереход к следующему полю при вводе
                input.addEventListener('input', function() {
                    if (this.value.length === 1) {
                        if (i < codeLength - 1) {
                            this.nextElementSibling.focus();
                        } else {
                            document.getElementById('checkButton').focus();
                        }
                    }
                });
                
                // Обработка Backspace
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Backspace' && this.value.length === 0 && i > 0) {
                        this.previousElementSibling.focus();
                    }
                });
            }
            
            // Обработчик кнопки проверки
            document.getElementById('checkButton').addEventListener('click', checkCode);
            
            // Обработчик закрытия модального окна
            document.getElementById('closeModal').addEventListener('click', function() {
                document.getElementById('successModal').style.display = 'none';
            });
        })
        .catch(error => console.error('Ошибка загрузки символов:', error));
});

function checkCode() {
    const inputs = document.querySelectorAll('.code-input');
    let allCorrect = true;
    const container = document.querySelector('.container');
    
    // Проверяем каждый ввод
    inputs.forEach(input => {
        if (input.value.toUpperCase() !== input.dataset.correctValue.toUpperCase()) {
            allCorrect = false;
            input.classList.add('error-border');
        } else {
            input.classList.remove('error-border');
        }
    });
    
    if (allCorrect) {
        // Код верный - показываем модальное окно
        document.getElementById('successModal').style.display = 'flex';
    } else {
        // Код неверный - трясем и очищаем
        container.classList.add('shake');
        
        setTimeout(() => {
            container.classList.remove('shake');
        }, 500);
        
        setTimeout(() => {
            inputs.forEach(input => {
                input.value = '';
                input.classList.add('error-border');
            });
            inputs[0].focus();
        }, 200);
    }
}