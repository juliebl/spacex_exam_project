// Fetch API
apiURL = "https://api.spacexdata.com/v3/rockets";
fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {

        showRockets(json);
    })
    .catch(function (error) {
        console.log(error);
    });

function showRockets(rocket) {
    container = document.querySelector("tbody");
    let newHTML = "";
    for (var i = 0; i < rocket.length; i++) {
        // Check if there is a flickr image
        let flickrImage = "";
        if (rocket[i].flickr_images.length === 0) {
            flickrImage = `<img src="img/placeholder_img_space.jpg" class="placeholder full-width" alt="alt="Galaxy with the text no image found"">`;
        } else {
            flickrImage = `<a href="${rocket[i].flickr_images[0]}"><img src="${rocket[i].flickr_images[0]}" class="full-width" alt="${rocket[i].rocket_name}"></a><a href="https://www.flickr.com/photos/spacex/">See images on Flickr</a>
            `;
        }

        // Check if there is a wikipedia link
        let wikiLink = "";
        if (rocket[i].wikipedia === null) {
            wikiLink = `<a href="" class="wiki-link non-clickable-link">Read more on Wikipedia</a>`;

        } else {
            wikiLink = `<a href="${rocket[i].wikipedia}" class="wiki-link">Read more on Wikipedia</a>`;
        }
        // If successrate is 0
        let successRate = "";
        if (rocket[i].success_rate_pct === 0) {
            successRate = `<span>${rocket[i].success_rate_pct}% (May not have been launched yet)</span>`;
        } else {
            successRate = `<span>${rocket[i].success_rate_pct}%</span>`;
        }

        let status = "";
        if (rocket[i].active === true) {
            status = "Active";
        } else if (rocket[i].active === false) {
            status = "Not active";
        } else {
            status = "Unknown";
        }

        const rocketDetails = `<tr class="less-info">
        <td>${rocket[i].first_flight}</td>
        <td>${rocket[i].rocket_name}</td>
        <td>${status}</td>
    </tr> 
    <tr class="show-more-info">
                        <td class="more-info-row" colspan="4">
                            <div class="more-info">
                                <div class="more-info-main">
                                    <h2>${rocket[i].rocket_name}</h2>
                                    <div>
                                    <div class="launch-pad-details"><p>${rocket[i].description}</p>
                                    <div class="more-info-list">
                                    <div>
                                        <ul class="slash">
                                        <li><span>Height:</span><span class="left-slash">${rocket[i].height.meters  + " "}M</span><span class="right-slash">${rocket[i].height.feet + " "}FT</span></li>
                                        <li><span>Diameter:</span><span class="left-slash">${rocket[i].diameter.meters + " "}M</span><span class="right-slash">${rocket[i].diameter.feet  + " "}ft</span></li>
                                        <li><span>Mass:</span><span class="left-slash">${rocket[i].mass.kg + " "}kg</span><span class="right-slash">${rocket[i].mass.lb  + " "}lb</span></li>
                                        </ul>
                                        <ul>
                                        <li><span>Success rate:</span>${successRate}</li>
                                        <li><span>First flight:</span><span>${rocket[i].first_flight}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                ${wikiLink}</div>  
                                <div class="img">${flickrImage}</div>
                                    </div>

                                </div>

                                <i class="fas fa-chevron-up close-icon less-info"></i>
                           
                        </td>
                    </tr>
  `;


        newHTML += rocketDetails;
    }

    container.innerHTML = newHTML;

    // first image didn't exist and redirected and I didn't have time to figure out how to check if link redirects or not, so this was just a quick/temporary fix
    document.querySelector(".img").style.display = "none";

    // Expand info about each launch pad
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