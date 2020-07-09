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

function textToSpeech(text) {

    VoiceRSS.speech({
        key: '2a992d06f2364a7a983de72dfea72a22',
        src: text,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}