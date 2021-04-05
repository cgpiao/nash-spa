import httpClient from './httpClient'
const accounts = {
   show: () => httpClient.get('account'),
   create: (data) => httpClient.post('accounts', data),
}
const orders = {
   index: (queries={}) => httpClient.get('orders', {params: queries}),
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

const intents = {
   create: (data) => httpClient.post('intents', data),
}

export default {
   accounts,
   auth,
   attachments,
   hashes,
   intents,
   orders
}
