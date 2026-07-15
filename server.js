import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';


/*put these in the .env file for development only/
const NODE_ENV = 'production';
const PORT = 3000; */

/*production */
//define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';  //application environment

const PORT = process.env.PORT || 3000;  //define the port number for the server to listen on

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//save this to app.locals so it can be accessed in EJS templates
app.locals.NODE_ENV = NODE_ENV;  //save the application environment to app.locals so it can be accessed in EJS templates  

/** MIDDLEWARE 
 * The express.static middleware automatically maps the contents of your public directory to the root of your website. This keeps your URLs clean and makes it easy to organize static assets. When someone requests /css/main.css, Express looks for public/css/main.css and serves it if found.
*/
app.use(express.static(path.join(__dirname, 'public'))); //tells Express to serve static files from the public directory

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));



//MIDDLEWARE to log all incoming requests to the console for debugging purposes
app.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next(); //pass control to the next middleware function in the stack or route handler if there are no more middleware functions to execute
});



/*route handler aka ROUTES */
app.get('/', async (req, res) => {
  //res.sendFile(path.join(__dirname, 'src/views/home.html'));
  //changed to .ejs file to use EJS templating engine
  const title = 'Home';
  res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
  //res.sendFile(path.join(__dirname, 'src/views/organizations.html'));
  //changed to .ejs file to use EJS templating engine
  try {
    const organizations = await getAllOrganizations();
    console.log('Organizations:', organizations); // Log the organizations to the console for debugging

    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).send('Error fetching organizations');
  }
});

app.get('/projects', async (req, res) => {
  //res.sendFile(path.join(__dirname, 'src/views/projects.html'));
  //changed to .ejs file to use EJS templating engine
  try {
    const projects = await getAllProjects();
    const organizations = await getAllOrganizations(); // Fetch organizations to map organization_id to name
    const organizationMap = organizations.reduce((map, org) => {
      map[org.organization_id] = org.name;
      return map;
    }, {});
    console.log('Projects:', projects); // Log the projects to the console for debugging

    const title = 'Service Projects';
    res.render('projects', { title, projects, organizationMap });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Error fetching projects');
  }
});

app.get('/categories', async (req, res) => {
  try {
    console.log("HIT /categories route");
    const categories = await getAllCategories();
    console.log("Categories from DB:", categories);

    const title = 'Service Categories';
    res.render('categories', { title, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
});

/*ERROR HANDLING MIDDLEWARE*/

// Test route for 500 errors: http://127.0.0.1:3000/test-error
app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
});

// Catch-all route for 404 errors: This only runs if there is an error not caught by the Express error handler
//http://127.0.0.1:3000/sldkfjlksj   (to test 404 error handling)
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

//EXPRESS ERROR HANDLER: This middleware handles errors passed to next() in the previous middleware or route handlers. It logs the error and renders an appropriate error page.

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});