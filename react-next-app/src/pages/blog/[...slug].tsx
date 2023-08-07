import { useRouter } from "next/router";
const Blog = () => {
    const router = useRouter();

    console.log(router);
    
    return (
        <p>the Blog Page {router.query.slug}</p>
    )
}

export default Blog;