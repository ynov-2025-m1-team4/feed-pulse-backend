const http = require('k6/http');
const { sleep, check } = require('k6');

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '20s', target: 20 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<200'],
  },
};

function getAuthToken() {
  const loginResp = http.post(
    'https://feed-pulse-backend.onrender.com/api/auth/login',
    JSON.stringify({
      email: 'test-user@gmail.com',
      password: 'passwd1234',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(`Login response: ${loginResp.status}`);
  if (loginResp.status == 201) {
    console.log('Login successful, token received', JSON.parse(loginResp.body));
    return JSON.parse(loginResp.body).accessToken;
  }

  return null;
}

export function setup() {
  const token = getAuthToken();
  if (!token) {
    console.error('Failed to get auth token');
    return null;
  }
  return { token };
}

export default function (data) {
  // Procède à l'appel sur la route
  const response = http.get(
    'https://feed-pulse-backend.onrender.com/api/feedbacks',
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
        contentType: 'application/json',
      },
    },
  );
  // Vérifie le statut de la réponse
  // Vérifie le temps de réponse
  check(response, {
    'is status 200': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 500,
  });
  // Pause entre chaque appel / itération
  sleep(1);
}
