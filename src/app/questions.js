import axios from 'axios';

const getQuestions = () => {

    return axios
        .get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
        .then((response) => {
            return response.data.results;

        })
        .catch((error) => {
            console.log(error);
        });

}
export default getQuestions;