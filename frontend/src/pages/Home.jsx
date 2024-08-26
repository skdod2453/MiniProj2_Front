import { Center, Heading, HStack, Image, VStack } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Posts from '../components/Posts'
import ProfileCard from '../components/ProfileCard'
import AuthContext from '../context/AuthContext'
import PostService from '../services/PostService'
import svg from '../svgs/undraw_no_data_re_kwbl.svg'

function Home() {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])

    // 디버깅 코드: user 객체를 출력
    useEffect(() => {
        console.log("User in Home component:", user);
    }, [user]);

    const getData = useCallback(async () => {
        const postService = new PostService()
        try {
            if (user.id !== undefined) {
                console.log("Fetching posts for user ID:", user.id);
                const result = await postService.getAllByUserFollowing(user.id, localStorage.getItem("token"));
                console.log("Posts fetched successfully:", JSON.stringify(result.data, null, 2));
                setPosts(result.data);
            } else {
                console.log("User ID is undefined. Skipping fetch.");
            }
        } catch (error) {
            console.log("Error fetching posts:", error.message);
        }
    }, [user.id])

    useEffect(() => {
        console.log("Calling getData to fetch posts.");
        getData();
    }, [getData])

    return (
        <>
            <Nav />
            <ProfileCard userName={user.fullName} />  {/* ProfileCard에 fullName 전달 */}
            {
                posts.length === 0 ?
                    <Center>
                        <VStack h={'100vh'} alignItems={'center'} justifyContent={'center'}>
                            <Heading>No posts to show</Heading>
                            <Image src={svg} h={'50vh'} />
                        </VStack>
                    </Center>
                    :
                    <Posts posts={posts} />
            }
        </>
    )
}

export default Home;
