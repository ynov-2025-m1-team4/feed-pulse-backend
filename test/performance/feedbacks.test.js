const http = require('k6/http');
const { sleep, check, group } = require('k6');
const { Rate, Trend } = require('k6/metrics');

// Custom metrics to track Render-specific behavior
const coldStartRate = new Rate('cold_start_rate');
const warmupTime = new Trend('warmup_time');
const authFailureRate = new Rate('auth_failure_rate');

export const options = {
  stages: [
    // Warmup phase - handle cold starts
    { duration: '30s', target: 1 },   // Single user warmup
    { duration: '30s', target: 5 },   // Gradual ramp

    // Load testing phases
    { duration: '2m', target: 20 },   // Ramp up
    { duration: '3m', target: 20 },   // Sustained load
    { duration: '1m', target: 50 },   // Peak load
    { duration: '2m', target: 50 },   // Sustained peak
    { duration: '2m', target: 0 },    // Ramp down
  ],
  
  thresholds: {
    // Adjusted thresholds for Render cold starts
    http_req_duration: ['p(90)<2000', 'p(95)<5000'], // More lenient for cold starts
    'http_req_duration{scenario:warmup}': ['p(90)<10000'], // Very lenient for warmup
    'http_req_duration{scenario:normal}': ['p(90)<500'], // Strict for warmed up
    http_req_failed: ['rate<0.1'], // 10% failure rate acceptable
    cold_start_rate: ['rate<0.3'], // Track cold start frequency
    auth_failure_rate: ['rate<0.05'], // Auth should be reliable
    checks: ['rate>0.9'], // 90% of checks should pass
  },
  
  // Enable detailed timing data
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

const BASE_URL = 'https://feed-pulse-backend.onrender.com/api';
const TEST_USER = {
  email: 'test-user@gmail.com',
  password: 'Password123!'
};

function getAuthToken() {
  const startTime = new Date();
  
  const loginResp = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify(TEST_USER),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: '30s', // Longer timeout for potential cold starts
    }
  );
  
  const duration = new Date() - startTime;
  
  // Track if this was likely a cold start (>3s response)
  const wasColdStart = duration > 3000;
  coldStartRate.add(wasColdStart);
  
  if (wasColdStart) {
    warmupTime.add(duration);
    console.log(`Potential cold start detected: ${duration}ms`);
  }
  
  console.log(`Login response: ${loginResp.status} (${duration}ms)`);
  
  const authSuccess = loginResp.status === 201;
  authFailureRate.add(!authSuccess);
  
  if (authSuccess) {
    try {
      const body = JSON.parse(loginResp.body);
      console.log('Login successful, token received');
      return body.accessToken;
    } catch (e) {
      console.error('Failed to parse login response:', e);
      authFailureRate.add(true);
      return null;
    }
  }
  
  console.error(`Login failed with status: ${loginResp.status}`);
  return null;
}

export function setup() {
  console.log('Setting up test - attempting initial authentication...');
  
  // Try multiple times if first attempt fails (common with cold starts)
  let token = null;
  let attempts = 0;
  const maxAttempts = 3;
  
  while (!token && attempts < maxAttempts) {
    attempts++;
    console.log(`Authentication attempt ${attempts}/${maxAttempts}`);
    
    token = getAuthToken();
    
    if (!token && attempts < maxAttempts) {
      console.log('Retrying authentication in 5 seconds...');
      sleep(5);
    }
  }
  
  if (!token) {
    console.error('Failed to get auth token after multiple attempts');
    return null;
  }
  
  console.log('Setup completed successfully');
  return { token };
}

export default function (data) {
  if (!data || !data.token) {
    console.error('No valid token available');
    return;
  }
  
  const isWarmupPhase = __ITER < 10; // First 10 iterations considered warmup
  const scenario = isWarmupPhase ? 'warmup' : 'normal';
  
  group('API Performance Test', function () {
    // Test main feedbacks endpoint
    group('Get Feedbacks', function () {
      const response = http.get(
        `${BASE_URL}/feedbacks`,
        {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json',
          },
          timeout: isWarmupPhase ? '30s' : '10s',
          tags: { scenario: scenario }
        }
      );
      
      const checks = check(response, {
        'status is 200': (r) => r.status === 200,
        'response time acceptable': (r) => {
          // More lenient during warmup
          const threshold = isWarmupPhase ? 10000 : 2000;
          return r.timings.duration < threshold;
        },
        'response has content': (r) => r.body && r.body.length > 0,
        'response is valid JSON': (r) => {
          try {
            JSON.parse(r.body);
            return true;
          } catch (e) {
            return false;
          }
        }
      });
      
      // Log slow responses for debugging
      if (response.timings.duration > 5000) {
        console.log(`Slow response detected: ${response.timings.duration}ms (Status: ${response.status})`);
      }
      
      // Handle potential rate limiting or server errors
      if (response.status === 429) {
        console.log('Rate limited - backing off');
        sleep(5);
      } else if (response.status >= 500) {
        console.log(`Server error: ${response.status} - may indicate cold start or overload`);
      }
    });
    
    // Additional endpoint tests (add your other endpoints here)
    /*
    group('Other Endpoints', function () {
      // Test other critical endpoints
      // Example:
      // const profileResp = http.get(`${BASE_URL}/profile`, {...});
    });
    */
  });
  
  // Adaptive sleep based on performance
  const sleepTime = isWarmupPhase ? 3 : 1; // Longer sleep during warmup
  sleep(sleepTime);
}

// Teardown function to clean up if needed
export function teardown(data) {
  console.log('Test completed');
  
  // Optional: Log out or clean up test data
  if (data && data.token) {
    console.log('Cleaning up authentication session...');
    // Add logout call if your API supports it
  }
}

// Custom summary to highlight Render-specific metrics
export function handleSummary(data) {
  const summary = {
    'summary.json': JSON.stringify(data, null, 2),
  };
  
  // Log important metrics
  console.log('\n=== RENDER API PERFORMANCE SUMMARY ===');
  console.log(`Cold Start Rate: ${(data.metrics.cold_start_rate.values.rate * 100).toFixed(2)}%`);
  console.log(`Auth Failure Rate: ${(data.metrics.auth_failure_rate.values.rate * 100).toFixed(2)}%`);
  console.log(`Average Response Time: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms`);
  console.log(`95th Percentile: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms`);
  
  return summary;
}