import { getCategoryById, getProjectsForCategory } from '../models/category.js';

async function categoryDetails(req, res) {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const projects = await getProjectsForCategory(categoryId);

    res.render("categoryDetails", {
      title: category.name,
      category,
      projects
    });
}

export { categoryDetails };