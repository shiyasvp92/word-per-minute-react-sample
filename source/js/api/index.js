// Simple API wrapper

const API_URL = 'http://www.randomtext.me/api/';

function getRandomText() {
  const headers = {}

  const conf = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
  };
  return fetch(API_URL, conf).then((resp) => {
      const errorResponse = {
          network_error: true,
          status_code: 500,
          status_message: "Something went wrong in network"
      };
      if (resp.ok) {
          return resp.json();
      } 
  })
      .catch((error) => {
          
          const errorResponse = {
              network_error: true,
              status_code: 500,
              status_message: "Something went wrong in network"
          };
          throw errorResponse;
      });;
}

export default {
  getRandomText
};
