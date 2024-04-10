document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const submitBtn = document.getElementById('submitBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeBtn');
    const errorIcons = document.querySelectorAll('.error-icon');

    submitBtn.addEventListener('click', function () {
        hideErrorIcons();
        if (validateForm()) {
            const income = parseFloat(document.getElementById('aincome').value) + parseFloat(document.getElementById('eincome').value);
            const deductions = parseFloat(document.getElementById('deductions').value);
            const age = document.getElementById('age').value;
            let tax = 0;
            if (income - deductions > 800000) {
                const taxableAmount = income - deductions - 800000;
                switch (age) {
                    case "<40":
                        tax = taxableAmount * 0.3;
                        break;
                    case "40-60":
                        tax = taxableAmount * 0.4;
                        break;
                    case ">=60":
                        tax = taxableAmount * 0.1;
                        break;
                }
            }
            const overallIncome = (income - tax).toFixed(2);
            showModal(overallIncome, tax.toFixed(2));
        }
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function showModal(overallIncome, taxDeduction) {
        const modalContent = document.getElementById('taxResult');
        modalContent.innerHTML = `
            <h6>Your overall income after tax deduction:</h6>
            <h2>${overallIncome} Lakhs</h2>
            <h4>After tax deductions: ${taxDeduction} Lakhs</h4>
        `;

        modal.style.display = 'block';
    }

    function validateForm() {
        let isValid = true;
        const incomeRegex = /^\d+(\.\d+)?$/;
        const incomeFields = ['aincome', 'eincome', 'deductions'];
        for (let field of incomeFields) {
            const value = document.getElementById(field).value;
            if (!incomeRegex.test(value) || value === '') {
                isValid = false;
                document.getElementById(`${field}Error`).style.display = 'inline';
                document.getElementById(`${field}`).classList.add('error');
            }
        }
        const age = document.getElementById('age').value;
        if (age === '') {
            isValid = false;
            document.getElementById('ageError').style.display = 'inline';
        }
        return isValid;
    }

    function hideErrorIcons() {
        for (let icon of errorIcons) {
            icon.style.display = 'none';
        }
    }
});

document.addEventListener('mouseover', function (event) {
    if (event.target.classList.contains('error')) {
        const errorIcon = event.target.nextElementSibling;
        errorIcon.style.display = 'inline';
        errorIcon.title = 'Invalid input';
    }
});

document.addEventListener('mouseout', function (event) {
    if (event.target.classList.contains('error')) {
        const errorIcon = event.target.nextElementSibling;
        errorIcon.style.display = 'none';
    }
});
