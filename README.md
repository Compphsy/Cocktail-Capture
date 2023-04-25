<h1>Introduction</h1>

Cocktail Capture is an application that allows users to add and store cocktail recipes along with photo and location data. This application aims to provide a user-friendly platform for cocktail enthusiasts to store and share their favorite cocktail recipes.

<h1>Features</h1>

Cocktail Capture offers the following features:

Add and store cocktail recipes with photo and location data
Edit and delete existing cocktail recipes
Search for cocktail recipes by name or ingredient
View cocktail recipes with a list of ingredients, preparation steps, and photo
View the location where the cocktail was captured on a map

<h1>Running the Application</h1>

To run the application, follow these steps:

1. Clone the repository to your local machine.
2. Set up a MongoDB Atlas or Compass account and create a new cluster.
3. Create a .env file in the root directory with the following variables:
MONGO_URI=[Your MongoDB Atlas URI]
JWT_SECRET=[Add secret key]
PORT=[Port number for the server]
4. Open a terminal and navigate to the project directory.
5. Run npm install to install the project's dependencies.
6. Start the server using npm run dev.
7. Open a web browser and navigate to http://localhost:PORT to access the application.

<h1>Technologies Used</h1>

<ol>
<li>React</li>
<li>Node.js</li>
<li>MongoDB</li>
<li>Express</li>
<li>Cloudinary</li>
<li>IndexedDB</li>
</ol>
<h1>Contribute</h1>
<ol>
<li>Fork the repository.</li>
<li>Make your changes.</li>
<li>Submit a pull request.</li>
</ol>

<h1>Roadmap</h1>

<ol>
<li>Add user authentication and authorization</li>
<li>Allow users to rate and review cocktails</li>
<li>Implement a feature to suggest cocktails based on ingredients or location</li>
<li>Improve the user interface and add more interactive features</li>
</ol>

<h2>License</h2>

This project is licensed under the MIT License.
