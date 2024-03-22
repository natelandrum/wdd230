document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = document.lastModified;

if (!!document.querySelector("#timestamp")) {
    document.querySelector("#timestamp").value = new Date();
}