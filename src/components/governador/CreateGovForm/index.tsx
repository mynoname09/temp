'use client';

import { Input } from '@ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@ui/button';
import { createGovAction } from '@actions/governador/create-gov.action';

// TODO: Tipar corretamente governador/personalidade
type GovFormProps = {
  governor?: any;
};

async function onSubmit(data: FormData) {
  console.log('dados validados:', data);
  await createGovAction(data);
}

//TODO: Padronizar
const formSchema = z.object({
  name: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateGovForm({ governor }: GovFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: governor?.name || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder='Ricardo Vieira Coutinho' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Salvar</Button>
      </form>
    </Form>
  );
}
