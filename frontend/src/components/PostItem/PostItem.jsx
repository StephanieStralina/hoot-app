

export default function PostItem({ post }) {
    return <article>
        <h3>{new Date(post.createdAt).toLocaleDateString()}</h3>
        <p>{post.content}</p>
        <h4>{post.user.name}</h4>
    </article>
}