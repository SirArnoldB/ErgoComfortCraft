import { request } from "../utilities/api";

const categoriesUrl = '/api/categories';

const getAllCategories = () => request('GET', categoriesUrl);

const getCategory = (id) => request('GET', `${categoriesUrl}/${id}`);

export default { getAllCategories, getCategory };