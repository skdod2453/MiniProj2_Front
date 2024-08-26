import { Center, VStack } from '@chakra-ui/react'
import React from 'react'
import PostCard from './PostCard'

function Posts({ posts }) {

    const imageUrl = import.meta.env.VITE_APP_API + "postimages/download/";

    // Ensure that posts is an array
    const validPosts = Array.isArray(posts) ? posts : [];

    return (
        <Center>
            <VStack marginTop={'50px'} spacing={5}>
                {
                    validPosts.length === 0 ? (
                        <div>No posts available</div>
                    ) : (
                        validPosts.map(post => (
                            <PostCard
                                key={post.id}
                                description={post.description}
                                userName={post.userName + " " + post.userLastName}
                                postImage={imageUrl + post.id}
                                postId={post.id}
                                userId={post.userId}
                            />
                        ))
                    )
                }
            </VStack>
        </Center>
    )
}

export default Posts
