const axios = require('axios');
const unirest = require("unirest");





class ApiController {
    static getNews(req, res, next) {
        let { interest, location } = req.headers;
        console.log(interest, location)
        // let location = `id`;
        // let interest = `Entertainment`



        const url = `http://newsapi.org/v2/top-headlines?country=${location}&category=${interest}&apiKey=${process.env.newsApiKey}`;

        axios({
            method: 'GET',
            url: url,
        })
            .then(response => {
                let { data } = response;
                let beritaPertama = data.articles;
                res.status(200).json({ data: beritaPertama })
            })
            .catch(err => {
                next(err)
            })


    }

    static translate(req, res) {
        let { text, location } = req.headers

        if (location === `id`) {
            location = `en`;
        }
        else {
            location = `id`;
        }
        console.log(text, location.length, `...........translat`);

        axios({
            "method": "POST",
            "url": "https://microsoft-translator-text.p.rapidapi.com/translate",
            "headers": {
                "content-type": "application/json",
                "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
                "x-rapidapi-key": "facbfbaee5mshd9fd8c895d78e8cp1485f6jsn60cb5a1e9b16",
                "accept": "application/json",
                "useQueryString": true
            }, "params": {
                "profanityAction": "NoAction",
                "textType": "plain",
                "to": `${location}`,
                "api-version": "3.0"
            }, "data": [{
                "Text": `${text}`
            }]
        })
            .then((response) => {
                // console.log(response.data[0]);
                let translate = response.data[0].translations[0].text;
                res.status(200).json({ translate })
            })
            .catch((error) => {
                console.log(error);
            })




    }

    static read(req, res) {

    }

}

module.exports = ApiController;