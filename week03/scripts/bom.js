const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter =>
    {
        displayList(chapter);
    });

function displayList(item)
{
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    li.textContent = item.trim();
    deleteButton.ariaLabel = `Remove ${li.textContent}`;
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete");
    li.appendChild(deleteButton);
    list.appendChild(li);
    
    deleteButton.addEventListener("click", () =>
    {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

function setChapterList() 
{
    localStorage.setItem("myFavBOMList", JSON.stringify(chaptersArray));
}

function getChapterList()
{
    return JSON.parse(localStorage.getItem("myFavBOMList"));
}

function deleteChapter(chapter)
{
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    console.log(chaptersArray)
    setChapterList();
}

function processInput()
{
    if (input.value.trim() === "")
    {
        alert("Please enter a chapter!");
        input.focus();
    }
    else
    {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = "";
        input.focus();
    }
}

button.addEventListener("click", () => 
{
    processInput();
});

input.addEventListener("keyup", e => 
{
    if (e.key === "Enter")
    {
        processInput();
    }
})