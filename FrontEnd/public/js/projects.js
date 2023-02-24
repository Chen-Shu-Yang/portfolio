function createCard(info) {
    const Card = `
        <div class="card" onclick="window.open('/projectdtl?id=${info.projID}', '_blank');">
            <img src="../img/${info.projImg}" alt="" />
            <div class="card-content">
                <h2>${info.projLabel}</h2>
                <p>${info.projDes}</p>
                <a href="/projectdtl?id=${info.projID}" target="_blank">Read Project Details<i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `;

    return Card;
}

function getAllProjects() {
    $.ajax({
        url: `${serverName}/projects`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',

        success(data) {
            for (let i = 0; i < data.length; i++) {
                const proj = data[i];

                const projObj = {
                    projID: proj.PROJECT_ID,
                    projImg: proj.PROJECT_IMAGE,
                    projLabel: proj.PROJECT_LABEL,
                    projDes: proj.PROJECT_DES,
                }

                const newCard = createCard(projObj);
                $('#projBody').append(newCard);
            }
        },
    });
}


$(document).ready(function () {
    getAllProjects();
});