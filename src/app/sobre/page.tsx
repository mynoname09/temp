import Markdown from '@/components/Markdown';

// removido depois
import { readFile } from 'fs/promises';
import path from 'path';

export default async function SobrePage() {
  // TODO: Vai ser servido pela api do backend
  const filePath = path.join(process.cwd(), 'public', 'sobre.md');
  const markdownContent = await readFile(filePath, 'utf8'); 

  return <Markdown.Viewer markdown={markdownContent} />;
}
