// Fetch API

fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        showLaunchPads(json);
    })
    .catch(function (error) {
        console.log(error);
    });

apiURL = "https://api.spacexdata.com/v3/launchpads";

function showLaunches(apiURL) {
    const container = document.querySelector("tbody");
    let newHTML = "";
    console.log("launches: " + launch.length);
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
                flickrImage = `<img src="img/placeholder_img_space.jpg" class="placeholder"><a href="https://www.flickr.com/photos/spacex/">See images on Flickr</a>`;
            } else {
                flickrImage = `<a href="${launch[i].links.flickr_images[0]}"><img src="${launch[i].links.flickr_images[0]}" alt=""></a>
            <a href="https://www.flickr.com/photos/spacex/">See more on Flickr</a>`;
            }

            // Emed YouTube link
            const videoID = `${launch[i].links.youtube_id}`;
            let youtubeVideo = "";
            if (launch[i].links.youtube_id === null) {
                youtubeVideo = `<img src="img/placeholder_img_video.jpg" class="placeholder"><a href="">See more on youtube</a>`;
            } else {
                let youtubeLink = ("https://www.youtube.com/embed/" + videoID);
                youtubeVideo = `<iframe src="${youtubeLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><a href="">See more on youtube</a>`;
            }

            // Check if there is a wikipedia link
            let wikiLink = "";
            if (launch[i].links.wikipedia === null) {
                wikiLink = "";
            } else {
                wikiLink = `${launch[i].links.wikipedia}`;
            }
            // Check if there is a article link
            let articleLink = "";
            if (launch[i].links.article_link === null) {
                articleLink = "";
            } else {
                articleLink = `${launch[i].links.article_link}`;
            }

            // Shorten / find date and time
            const longDate = `${launch[i].launch_date_utc}`;
            const shortDate = longDate.slice(0, 10);
            const longTime = `${launch[i].launch_date_utc}`;
            const shortTime = longTime.slice(11, 19);

            // Create HTML
            const launchDetails = `<tr class="less-info">
        <td>${shortDate}</td>
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
                                    <a href="${articleLink}" class="article-link">Article</a><a href="${wikiLink}" class="wiki-link">Wikipedia</a>
                                </div>
                                <img class="patch" src="${launch[i].links.mission_patch}" alt="">
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
                                <div class="date-time">
                                    <p>Local launch date/time</p>
                                    <p class="date">${shortDate}</p>
                                    <p class="time">${shortTime}</p>
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
            if (target.classList.contains('close-icon')) {
                const rowParent = target.closest('.show-more-info.show-row')
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