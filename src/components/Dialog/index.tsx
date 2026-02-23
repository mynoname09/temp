// lib/confirmDialog.tsx
'use client';

import { createRoot } from 'react-dom/client';
import { Dialog } from './Dialog';
import { ReactNode } from 'react';

// Re-export Dialog component
export { Dialog } from './Dialog';

type ConfirmDialogOptions = {
  title?: string;
  content?: ReactNode;
};

export function ConfirmDialog({
  title = 'Tem certeza?',
  content = 'Essa ação não pode ser desfeita.',
}: ConfirmDialogOptions = {}): Promise<boolean> {
  return new Promise(resolve => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);

    const cleanup = () => {
      root.unmount();
      container.remove();
    };

    const handleConfirm = () => {
      resolve(true);
      cleanup();
    };

    const handleCancel = () => {
      resolve(false);
      cleanup();
    };

    root.render(
      <Dialog
        isVisible
        title={title}
        content={content}
        onConfirmAction={handleConfirm}
        onCancelAction={handleCancel}
        disabled={false}
      />,
    );
  });
}
