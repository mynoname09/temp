import { FormLabel } from '../form';

type RequiredLabelProps = {
  children: React.ReactNode;
};

export function RequiredLabel({ children }: RequiredLabelProps) {
  return (
    <FormLabel>
      {children} <span className='text-destructive'>*</span>
    </FormLabel>
  );
}
