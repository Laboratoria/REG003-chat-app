import type {NextApiRequest} from 'next'
// crear namespace y  exportar la interfaz para poder customizar el tipo de request
declare namespace Next {
  export interface  Custom extends NextApiRequest {
        authentication ?: { email:String, username: String, password:String }

      }
  }
