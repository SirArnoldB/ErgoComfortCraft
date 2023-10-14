import { request } from "../utilities/api";

const categoriesUrl = '/api/categories';

const getAllCategories = () => request('GET', categoriesUrl);

const getCategory = (id) => request('GET', `${categoriesUrl}/${id}`);

const getAllCategoriesAndItems = () => request('GET', `${categoriesUrl}/items/cat_items`);

export default { getAllCategories, getCategory, getAllCategoriesAndItems };