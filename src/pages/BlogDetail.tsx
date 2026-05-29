import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag, Calendar } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { posts } from "@/data/blogPosts";
import { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function BlogDetail() {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));
  
  useIntersectionObserver();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <PageLayout>
      <article className="pt-28 pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="mb-8 section-fade">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">{post.category}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-xs">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {post.readTime} read
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden mb-12 section-fade" style={{ transitionDelay: '100ms' }}>
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none section-fade" style={{ transitionDelay: '200ms' }}>
            {post.content ? (
              <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {post.content}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Full article content coming soon...</p>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-border section-fade" style={{ transitionDelay: '300ms' }}>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-foreground mr-2 flex items-center">Tags:</span>
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
