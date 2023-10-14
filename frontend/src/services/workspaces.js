import { request } from "../utilities/api";

const workspacesUrl = '/api/workspaces';

const getAllWorkSpaces = () => request('GET', workspacesUrl);

const getWorkSpace = (id) => request('GET', `${workspacesUrl}/${id}`);

const createWorkSpace = (workSpace) => request('POST', workspacesUrl, workSpace);

const updateWorkSpace = (workSpace) => request('PUT', `${workspacesUrl}/${workSpace.workspace_id}`, workSpace);

const deleteWorkSpace = (id) => request('DELETE', `${workspacesUrl}/${id}`);

export default {
    getAllWorkSpaces,
    getWorkSpace,
    createWorkSpace,
    updateWorkSpace,
    deleteWorkSpace
};  