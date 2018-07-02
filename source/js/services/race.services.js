import api from 'api';

export class RaceServices {
    static getRandomText() {
        return api.getRandomText().
        then((resp) => {
            if (resp && resp.text_out) {
                return resp;
            }
            throw resp;
        });
    }
}