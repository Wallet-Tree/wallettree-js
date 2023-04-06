import axios from 'axios'
import { fetchAdapter } from '@wallettree/api-client'

const isWebWorker =
    typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope'

export const httpHelper = {
    get: axios.get,
    post: axios.post,
    axios: axios.create({ adapter: isWebWorker ? fetchAdapter : undefined }),
    CancelToken: axios.CancelToken,
}
