import { getCategoryById, getProjectsForCategory } from '../models/category.js';
import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  
    
async function category(req, res) {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const projects = await getProjectsForCategory(categoryId);

    res.render("category", {
      title: category.name,
      category,
      projects
    });
}

export { category, showCategoriesPage };