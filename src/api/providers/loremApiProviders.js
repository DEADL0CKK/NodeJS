const axios = require('axios');

// exports.getRandomText = () => {
//     return new Promise((resolve, reject) => {
//         axios.get('https://loripsum.net/api/plaintext', {
//                 responseType: "text"   
//             })
//             .then(response => {
//                 return response.data
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     })
// }

exports.getRandomText = () => {

    return axios.get('https://loripsum.net/api/plaintext', {
            responseType: "text"
        })
        .then((response) => {
            return (response.data)

        })
        .catch((error) => {
            // console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        })
}