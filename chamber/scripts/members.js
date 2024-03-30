const membersElement = document.querySelector(".members");

const url = "https://natelandrum.github.io/wdd230/chamber/data/members.json";

async function jsonFetch() 
{
    try
    {
        const response = await fetch(url);

        if (response.ok)
        {
            const data = await response.json();
            displayResults(data.members);
        }
        else
        {
            throw Error(await response.text());
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

function displayResults(members)
{
    members.forEach(member =>
        {
            const section = document.createElement("section");
            const img = document.createElement("img");
            const name = document.createElement("p");
            const address = document.createElement("p");
            const phone = document.createElement("p");
            const link = document.createElement("a");
            const div = document.createElement("div");

            section.classList.add("card")
            membersElement.classList.add("grid")
            img.src = `images/${member.file}`
            img.alt = `${member.name} Logo`
            name.textContent = member.name;
            address.textContent = member.address;
            phone.textContent = member.phone;
            link.setAttribute("href", member.url);
            link.textContent = member.url;

            div.append(img, name, address, phone, link);
            section.appendChild(div);
            membersElement.appendChild(section);
        })
}

jsonFetch();

document.querySelector(".grid-button").addEventListener("click", (e) =>
{
    e.currentTarget.classList.add("active-view");
    document.querySelectorAll("section").forEach(section =>
        {
            section.classList.add("card");
            section.querySelector("div").classList.remove("list")
        })
    document.querySelectorAll("section img").forEach(img =>
        {
            img.classList.remove("hidden-img");
        })
        document.querySelector(".list-button").classList.remove("active-view");
        membersElement.classList.add("grid");
})

document.querySelector(".list-button").addEventListener("click", (e) =>
{
    e.currentTarget.classList.add("active-view");
    document.querySelectorAll("section").forEach(section =>
        {
            section.classList.remove("card");
            section.querySelector("div").classList.add("list")
        })
    document.querySelectorAll("section img").forEach(img =>
        {
            img.classList.add("hidden-img");
        })
        document.querySelector(".grid-button").classList.remove("active-view");
        membersElement.classList.remove("grid");
})