const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");
const range = document.querySelector("input[type='range']");
const rangeValue = document.querySelector("#rangeValue");

function checkSame() {
    if (password.value !== passwordConfirm.value)
    {
        password.value ="";
        passwordConfirm.value ="";
        password.focus();
        alert("Your passwords didn't match!\nTry again!")
    }
}

passwordConfirm.addEventListener("focusout", checkSame)

range.addEventListener("change", () => {
    rangeValue.textContent = range.value;
})