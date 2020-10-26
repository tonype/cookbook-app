# Cookbook API
This is the Cookbook API Express server. It provides CRUD functionality for Recipes, Ingredients, user provided Measurement Units, and Tags. It uses MongoDB for data persistence.

To run:
- `npm install`
- `npm run serve`

That's it. Yay. [Nodemon](https://github.com/remy/nodemon) is used, so no need for manual restarts with code changes.

Environment variables are utilized. [dotenv](https://github.com/motdotla/dotenv) is used to load those in on local dev environments via a .env file. Please see .env.example for information on what environment variables are available, as well as which ones are required or optional.
