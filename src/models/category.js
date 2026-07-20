import db from './db.js'

//retrieve a single category by its id
async function getCategoryById(categoryId) {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows[0];
}

//retrieve all categories for a given service project
async function getCategoriesForProject(projectId) {
    const query = `
        SELECT c.category_id, c.name
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
}

//retrieve all service projects for a given category
async function getProjectsForCategory(categoryId) {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id
        FROM public.service_project p
        JOIN public.project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
}

export { getCategoryById, getCategoriesForProject, getProjectsForCategory };