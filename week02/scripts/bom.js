const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", () => 
{
    if (input.value.trim() === "")
    {
        alert("Please enter a chapter!");
        input.focus();
    }
    else
    {
        const li = document.createElement("li");
        const deleteButton = document.createElement("button");
        li.textContent = input.value.trim();
        deleteButton.ariaLabel = `Remove ${li.textContent}`;
        deleteButton.textContent = "❌";
        li.appendChild(deleteButton);
        list.appendChild(li);
        input.value = "";
        input.focus();

        deleteButton.addEventListener("click", (e) =>
        {
            list.removeChild(e.target.closest("li"));
        });
    }

});