
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { HelpDialog } from './HelpDialog';

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        size="icon"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
      <HelpDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
