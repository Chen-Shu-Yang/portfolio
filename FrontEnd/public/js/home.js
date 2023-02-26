function createCard(info) {
    const card = `
        <div class="card" onclick="getAExp(${info.expID});">
            <div class="box">
                <img src="../img/${info.logo}" alt="">
                <div class="text">${info.companyName}</div>
                <p>${info.comapanyDes}</p>
            </div>
        </div>
    `;

    return card;
}

function createBar(info) {
    const bar = `
        <div class="bars">
            <div class="info">
                <span>${info.skillName}</span>
                <span>${info.skillPerc}</span>
            </div>
            <div class="line">
                <div class="colorLine" style="width: ${info.skillPerc}"></div>
            </div>
        </div>
    `;

    return bar;
}

function createModalBar(info) {
    const ModalBar = `
        <div class="bars" onclick="$('#skill-${info.skillID}').collapse('toggle')">
            <div>
                <div class="info">
                    <span>${info.skillName}</span>
                    <span>${info.skillPerc}</span>
                </div>
                <div class="line">
                    <div class="colorLine" style="width: ${info.skillPerc}"></div>
                </div>
            </div>
            <div id="skill-${info.skillID}" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">${info.skillDes}</div>
            </div>
        </div>
    `;

    return ModalBar;
}

function createProjCard(info) {
    const projCard = `
        <div class="card" onclick="window.open('/projectdtl?id=${info.projID}', '_blank');>
            <div class="box">
                <i class="fas fa-paint-brush"></i>
                <div class="text">${info.projLabel}</div>
                <p>${info.projDes}</p>
            </div>
        </div>
    `;

    return projCard;
}

function getAllExp() {
    $.ajax({
        url: `${serverName}/exps`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',

        success(data) {
            for (let i = 0; i < data.length; i++) {
                const exp = data[i];

                const expObj = {
                    expID: exp.EXP_ID,
                    logo: exp.EXP_IMG,
                    companyName: exp.EXP_LABEL,
                    comapanyDes: exp.EXP_DES
                }

                const newCard = createCard(expObj);
                $('#expBody').append(newCard);
            }

            // owl carousel script
            $('.carousel').owlCarousel({
                margin: 20,
                loop: true,
                autoplayTimeOut: 2000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 3,
                        nav: false
                    }
                }
            });
        },

        error(xhr, textStatus, errorThrown) {
            console.log('Error in Operation');

            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);

            console.log(xhr.responseText);
            console.log(xhr.status);
        },
    });
}

function getAExp(expId) {
    $.ajax({
        url: `${serverName}/exp/${expId}`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',

        success(data) {
            $('#expTasks').html("");
            $('#downloadRef').html("");
            const expTask = data.EXP_JOB_DES;
            const expTasks = expTask.split("|");
            for (let i = 0; i < expTasks.length; i++) {
                $('#expTasks').append(`<li>${expTasks[i]}</li>`);
            }
            if (data.EXP_REF_LETTER !== "" && data.EXP_REF_LETTER != null) {
                $('#downloadRef').append(`<a href="../docs/${data.EXP_REF_LETTER}" target="_blank">Download Reference Letter</a>`);
            }
            $('#companyName').text(data.EXP_LABEL);
            $('#expPeriod').text(data.EXP_PERIOD);
            $('#companyImg').attr('src', '../img/' + data.EXP_IMG);
            $('#expModal').modal('show');
        },

        error(xhr, textStatus, errorThrown) {
            console.log('Error in Operation');

            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);

            console.log(xhr.responseText);
            console.log(xhr.status);
        },
    });
}

function getSkills(type) {
    $.ajax({
        url: `${serverName}/skills`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',

        success(data) {
            if (type === 'top') {
                let topSkills = [];
                for (let i = 0; i < data.length; i++) {
                    const skill = data[i];

                    if (skill.SKILL_TYPE === 'LANGUAGE' && topSkills.length < 5) {
                        topSkills.push(skill);
                        const skillObj = {
                            skillID: skill.SKILL_ID,
                            skillName: skill.SKILL_NAME,
                            skillDes: skill.SKILL_DES,
                            skillPerc: skill.SKILL_PERC,
                            skillType: skill.SKILL_TYPE
                        }

                        const newBar = createBar(skillObj);
                        $('#skillsBody').append(newBar);
                    }
                }
            } else {
                for (let i = 0; i < data.length; i++) {
                    const skill = data[i];

                    const skillObj = {
                        skillID: skill.SKILL_ID,
                        skillName: skill.SKILL_NAME,
                        skillDes: skill.SKILL_DES,
                        skillPerc: skill.SKILL_PERC,
                        skillType: skill.SKILL_TYPE
                    }

                    const newModalBar = createModalBar(skillObj);
                    $('#modalSkillsBody').append(newModalBar);
                }
                $('#skillModal').modal('show');
            }
        },

        error(xhr, textStatus, errorThrown) {
            console.log('Error in Operation');

            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);

            console.log(xhr.responseText);
            console.log(xhr.status);
        },
    });
}

function getProjects() {
    $.ajax({
        url: `${serverName}/projects`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',

        success(data) {
            for (let i = 0; i < 3; i++) {
                const proj = data[i];

                const projObj = {
                    projID: proj.PROJECT_ID,
                    projLabel: proj.PROJECT_LABEL,
                    projDes: proj.PROJECT_DES,
                }

                const newCard = createProjCard(projObj);
                $('#projBody').append(newCard);
            }
        },
    });
}


$(document).ready(function () {

    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing animation script
    var typed = new Typed(".typing", {
        strings: ["Developer", "Designer", "Freelancer", "Data Analyst"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Developer", "Designer", "Freelancer", "Data Analyst"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    getAllExp();
    getSkills('top');
});