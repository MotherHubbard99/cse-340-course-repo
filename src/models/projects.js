import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT
        p.project_id,
        p.organization_id,
        p.title,
        p.description,
        p.location,
        p.date,
        o.name as organization_name
      FROM public.service_project p
      JOIN public.organization o ON p.organization_id = o.organization_id
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationID = async (organizationId) => {
    const query = `
        SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        date
        FROM public.service_project
        WHERE organization_id = $1
    `;
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);
    
    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
        p.project_id,
        p.title,
        p.description AS project_description,
        p.date,
        p.location,
        p.organization_id,
        o.name as organization_name
        FROM public.service_project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.date > CURRENT_DATE
            ORDER BY p.date
            LIMIT $1
    `;
    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description AS project_description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name,
            c.category_id,
            c.name AS category_name
        FROM public.service_project p
        JOIN public.organization o 
            ON p.organization_id = o.organization_id
        LEFT JOIN public.project_category pc
            ON pc.project_id = p.project_id
        LEFT JOIN public.category c
            ON c.category_id = pc.category_id
        WHERE p.project_id = $1
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

export { getAllProjects, getProjectsByOrganizationID, getUpcomingProjects, getProjectDetails }; 