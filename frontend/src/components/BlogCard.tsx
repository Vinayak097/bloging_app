interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}

export const BlogCart=({authorName,title,content,publishedDate}:BlogCardProps)=>{
    return <div>
        <div>
            <nav>
                <a href="#">+</a>
            </nav>
        </div>
        <div>
            {authorName}
        </div>
    </div>
    
}