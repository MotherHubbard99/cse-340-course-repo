import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

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

/** MIDDLEWARE 
 * The express.static middleware automatically maps the contents of your public directory to the root of your website. This keeps your URLs clean and makes it easy to organize static assets. When someone requests /css/main.css, Express looks for public/css/main.css and serves it if found.
*/
app.use(express.static(path.join(__dirname, 'public'))); //tells Express to serve static files from the public directory

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));



/*route handler aka ROUTES */
app.get('/', async(req, res) => {
  //res.sendFile(path.join(__dirname, 'src/views/home.html'));
  //changed to .ejs file to use EJS templating engine
  const title = 'Home';
  res.render('home', { title });
});

app.get('/organizations', (req, res) => {
  //res.sendFile(path.join(__dirname, 'src/views/organizations.html'));
  //changed to .ejs file to use EJS templating engine
  const title = 'Our Partner Organizations';
  res.render('organizations', { title });
});

app.get('/projects', (req, res) => {
    //res.sendFile(path.join(__dirname, 'src/views/projects.html'));
    //changed to .ejs file to use EJS templating engine
    const title = 'Service Projects';
    res.render('projects', { title });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);    
});