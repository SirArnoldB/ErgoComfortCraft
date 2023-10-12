import { request } from "../utilities/api";

const itemsUrl = '/api/items';

const getAllItems = () => request('GET', itemsUrl);

const getItem = (id) => request('GET', `${itemsUrl}/${id}`);

export default {
    getAllItems, getItem
};