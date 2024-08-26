import axios from "axios";

export default class PostImageService {
    upload(values, token) {
        console.log('Uploading image. FormData contents:');
        for (let [key, value] of values.entries()) {
            console.log(key, value instanceof File ? `File: ${value.name}` : value);
        }
        console.log('Token:', token);

        return axios.post(import.meta.env.VITE_APP_API + "postimages/upload", values, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': "Bearer " + token
            }
        }).then(response => {
            console.log('Upload successful:', response.data);
            return response;
        }).catch(error => {
            console.error('Upload failed:', error.response ? error.response.data : error.message);
            console.error('Full error object:', error);
            throw error;
        });
    }
}