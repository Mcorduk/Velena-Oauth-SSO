# SingleSignOn Oauth Application

> **Disclaimer:** Velena is an imaginary name. It is not an entity or a company. It's a placeholder name.

npm install

docker-compose up -d

CI/CD: Azure
Persistent Data: Mongo
Caching: Redis

Figuring out who people are is hard on the internet. It's pretty tough to keep track of all that yourself. OAuth is basically the industry standard for web apps to vouch for each other. You're basically asking, Google, Microsoft,Linkedin to keep track of it for you in a few steps:

    Someone walks up to your website and asks to come in. You have no idea who they are and have very little idea how to check. You ask Google to check for you since they have a whole system in place to do that.

    They tell Google who they are (usually through a reroute to a login page or through a pop up and they supply their Google credentials) and then Google turns around and tells you, 'Yeah, they're who they say they are' and hand you a signed piece of paper with their seal of approval on it (Rerouted back to your application with an auth code).

    Now that Google said it was okay and gave you the thumbs up, you can now tell Google that you're cool with letting them in if they're cool with it. Google says 'okay' tells the person what information Google is going to tell you, and then gives them a temporary key (passing the auth code for a web token).

    This key is now good for whatever you set it up to be good for (at the registration of your     app) and works for those approved parts of Google as well. Google told you that person is who   they say they are and they're good at knowing these types of things.
