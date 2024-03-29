const baseURL = "natelandrum.github.io/wdd230/";
const linksURL = "natelandrum.github.io/wdd230/data/links.json";
const learning = document.querySelector(".learning-activities");

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();

    displayLinks(data.weeks);
}

function displayLinks(weeks) {
    let html = '';
    weeks.forEach(item => {
        html += `<li>${item.week}: `;
        item.links.forEach((link, index) => {
            html += `<a href="${link.url}">${link.title}</a>`;
            if (index < item.links.length - 1) {
                html += ' | ';
            }
        });
        html += '</li>';
    });
    learning.innerHTML = html;
}

getLinks();