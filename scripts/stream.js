// © 2025 SejmTracker

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const unid = urlParams.get('unid');

async function showStream() {
    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/videos/${unid}`);

    let back = document.createElement("p");
    let header = document.createElement("h1");
    let desc = document.createElement("p");

    back.innerHTML = `<a href="/live.html">< Powrót do wyboru transmisji</a>`;
    header.textContent = data.title;
    if(data.description) {
        desc.innerHTML = `<i>${data.description}</i>`;
    } else {
        desc.innerHTML = `<i>Brak opisu.</i>`;
    }
    document.getElementById("SejmPlayer").dataset.src = data.videoLink;
    let cont = document.getElementById("stream-info");
    cont.appendChild(back);
    cont.appendChild(header);
    cont.appendChild(desc);

    document.title = `${data.title} | SejmTracker`;
}

showStream();

function handleDeviceWidth() {
    if (window.innerWidth <= 1120) {
        document.getElementById("SejmPlayer").className = "video-js";
    } else {
        document.getElementById("SejmPlayer").className = "video-js desktop-player";
    }
}

handleDeviceWidth();

window.addEventListener('resize', handleDeviceWidth);