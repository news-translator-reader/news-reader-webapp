const URL = `http://localhost:3000`


$(document).ready(function () {
        translate();
});

function translate() {

    $.ajax({
        url: `${URL}/api/translate`,
        method: `post`,
    })
        .done(data => {
            console.log(data.translate);
            $('.translate').empty();
            $('.translate').append(`
            ${data.translate};
            `)



        })
        .fail(err => {
            console.log(err);
        })
}