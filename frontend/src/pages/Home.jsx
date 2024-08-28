import { Center, Heading, HStack, Image, VStack, Input, Button, Box, Flex } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Posts from '../components/Posts'
import ProfileCard from '../components/ProfileCard'
import AuthContext from '../context/AuthContext'
import PostService from '../services/PostService'
import UserService from '../services/UserService'
import svg from '../svgs/undraw_no_data_re_kwbl.svg'

function Home() {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const getData = useCallback(async () => {
        const postService = new PostService()
        try {
            if (user.id !== undefined) {
                console.log("Fetching posts for user ID:", user.id)
                const result = await postService.getAllByUserFollowing(user.id, localStorage.getItem("token"))
                console.log("Posts fetched successfully:", JSON.stringify(result.data, null, 2))
                setPosts(result.data)
            } else {
                console.log("User ID is undefined. Skipping fetch.")
            }
        } catch (error) {
            console.log("Error fetching posts:", error.message)
        }
    }, [user.id])

    useEffect(() => {
        console.log("Calling getData to fetch posts.")
        getData()
    }, [getData])

    const handleSearch = async () => {
        if (searchTerm.trim() === '') return
        
        const userService = new UserService()
        try {
            const result = await userService.searchByEmail(searchTerm, localStorage.getItem("token"))
            if (result.data) {
                navigate(`/profile/${result.data.id}`)
            } else {
                alert("사용자를 찾을 수 없습니다.")
            }
        } catch (error) {
            console.log("사용자 검색 중 오류 발생:", error.message)
            alert("사용자 검색 중 오류가 발생했습니다.")
        }
    }

    return (
        <Box>
            <Nav />
            <Flex direction="column" maxWidth="800px" margin="auto" mt={4}>
                <Box position="sticky" top="0" bg="white" zIndex="1" pb={4}>
                    <ProfileCard userName={user.fullName} />
                    <HStack mt={4}>
                        <Input 
                            placeholder="사용자 이메일 검색" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            flex={1}
                        />
                        <Button onClick={handleSearch}>검색</Button>
                    </HStack>
                </Box>
                <Box mt={4}>
                    {posts.length === 0 ? (
                        <Center>
                            <VStack h={'50vh'} alignItems={'center'} justifyContent={'center'}>
                                <Heading>표시할 게시물이 없습니다</Heading>
                                <Image src={svg} h={'30vh'} />
                            </VStack>
                        </Center>
                    ) : (
                        <Posts posts={posts} />
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

export default Home
