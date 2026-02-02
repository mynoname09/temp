import { PlusIcon } from 'lucide-react';
import { FloatingButton } from '@/components/FloatingButton';

type FloatingAddButtonProps = {
  entityName: string;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
};

export function FloatingAddButton({
  entityName,
  onClick,
  position,
}: FloatingAddButtonProps) {
  return (
    <FloatingButton
      onClick={onClick}
      position={position}
      aria-label={`Adicionar nova tag de ${entityName}`}
    >
      <PlusIcon className='size-6' />
    </FloatingButton>
  );
}
