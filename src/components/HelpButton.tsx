
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { HelpDialog } from './HelpDialog';

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 z-50 group"
        size="icon"
      >
        <div className="relative">
          <HelpCircle className="h-7 w-7 text-white transition-transform group-hover:scale-110" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </Button>
      
      {/* Tooltip */}
      <div className="fixed bottom-20 right-8 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40">
        Central de Ajuda
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
      
      <HelpDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
