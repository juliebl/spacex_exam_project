// Fetch API
function fetchApi() {
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            showLaunches(json);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Press "See more launches" button to load 10 more launches from the API
expandLaunchList();
let limit = 10;
let state = "";

apiURL = "https://api.spacexdata.com/v3/launches/upcoming?limit=" + limit + "&order=asc&sort=launch_date_utc";
fetchApi();

function expandLaunchList() {
    const seeMoreButton = document.querySelector(".see-more-launches");

    seeMoreButton.addEventListener("click", function () {
        limit += 10;

        if (state === "upcoming") {
            apiURL = "https://api.spacexdata.com/v3/launches/upcoming?limit=" + limit + "&order=desc&sort=launch_date_utc";
        } else if (state === "past") {
            apiURL = "https://api.spacexdata.com/v3/launches/past?limit=" + limit + "&order=desc&sort=launch_date_utc";
        } else {
            apiURL = "https://api.spacexdata.com/v3/launches?limit=" + limit + "&order=desc&sort=launch_date_utc";
        }
        fetchApi();
    });
}


// Make menu buttons active on click
const seeUpcomingButton = document.querySelector(".see-upcoming");
const seePreviousButton = document.querySelector(".see-previous");
const seeAllButton = document.querySelector(".see-all");


// Press active button and change to relevant API
seeUpcomingButton.addEventListener("click", function (event) {
    removeActiveButton();
    limit = 10;
    state = "upcoming";
    event.target.classList.add("active-button");
    apiURL = "https://api.spacexdata.com/v3/launches/upcoming?limit=" + limit + "&order=asc&sort=launch_date_utc";
    fetchApi();
})
seePreviousButton.addEventListener("click", function (event) {
    removeActiveButton();
    limit = 10;
    state = "past";
    event.target.classList.add("active-button");
    apiURL = "https://api.spacexdata.com/v3/launches/past?limit=" + limit + "&order=desc&sort=launch_date_utc";
    fetchApi();
})
seeAllButton.addEventListener("click", function (event) {
    removeActiveButton();
    limit = 10;
    state = "all"
    event.target.classList.add("active-button");
    apiURL = "https://api.spacexdata.com/v3/launches?limit=" + limit + "&order=desc&sort=launch_date_utc";
    fetchApi();
})


// Remove active class when pressing another button
function removeActiveButton() {
    if (document.querySelectorAll('.active-button').length > 0) {
        document.querySelectorAll('.active-button').forEach(button => {
            button.classList.remove('active-button');
        })
    }
}

function showLaunches(launch) {
    const container = document.querySelector("tbody");
    let newHTML = "";
    launchLoop(launch);

    function launchLoop(launch) {
        for (var i = 0; i < launch.length; i++) {


            // Check if there is mission description
            let missionDetails = "";
            if (launch[i].details === null) {
                missionDetails = "No mission description available";
            } else {
                missionDetails = launch[i].details;
            }

            // Check if there is a flickr image
            let flickrImage = "";
            if (launch[i].links.flickr_images.length === 0) {
                flickrImage = `<img src="img/placeholder_img_space.jpg" class="placeholder" alt="Galaxy with the text no image found"><a href="https://www.flickr.com/photos/spacex/">See images on Flickr</a>`;

            } else {
                flickrImage = `<a href="${launch[i].links.flickr_images[0]}"><img src="${launch[i].links.flickr_images[0]}" alt="${launch[i].mission_name}"></a>
            <a href="https://www.flickr.com/photos/spacex/">See more on Flickr</a>`;
            }
            // Check if there is a mission patch
            let missionPatch = "";
            if (launch[i].links.mission_patch === null) {
                missionPatch = `<img class="patch" src="img/placeholder_patch.png" alt="Mission patch for ${launch[i].mission_name} not found">`

            } else {
                missionPatch = `<img class="patch" src="${launch[i].links.mission_patch}" alt="Mission patch for ${launch[i].mission_name}">`;
            }

            // Emed YouTube link
            const videoID = `${launch[i].links.youtube_id}`;
            let youtubeVideo = "";
            if (launch[i].links.youtube_id === null) {
                youtubeVideo = `<img src="img/placeholder_img_video.jpg" alt="No video found" class="placeholder"><a href="">See more on youtube</a>`;
            } else {
                let youtubeLink = ("https://www.youtube.com/embed/" + videoID);
                youtubeVideo = `<iframe src="${youtubeLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="Youtube video for ${launch[i].mission_name}" allowfullscreen></iframe><a href="https://www.youtube.com/channel/UCtI0Hodo5o5dUb67FeUjDeA">See more on youtube</a>`;
            }

            // Check if there is a wikipedia link
            let wikiLink = "";
            if (launch[i].links.wikipedia === null) {
                wikiLink = `<a href="" class="wiki-link non-clickable-link">Wikipedia</a>`;

            } else {
                wikiLink = `<a href="${launch[i].links.wikipedia}" class="wiki-link">Wikipedia</a>`;
            }

            // Check if there is a article link
            let articleLink = "";
            if (launch[i].links.article_link === null) {
                articleLink = `<a href="" class="article-link non-clickable-link">Article</a> `;
            } else {
                articleLink = `
                <a href="${launch[i].links.article_link}" class="article-link">Article</a> `;
            }

            // Shorten / find date and time
            const longDate = `${launch[i].launch_date_utc}`;
            const shortDate = longDate.slice(0, 10);
            const longTime = `${launch[i].launch_date_utc}`;
            const shortTime = longTime.slice(11, 19);

            // Create HTML
            const launchDetails = `<tr class="less-info header-row">
        <td class="short-date">${shortDate}</td>
        <td>${launch[i].mission_name}</td>
        <td>${launch[i].rocket.second_stage.payloads[0].customers[0]}</td>
        <td>${launch[i].rocket.rocket_name}</td>
    </tr> 
    <tr class="show-more-info">
                        <td class="more-info-row" colspan="4">
                            <div class="more-info">
                                <div class="more-info-main">
                                    <h2>Mission name:</h2>
                                    <h3>${launch[i].mission_name}</h3>
                                    <p>${missionDetails}</p>
                                    ${articleLink}${wikiLink}
                                </div>
                                ${missionPatch}
                                <div class="more-info-list">
                                    <h4>Payload:</h4>
                                    <div>
                                        <ul>
                                            <li><span>Type:</span><span>${launch[i].rocket.second_stage.payloads[0].payload_type}</span> </li>
                                            <li><span>Manufacturer:</span><span>${launch[i].rocket.second_stage.payloads[0].manufacturer}</span></li>
                                            <li><span>Nationality:</span><span>${launch[i].rocket.second_stage.payloads[0].nationality}</span> </li>
                                        </ul>
                                        <ul>
                                            <li><span>Customer:</span><span>${launch[i].rocket.second_stage.payloads[0].customers[0]}</span> </li>
                                            <li><span>Launch site:</span><span>${launch[i].launch_site.site_name}</span></li>
                                            <li><span>Vehicle:</span><span>${launch[i].rocket.rocket_name}</span> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="slash">
                                    <p>Local launch date/time</p>
                                    <p class="left-slash">${shortDate}</p>
                                    <p class="right-slash">${shortTime}</p>
                                </div>
                                <div class="img">${flickrImage}
                                </div> <div class="video">${youtubeVideo}</div>
                                <i class="fas fa-chevron-up close-icon less-info"></i>
                            </div>
                        </td>
                    </tr>
  `;
            newHTML += launchDetails;
        }

    }

    // Add new HTML to container
    container.innerHTML = newHTML;


    // Expand info about each launch
    const lessInfo = document.querySelectorAll(".less-info");

    for (var i = 0; i < lessInfo.length; i++) {
        lessInfo[i].addEventListener("click", function (event) {
            const target = event.currentTarget
            if (target.classList.contains("close-icon")) {
                const rowParent = target.closest(".show-more-info.show-row")
                if (rowParent) {
                    rowParent.classList.toggle("show-row");
                }
                return
            }

            const showMoreInfo = event.currentTarget.nextElementSibling;
            if (showMoreInfo) {
                showMoreInfo.classList.toggle("show-row");
            }
        });

    }
}