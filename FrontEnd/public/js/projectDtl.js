function getProject(projId) {
    $('#projTitle').html("");
    $('#projImg').attr('src', '');
    $('#expertise').html("");
    $('#platform').html("");
    $('#deliverables').html("");
    $('#webLink').html("");
    $('#projOverview').html("");
    $('#projExecution').html("");
    $('#projResults').html("");

    $.ajax({
        url: `${serverName}/project/${projId}`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',

        success(data) {
            const proj = data;

            $('#projTitle').html(proj.PROJECT_LABEL);
            $('#projImg').attr('src', '../img/' + proj.PROJECT_IMAGE);
            $('#expertise').html(proj.PROJECT_TYPE);
            $('#platform').html(proj.PROJECT_PLATFORM);
            $('#deliverables').html(proj.PROJECT_DELIVERABLES);
            $('#webLink').html(`<a href="${proj.PROJECT_LINK}" target="_blank">Visit Site</a>`);
            $('#projOverview').html(proj.PROJECT_OVERVIEW);
            $('#projExecution').html(proj.PROJECT_EXECUTION);
            $('#projResults').html(proj.PROJECT_RESULTS);
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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projId = urlParams.get('id');
    getProject(projId);
});