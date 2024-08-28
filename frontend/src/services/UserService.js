import axios from 'axios'

export default class UserService {
    getById(id, token) {
        return axios.get(import.meta.env.VITE_APP_API + "users/getbyid/" + id, {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    isFollowing(userId, followingId, token) {
        return axios.get(import.meta.env.VITE_APP_API + `users/isfollowing?userId=${userId}&followingId=${followingId}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    // 수정된 부분: email로 사용자를 검색하는 메서드
    searchByEmail(email, token) {
        return axios.get(import.meta.env.VITE_APP_API + `users/search/${email}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
}
