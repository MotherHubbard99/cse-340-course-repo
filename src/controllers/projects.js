import { getAllProjects, getProjectsByOrganizationID, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
const NUMBER_OF_UPCOMING_PROJECTS = 5;
import { getCategoriesForProject } from '../models/category.js';

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};  

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categoryDetails = await getCategoriesForProject(projectId);
    res.render('project', { title: projectDetails.title, project: projectDetails, categories: categoryDetails });
};

export { showProjectsPage, showProjectDetailsPage };