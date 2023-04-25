<h1>Introduction</h1>

Cocktail Capture is an application that allows users to add and store cocktail recipes along with photo and location data. This application aims to provide a user-friendly platform for cocktail enthusiasts to store and share their favorite cocktail recipes.

<h1>Features</h1>

Cocktail Capture offers the following features:

<ol>
<li>Add and store cocktail recipes with optional photo and location data</li>
<li>Edit and delete existing cocktail recipes</li>
<li>Search for cocktail recipes by name</li>
<li>View cocktail recipes with a list of ingredients, preparation steps, and optional photo and location data</li>
</ol>

<h1>Running the Application</h1>

<p>To run the application, follow these steps:</p>

<ol>
<li>Clone the repository to your local machine.</li>
<li>Set up a MongoDB Atlas or Compass account and create a new cluster.</li>
<li>Create a .env file in the root directory with the following variables:</li>
    <ul>
      <li>MONGO_URI=[Your MongoDB Atlas URI]</li>
      <li>JWT_SECRET=[Add secret key]</li>
      <li>PORT=[Port number for the server]</li>
    </ul>
<li>Open a terminal and navigate to the project directory.</li>
<li>Run npm install to install the project's dependencies.</li>
<li>Start the server using npm run dev.</li>
<li>Open a web browser and navigate to http://localhost:PORT to access the application.</li>
</ol>

<h1>Technologies Used</h1>

<ul>
<li>React</li>
<li>Node.js</li>
<li>MongoDB</li>
<li>Express</li>
<li>Cloudinary</li>
<li>IndexedDB</li>
</ul>

<h1>Contribute</h1>

<ol>
<li>Fork the repository.</li>
<li>Make your changes.</li>
<li>Submit a pull request.</li>
</ol>

<h1>Roadmap</h1>

<ul>
<li>Add user authentication and authorization</li>
<li>Allow users to rate and review cocktails</li>
<li>Implement a feature to suggest cocktails based on ingredients or location</li>
<li>Improve the user interface and add more interactive features</li>
</ul>

<h2>License</h2>

<p>This project is licensed under the MIT License. </p>
