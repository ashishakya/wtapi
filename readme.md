* Run `npm run serve`

* Navigate to /src in web

* You get the access token in the console or is stored in the session 



# Explanation

The token came back from the OAuth popup. I’ll trace how this library attaches it to API calls so we can see why Postman got unauthorized.

Here is the sequence that just ran:

1. api.connect() opened https://pluscloud-demo.wildixin.com/authorization/oauth2 with your application id, redirect URL, and response_type=token.

2. After you signed in, the PBX sent the browser back to http://localhost:8222/src/oauth2redirect.html#access_token=...&expires_in=...&state=wtapiAuth.

3. oauth2redirect.html read that hash and called oauth2Callback on the opener tab.

4. handleCallbackData stored the token in sessionStorage and set this header for every later request from the page:

`wtapi.v2.js Ln 3731-3733`
(ajax.setAuthorizationToken = function (e) {
  this.settings.headers.Authorization = 'Bearer ' + e
})

5. Only then does the library request the same URL you tried in Postman. The console line OAuth authorization success fires as soon as the token arrives, before that request finishes. A token in the console does not mean personal/info succeeded.

In Postman, on that GET request, open Authorization, choose Bearer Token, and paste only the raw access_token value. Postman will send Authorization: Bearer <token>. A request with no header, or with the token in the query string, is rejected with 401. If it still returns 401, the token has expired (expires_in from the callback) or the OAuth app was issued without access to that API. Check the browser Network tab for the page’s own personal/info call and compare its Authorization header with Postman’s.

That token is the user’s REST credential for  the site. This library uses it for two steps:

GET /api/v1/personal/info returns the signed-in user’s extension, name, email, JID, license, and the password used for the realtime connection.
With that profile, the library opens wss://<subdomain>.wildixin.com/xmpp/ and, once that socket is up, emits connected. From there the same session can send presence, messages, and other PBX calls. The websocket uses the extension and password from personal/info, not the bearer token.

The token stays in sessionStorage for this tab only and stops working when expires_in elapses. The same Authorization: Bearer <token> header is what any other /api/v1/... call on that PBX needs.
