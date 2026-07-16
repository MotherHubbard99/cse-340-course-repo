import { getAllProjects, getProjectsByOrganizationID } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};  

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectById(projectId);
    res.render('project', { project });
};

export { showProjectsPage, showProjectDetailsPage};