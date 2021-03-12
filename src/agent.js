import httpClient from './httpClient'
const accounts = {
   create: (data) => httpClient.post('accounts', data)
}
const auth = {
   login: (data) => httpClient.post('login', data),
   logout: (data) => httpClient.delete('logout', data),
}

const attachments = {
   index: (queries) => httpClient.get('files', {params: queries}),
   create: (data) => httpClient.post('files', data),
   show: id => httpClient.get(`files/${id}`),
}

const hashes = {
   pinByHash: (hash, data) => httpClient.put(`hashes/${hash}/pin`, data),
   unpin: hash => httpClient.delete(`hashes/${hash}/unpin`),
}

export default {
   accounts,
   auth,
   attachments,
   hashes,
}
