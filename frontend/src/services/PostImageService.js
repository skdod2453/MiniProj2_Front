import axios from "axios";

export default class PostImageService {
    upload(values, token) {
        return axios.post(import.meta.env.VITE_APP_API + "postimages/upload", values, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': "Bearer " + token
            }
        })
    }
}
