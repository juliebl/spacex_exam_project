/////////////////////// NEXT LAUNCH ///////////////////////
fetch("https://api.spacexdata.com/v3/launches/next")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        showNextLaunch(json);
    })
    .catch(function (error) {
        console.log(error);
    });


function showNextLaunch(launch) {
    const container = document.querySelector("#next-launch");
    let newHTML = "";

    // Shorten / find date
    const longDate = `${launch.launch_date_utc}`;
    const shortDate = longDate.slice(0, 10);

    // Create HTML
    const launchDetails = `            <div class="next-launch-text">
            <div class="next-launch-header">
                <h2>Next launch:</h2>
                <h3>${launch.mission_name}</h3>
                <p class="date">${shortDate}</p>
            </div>
            <div class="next-launch-info">
                <ul>
                    <li><span>Rocket:</span><span>${launch.rocket.rocket_name}</span> </li>
                    <li><span>Customer:</span><span>${launch.rocket.second_stage.payloads[0].customers[0]}</span></li>
                    <li><span>Payload type:</span><span>${launch.rocket.second_stage.payloads[0].payload_type}</span> </li>
                    <li><span>Launch site:</span><span>${launch.launch_site.site_name}</span>
                    </li>
                </ul><a href="launches.html" class="button button-dark">See upcoming launches</a>

            </div>
        </div>
        <img src="${launch.links.mission_patch}" class="patch" alt="Mission patch">

  `;
    newHTML += launchDetails;
    container.innerHTML = newHTML;
}

// LATEST LAUNCH IMAGE 
fetch("https://api.spacexdata.com/v3/launches/latest")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        changeLatestImg(json);
    })
    .catch(function (error) {
        console.log(error);
    });

function changeLatestImg(latestLaunch) {
    const latestImg = document.querySelector(".latest-launch img");
    // Check if there is a flickr image
    if (latestLaunch.links.flickr_images.length === 0) {
        latestImg.src = "img/placeholder-image.png";
    } else {
        latestImg.src = latestLaunch.links.flickr_images[0];
    }
}

/////////////////////// PREVIOUS LAUNCHES ///////////////////////
fetch("https://api.spacexdata.com/v3/launches/past?limit=3&order=desc")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        showPrevLaunches(json);
    })
    .catch(function (error) {
        console.log(error);
    });

function showPrevLaunches(launch) {
    const prevLaunchContainer = document.querySelector(".previous-launches .triple-card-container");
    let newPrevLaunchHTML = "";

    for (var i = 0; i < launch.length; i++) {

        // Check if there is mission description
        let missionDetails = "";
        if (launch[i].details === null) {
            missionDetails = "No mission description available";
        } else {
            missionDetails = launch[i].details;
        }

        // Check if there is a flickr image, if not use image from unsplash
        let flickrImage = "";
        if (launch[i].links.flickr_images.length === 0) {
            flickrImage = "img/placeholder_img_space.jpg";
        } else {
            flickrImage = launch[i].links.flickr_images[0];
        }

        // Create HTML
        const prevLaunchDetails = `<div class="triple-card">
                <img src="${flickrImage}" alt="${launch[i].mission_name}">
                <h3>${launch[i].mission_name}</h3>
                <p class="long-text">${missionDetails}</p>
                <a href="" class="arrow-link">Read more <i class="fas fa-chevron-right arrow-right"></i></a>
            </div>
      `;
        newPrevLaunchHTML += prevLaunchDetails;
    }
    prevLaunchContainer.innerHTML = newPrevLaunchHTML;
    shortenText();
}

/////////////////////// LAUNCH PADS ///////////////////////
// Fetch API
launchPadApiURL = "https://api.spacexdata.com/v3/launchpads";
fetch(launchPadApiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        showLaunchPads(json);
    })
    .catch(function (error) {
        console.log(error);
    });

function showLaunchPads(launchPad) {
    container = document.querySelector(".launch-pads .triple-card-container");
    let newHTML = "";
    for (var i = 0; i < 3; i++) {

        const launchPadDetails = `<div class="triple-card">
        <iframe class="map" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVm2T6LbGNuBCTPR3fQPdQBaQdhpe3pkk&q=${launchPad[i].location.latitude},${launchPad[i].location.longitude}&zoom=8" allowfullscreen></iframe>
        <h3>${launchPad[i].location.name}</h3>
        <p class="long-text">${launchPad[i].details}</p>
        <a href="launch_pads.html" class="arrow-link">Read more<i class="fas fa-chevron-right arrow-right"></i></a>
    </div>
  `;
        newHTML += launchPadDetails;
    }
    container.innerHTML = newHTML;
    shortenText();

}
// Shorten description text in triple cards
function shortenText() {
    const tripleCardText = document.querySelectorAll(".long-text");
    for (var i = 0; i < tripleCardText.length; i++) {

        if (tripleCardText[i].innerText.length > 200) {
            const shorterText = tripleCardText[i].innerText.substr(0, 200);
            tripleCardText[i].innerText = shorterText;
            tripleCardText[i].classList.add("shorten-text");
        }
    }
}