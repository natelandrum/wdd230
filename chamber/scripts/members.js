const membersElement = document.querySelector(".members");
const spotlightElement = document.querySelector(".spotlights");

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
    if (!!membersElement)
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
            img.setAttribute("height", "100px")
            img.setAttribute("width", "auto")
            name.textContent = member.name;
            address.textContent = member.address;
            phone.textContent = member.phone;
            link.href = member.url;
            link.textContent = member.url;

            div.append(img, name, address, phone, link);
            section.appendChild(div);
            membersElement.appendChild(section);
        })
    }
    else 
    {
        let count = 0;
        let indices = [...Array(members.length).keys()];
        indices = indices.sort(() => Math.random() - 0.5);

        for (let i of indices) {
            if (count >= 3) break;

            if (members[i].level == "gold" || members[i].level =="silver") {
                const div = document.createElement("div");
                div.classList.add("card");
                const img = document.createElement("img");
                img.src = `images/${members[i].file}`;
                img.alt = `Logo for ${members[i].name}`;
                const h3 = document.createElement("h3");
                h3.textContent = members[i].name;
                const h4 = document.createElement("h4");
                h4.textContent = members[i].slogan;
                const p = document.createElement("p");
                p.textContent = members[i].phone;
                const p2 = document.createElement("p");
                const a = document.createElement("a");
                a.href = members[i].url;
                a.textContent = "Website";
                p2.appendChild(a);
                div.append(img, h3, h4, p, p2);
                spotlightElement.appendChild(div);
                count++;
    }
}
        
    }
    
}

jsonFetch();

if (!!membersElement)
{
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
}
