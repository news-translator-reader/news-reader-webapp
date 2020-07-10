const URL = `http://localhost:3000`


$(document).ready(function () {
    // showRegister();
    showHomePage();
    // kalau udah jalan log in nya localStorage ini di delete ya, di ganti setelah log in punya data
    // localStorage.setItem('interest', 'health');
    // localStorage.setItem('location', 'id');

    // newsAPI()
});

function showLogIn() {
    $('.signup').hide();
    $('.sign-in').show();
    $('.Homepage').hide();
}

function showRegister() {
    $('.signup').show();
    $('.sign-in').hide();
    $('.Homepage').hide();
}

function showHomePage() {
    if (localStorage.token) {
        $('.signup').hide();
        $('.sign-in').hide();
        $('.Homepage').show();
    } else {
        showLogIn()
    }
}

function logOut() {
    signOut()
    localStorage.clear();
    showLogIn()
}

function register() {
    event.preventDefault()
    let username = $('#name').val();
    let location = $('#location').val();
    let preferences = $('#interest').val();
    let email = $('#email').val();
    let password = $('#pass').val();
    let rePassword = $('#re_pass').val();
    console.log(name, location, interest, email, password, rePassword)

    if (password !== rePassword || password === "" || rePassword === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password dan Confirm Password tidak sama',
            footer: '<a href>Why do I have this issue?</a>'
        })

    }
    else {
        // masuk database trus simpen datanya ke database, abis di simpen baru masuk halaman login
        $.ajax({
            method: 'POST',
            url: `${URL}/register`,
            data: {
                username,
                location,
                preferences,
                email,
                password
            }
        })
            .done(_ => {
                showLogIn()
                Swal.fire({
                    icon: 'success',
                    title: 'Wow!',
                    text: 'You have created an account'
                })
            }).fail(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'something went wrong!',
                })
            })
        showLogIn();
    }


    // console.log(name, location, interest, email, password, rePassword, `.........register`)
}

function login() {
    // let loginEmail = $('#your_email').val();
    // let loginPass = $('#your_pass').val();
    // check ke database apakah email nya terdaftar ato nggk

    event.preventDefault()

    let email = $('#your_email').val();
    let password = $('#your_pass').val();
    $.ajax({
        url: `${URL}/login`,
        method: `POST`,
        data: {
            email,
            password
        }
    })
        .done(data => {
            console.log(data)
            localStorage.setItem('token', data.token)
            showHomePage();
            apiNews();
        }).fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.errors}`
            })
        }).always(_ => {
            $('#email').val('')
            $('#password').val('')
        })
    /*
    $.ajax{(
        method:'get',
        url:`${URL}/register`,
        data:{
            email:loginEmail,
            password:loginPass,
        }
    )}
    .then(data=>{
        if(data.length===0){
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password tidak terdaftar',
            footer: '<a href>Why do I have this issue?</a>'
        }
        else{
            ambil data token nya trus simpen di localStorage
            localStorage.setItem('interest',token.interest)
            localSotrage.setItem('location',token.location)
            trus showHomePage();
        }
        })
        
    })
    .catch(err=>{
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wrong but what?',
            footer: '<a href>Why do I have this issue?</a>'
    })



    */


}

function translateText1(text) {
    //console.log(text)

    let location = localStorage.location;
    let dataText = text;
    console.log(`ini transalte text`, text)
    $.ajax({
        url: `${URL}/api/translate`,
        method: `post`,
        headers: {
            token: localStorage.token
            // text,
            // location,
        },
        data: {
            text
        }
    })
        .done(data => {
            console.log(data.translate)

            $('#hasilTranslate').empty()
            $('#hasilTranslate').append(`
            <div class="trend-entry d-flex">
                          <div class="number align-self-start">00</div>
                          <div class="trend-contents">
                            <h2><a href="}">${data.translate}</a></h2>
                            <div class="post-meta">
                          <a onclick="textToSpeech3('${data.translate}')">text to speech</a>
                              
                              
                              
                            </div>
                          </div>
                        </div>
 

            `)

        })
        .fail(err => {
            console.log(`translatenya fail`)
            console.log(err);
        })
}



function textToSpeech3(text) {

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

function newsEntertainment() {
    // event.preventDefault();
    localStorage.interest = 'Entertainment'
    let interest = localStorage.interest;
    console.log(interest, `......newsEntertainment`)
    newsAPI();
}

function newsHealth() {
    // event.preventDefault();
    localStorage.interest = 'Health'
    let interest = localStorage.interest;
    console.log(interest, `......newsHealth`)
    newsAPI();
}

function newsTechnology() {
    // event.preventDefault();
    localStorage.interest = 'Technology'
    let interest = localStorage.interest;
    console.log(interest, `......newsTechnology`)
    newsAPI();
}

function newsBisnis() {
    // event.preventDefault();
    localStorage.interest = 'Business'
    let interest = localStorage.interest;
    console.log(interest, `......newsBisnis`)
    newsAPI();

}

function newsSport() {
    // event.preventDefault();
    localStorage.interest = 'Sports'
    let interest = localStorage.interest;
    console.log(interest, `......newsSport`)
    newsAPI();

}

function newsScience() {
    // event.preventDefault();
    localStorage.interest = 'Science'
    let interest = localStorage.interest;
    console.log(interest, `......newsScience`)
    newsAPI();

}

function locationLuar() {
    // event.preventDefault();
    localStorage.location = 'us'
    let location = localStorage.location;
    console.log(location, `......locationLuar`)
    newsAPI();

}

function locationDalam() {
    // event.preventDefault();
    localStorage.location = 'id'
    let location = localStorage.location;
    console.log(location, `......locationLuar`)
    newsAPI();

}


function newsAPI() {
    // localStorage.interest = 'sports'
    let token = localStorage.token;
    let interest = localStorage.interest;
    let location = localStorage.location;
    console.log(interest, location, `.....newsAPI`)


    $.ajax({
        url: `${URL}/api/news`,
        method: `get`,
        headers: {
            // interest,
            // location
            token
        }
    })
        .then(data => {
            $('#hasilTranslate').empty()
            $('#containerBerita').empty();
            for (let i = 0; i < 5; i++) {
                let newDate = '';
                //console.log(data.data[i].publishedAt)
                newDate = data.data[i].publishedAt.slice(0, 10);


                // console.log(data.data[i].publishedAt)
                console.log(`sudah append`)
                let title = String(data.data[i].title)
                $('#containerBerita').append(`
            <div class="trend-entry d-flex">
                          <div class="number align-self-start">0${i + 1}</div>
                          <div class="trend-contents">
                            <h2><a href="${data.data[i].url}" id='${i + 1}'>${title}</a></h2>
                            <div class="post-meta">
                              <span class="d-block">${data.data[i].author},
                              <span class="date-read">${newDate} <span class="mx-1">&bullet;</span> 
                              <a onclick="translateText1('${title}')">translate</a>  
                              <a onclick="textToSpeech3('${title}')">text to speech</a>
                            
                            </div>
                          </div>
                        </div>
            
            `)
            }


            console.log(data.data[0]);
        })
        .fail(err => {
            console.log(err);
        })
}


function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: `POST`,
        url: `${URL}/googlelogin`,
        data: {
            id_token
        }
    })
        .done(data => {
            console.log(data)
            localStorage.token = data.token
            showHomePage()
        }).fail(err => {
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}