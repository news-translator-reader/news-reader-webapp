const URL = `http://localhost:3000`


$(document).ready(function () {
    showRegister();
    // showHomePage();
    // kalau udah jalan log in nya localStorage ini di delete ya, di ganti setelah log in punya data
    localStorage.setItem('interest', 'health');
    localStorage.setItem('location', 'id');


    newsAPI()
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
    $('.signup').hide();
    $('.sign-in').hide();
    $('.Homepage').show();
}

function register() {
    event.preventDefault()
    let name = $('#name').val();
    let location = $('#location').val();
    let interest = $('#interest').val();
    let email = $('#email').val();
    let password = $('#pass').val();
    let rePassword = $('#re_pass').val();

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
        showLogIn();
    }

    // console.log(name, location, interest, email, password, rePassword, `.........register`)
}

function login() {
    let loginEmail = $('#your_email').val();
    let loginPass = $('#your_pass').val();
    // check ke database apakah email nya terdaftar ato nggk
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

function translateText(text) {
    //console.log(text)
    let dataText = text;
    let textID = `'#1'`;    

    $.ajax({
        url: `${URL}/api/translate`,
        method: `post`,
        headers:{
            text,
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
                          <a onclick="textToSpeech2('${data.translate}')">text to speech</a>
                              
                              
                              
                            </div>
                          </div>
                        </div>
 

            `)
            


        })
        .fail(err => {
            console.log(err);
        })
}



function textToSpeech2(text) {

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

function newsAPI() {
    // localStorage.interest = 'sports'
    let interest = localStorage.interest;
    let location = localStorage.location;


    $.ajax({
        url: `${URL}/api/news`,
        method: `get`,
        headers: {
            interest,
            location
        }
    })
        .then(data => {
            for (let i = 0; i < 1; i++) {
                let newDate = data.data[i].publishedAt.slice(0, 10);
                // console.log(data.data[i].publishedAt)
                $('#containerBerita').append(`
            <div class="trend-entry d-flex">
                          <div class="number align-self-start">0${i + 1}</div>
                          <div class="trend-contents">
                            <h2><a href="${data.data[i].url}"id='${i+1}'>${data.data[i].title}</a></h2>
                            <div class="post-meta">
                              <span class="d-block">${data.data[i].author},
                              <span class="date-read">${newDate} <span class="mx-1">&bullet;</span> 
                              <a onclick="translateText('${data.data[i].title}')">translate</a>  <a onclick="textToSpeech2('${data.data[i].title}')">text to speech</a>
                              
                              
                              
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




