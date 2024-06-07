import { CountUp } from './node_modules/countup.js/dist/countUp.js';
document.addEventListener("DOMContentLoaded", function() {


    const form = document.getElementById('age-form');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');

    const yearsOutput = document.getElementById('years');
    const monthsOutput = document.getElementById('months');
    const daysOutput = document.getElementById('days');

    const calculateArrow = document.querySelector('.bg');

    calculateArrow.addEventListener('click', function() {
        clearErrors();

        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        if (!isValidDate(day, month, year)) {
            return;
        }

        const age = calculateAge(day, month, year);
        animateAge(age);
    });

    function clearErrors() {
        if (dayError) dayError.textContent = '';
        if (monthError) monthError.textContent = '';
        if (yearError) yearError.textContent = '';
    }

    function isValidDate(day, month, year) {
        const today = new Date();
        const inputDate = new Date(year, month - 1, day);

        let valid = true;

        if (isNaN(day) || day < 1 || day > 31) {
            if (dayError) dayError.textContent = 'Invalid day';
            valid = false;
        }

        if (isNaN(month) || month < 1 || month > 12) {
            if (monthError) monthError.textContent = 'Invalid month';
            valid = false;
        }

        if (isNaN(year) || year > today.getFullYear()) {
            if (yearError) yearError.textContent = 'Invalid year';
            valid = false;
        }

        if (inputDate > today) {
            if (yearError) yearError.textContent = 'Date cannot be in the future';
            valid = false;
        }

        // Check for valid day in month
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
            if (dayError) dayError.textContent = 'Invalid day for the given month';
            valid = false;
        }

        return valid;
    }

    function calculateAge(day, month, year) {
        const today = new Date();
        let ageYears = today.getFullYear() - year;
        let ageMonths = today.getMonth() + 1 - month;
        let ageDays = today.getDate() - day;

        if (ageDays < 0) {
            ageMonths -= 1;
            ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (ageMonths < 0) {
            ageYears -= 1;
            ageMonths += 12;
        }

        return {
            years: ageYears,
            months: ageMonths,
            days: ageDays
        };
    }

    function animateAge(age) {
        const yearsCountUp = new CountUp(yearsOutput, age.years);
        const monthsCountUp = new CountUp(monthsOutput, age.months);
        const daysCountUp = new CountUp(daysOutput, age.days);

        if (!yearsCountUp.error) {
            yearsCountUp.start();
        } else {
            console.error(yearsCountUp.error);
        }

        if (!monthsCountUp.error) {
            monthsCountUp.start();
        } else {
            console.error(monthsCountUp.error);
        }

        if (!daysCountUp.error) {
            daysCountUp.start();
        } else {
            console.error(daysCountUp.error);
        }
    }


});
