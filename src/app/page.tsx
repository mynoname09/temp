import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the App</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder='Type something...' />
          <Button className='mt-2'>Oie</Button>
        </CardContent>
      </Card>
    </div>
  );
}
