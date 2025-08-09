
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface ArticlesListProps {
  articles: Article[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Card key={article.docId} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
              <CardHeader className="p-0">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  data-ai-hint={article.aiHint}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                />
              </CardHeader>
              <div className="flex flex-col flex-1 p-6">
                <CardTitle className="mb-2 text-xl">{article.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  Oleh {article.author} &bull; {format(new Date(article.createdAt), 'd MMMM yyyy', { locale: id })}
                </CardDescription>
                <div className="text-muted-foreground line-clamp-3 flex-1">{article.content}</div>
                 <CardFooter className="p-0 pt-6 mt-auto">
                    <Button variant="link" className="p-0" asChild>
                        <Link href={`/articles/${article.docId}`}>
                            Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
              </div>
            </Card>
          ))
        ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>Belum ada artikel yang dipublikasikan.</p>
            </div>
        )}
      </div>
    </div>
  );
}
