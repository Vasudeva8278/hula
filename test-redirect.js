const http = require('http');

// Function to test the redirect
function testRedirect() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    
    if (res.statusCode === 307 || res.statusCode === 302) {
      console.log('✅ Redirect detected!');
      console.log('Redirect Location:', res.headers.location);
      
      if (res.headers.location && res.headers.location.includes('/events')) {
        console.log('✅ SUCCESS: Home page redirects to /events as expected!');
      } else {
        console.log('❌ FAIL: Redirect location is not /events');
      }
    } else {
      console.log('❌ FAIL: No redirect detected (expected 302 or 307)');
    }
  });

  req.on('error', (e) => {
    console.error('❌ Error testing redirect:', e.message);
    console.log('Make sure the development server is running on http://localhost:3000');
  });

  req.end();
}

console.log('Testing redirect from home page to /events...');
testRedirect();