
import { getArticle } from '@/app/admin/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { LanguageProvider } from '@/contexts/language-context';

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <LanguageProvider>
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-16 md:py-24 bg-secondary">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <article className="prose lg:prose-xl max-w-none bg-background p-6 md:p-12 rounded-lg shadow-lg">
                        <header className="not-prose mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">{article.title}</h1>
                            <div className="flex items-center text-muted-foreground text-sm space-x-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={article.createdAt}>
                                        {format(new Date(article.createdAt), 'd MMMM yyyy', { locale: id })}
                                    </time>
                                </div>
                            </div>
                        </header>
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            data-ai-hint={article.aiHint}
                            width={1200}
                            height={600}
                            className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
                            priority
                        />
                        <div className="whitespace-pre-wrap">
                            {article.content}
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    </LanguageProvider>
  );
}
