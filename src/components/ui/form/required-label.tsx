import { FormLabel } from '../form';

type RequiredLabelProps = {
  children: React.ReactNode;
  required?: boolean;
};

export function RequiredLabel({ children, required = true }: RequiredLabelProps) {
  return (
    <FormLabel>
      {children} {required && <span className='text-destructive'>*</span>}
    </FormLabel>
  );
}
