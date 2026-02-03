import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface MarkdownViewProps {
  markdown?: string;
}

export default function MarkdownView({ markdown }: MarkdownViewProps) {
  return (
    <div
      className={cn(
        'prose dark:prose-invert',
        'w-full max-w-none',
        'overflow-hidden',
        'prose-a:text-highlight',
        'prose-a:hover:text-highlight-hover',
        'prose-a:hover:underline',
        'prose-img:mx-auto',
        'lg:prose-lg',
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return '';

            return (
              <div className='overflow-x-auto'>
                <table className='w-full min-w-150' {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
