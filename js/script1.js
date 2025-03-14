document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("currency-form");
    const rateInput = document.getElementById("rate");
    const amountInput = document.getElementById("amount");
    const resultInput = document.getElementById("result");


    function calculate(event) {
        event.preventDefault(); 

        let rate = parseFloat(rateInput.value);
        let amount = parseFloat(amountInput.value);

        if (!isNaN(rate) && !isNaN(amount) && rate > 0) {
            resultInput.value = (amount / rate).toFixed(2);
        } else {
            alert("Please enter valid numbers.");
        }
    }

    form.addEventListener("submit", calculate);

    form.addEventListener("reset", function () {
        resultInput.value = "";
    });
});
