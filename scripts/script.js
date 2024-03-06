const hamburgerButton = document.querySelector("#hamburgerButton");
const navList = document.querySelector(".menuLinks");

hamburgerButton.addEventListener("click", () =>
{
    navList.classList.toggle("open");
    hamburgerButton.classList.toggle("open");
})

const darkBtn = document.querySelector("#darkBtn");

darkBtn.addEventListener("click", () =>
{
    document.body.querySelector("main").classList.toggle("dark");
})