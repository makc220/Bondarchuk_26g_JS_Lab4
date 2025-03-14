document.addEventListener("DOMContentLoaded", function () {
    const swapButton = document.querySelector(".swap-button");

    function swapText() {
        let text1Element = document.getElementById("text1");
        let text2Element = document.getElementById("text2");

        if (isEditingActive()) return; 

        let text1 = text1Element.innerText;
        let text2 = text2Element.innerText;

        text1Element.innerText = text2;
        text2Element.innerText = text1;

        updateTextInfo();
    }

    function updateTextInfo() {
        function getTextStats(text) {
            let sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
            let words = text.split(/\s+/).filter(w => w.length > 0).length;
            let symbols = text.replace(/\s/g, "").length;
            return { sentences, words, symbols };
        }

        let stats1 = getTextStats(document.getElementById("text1").innerText);
        let stats2 = getTextStats(document.getElementById("text2").innerText);

        document.getElementById("text3").innerHTML = `Sentences: ${stats1.sentences}<br>Words: ${stats1.words}<br>Symbols: ${stats1.symbols}`;
        document.getElementById("text4").innerHTML = `Sentences: ${stats2.sentences}<br>Words: ${stats2.words}<br>Symbols: ${stats2.symbols}`;
    }

    function toggleEdit(button, isTitle) {
        let textElement = isTitle ? button.previousElementSibling : button.parentElement.querySelector("p");
        let isEditing = button.innerText === "Save";

        if (isEditing) {
            let inputField = textElement.querySelector("input, textarea");
            textElement.innerText = inputField.value.trim(); 
            button.innerText = isTitle ? "Edit Title" : "Edit Text";
            updateTextInfo();
        } else {
            let inputType = isTitle ? "input" : "textarea";
            let inputField = document.createElement(inputType);
            inputField.value = textElement.innerText;
            inputField.style.width = "100%";
            textElement.innerText = "";
            textElement.appendChild(inputField);
            inputField.focus();
            button.innerText = "Save";
        }

        checkEditingState();
    }

    function checkEditingState() {
        swapButton.disabled = isEditingActive();
    }

    function isEditingActive() {
        return document.querySelector(".edit-text") &&
            [...document.querySelectorAll(".edit-text")].some(button => button.innerText === "Save");
    }

    document.querySelectorAll(".edit-title").forEach(button => {
        button.addEventListener("click", function () {
            toggleEdit(this, true);
            checkEditingState();
        });
    });

    document.querySelectorAll(".edit-text").forEach(button => {
        button.addEventListener("click", function () {
            toggleEdit(this, false);
            checkEditingState();
        });
    });

    swapButton.addEventListener("click", swapText);
    updateTextInfo();
});
