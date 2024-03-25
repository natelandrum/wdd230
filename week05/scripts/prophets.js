const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData()
{
    const response = await fetch(url);
    const data = await response.json();

    displayProphets(data.prophets);
}

const displayProphets = (prophets) =>
{
    prophets.forEach(prophet =>
        {
            const card = document.createElement("section");
            const fullName = document.createElement("h2");
            const dob = document.createElement("p");
            const pob = document.createElement("p");
            const portrait = document.createElement("img");

            fullName.textContent = `${prophet.name} ${prophet.lastname}`;

            dob.textContent = `Date of Birth: ${prophet.birthdate}`;
            pob.textContent = `Place of Birth: ${prophet.birthplace}`;

            portrait.src = prophet.imageurl;
            portrait.alt = `Portrait of ${fullName.textContent}`
            portrait.loading = "lazy";
            portrait.setAttribute("width", "200");
            portrait.setAttribute("height", "auto");
            
            card.append(fullName, dob, pob, portrait);
            card.classList.add("card");
            
            cards.appendChild(card);
        })
}

getProphetData();