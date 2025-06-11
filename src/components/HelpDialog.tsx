
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const [serviceRequest, setServiceRequest] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleServiceSubmit = () => {
    console.log('Solicitação de serviço:', { email, serviceRequest });
    // Aqui você implementaria o envio da solicitação
    setServiceRequest('');
    setEmail('');
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback:', { email, feedback });
    // Aqui você implementaria o envio do feedback
    setFeedback('');
    setEmail('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Central de Ajuda</DialogTitle>
          <DialogDescription>
            Tutoriais, suporte personalizado e feedback
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tutorials" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tutorials">Tutoriais</TabsTrigger>
            <TabsTrigger value="service">Serviço Personalizado</TabsTrigger>
            <TabsTrigger value="feedback">Feedback e Melhorias</TabsTrigger>
          </TabsList>

          <TabsContent value="tutorials" className="space-y-4">
            <h3 className="text-lg font-semibold">Vídeos Tutoriais</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="getting-started">
                <AccordionTrigger>Primeiros Passos</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Vídeo: Como começar a usar a plataforma</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Aprenda os conceitos básicos e como navegar pela plataforma.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="kanban">
                <AccordionTrigger>Gestão de Funil (Kanban)</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Vídeo: Gerenciando seu funil de vendas</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Como criar, organizar e gerenciar seus cards no sistema kanban.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="calendar">
                <AccordionTrigger>Calendário e Agendamentos</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Vídeo: Gerenciando seu calendário</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Como usar o calendário integrado e gerenciar seus compromissos.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="whatsapp">
                <AccordionTrigger>Integração WhatsApp</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Vídeo: Conectando e usando WhatsApp</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Como integrar e usar o WhatsApp para comunicação com clientes.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="agents">
                <AccordionTrigger>Agentes de IA</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Vídeo: Configurando agentes de IA</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Como criar e configurar agentes de IA para automatizar processos.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="service" className="space-y-4">
            <h3 className="text-lg font-semibold">Serviço Personalizado</h3>
            <p className="text-gray-600">
              Precisa de ajuda específica ou personalização? Nossa equipe está pronta para ajudar!
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="service-email">Seu Email</Label>
                <Input
                  id="service-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="service-request">Descreva sua necessidade</Label>
                <Textarea
                  id="service-request"
                  placeholder="Descreva detalhadamente o que você precisa..."
                  value={serviceRequest}
                  onChange={(e) => setServiceRequest(e.target.value)}
                  rows={5}
                />
              </div>
              
              <Button onClick={handleServiceSubmit} className="w-full">
                Solicitar Serviço Personalizado
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <h3 className="text-lg font-semibold">Feedback e Melhorias</h3>
            <p className="text-gray-600">
              Sua opinião é importante! Conte-nos sobre sua experiência e sugestões de melhorias.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="feedback-email">Seu Email</Label>
                <Input
                  id="feedback-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="feedback-text">Seu Feedback</Label>
                <Textarea
                  id="feedback-text"
                  placeholder="Compartilhe sua experiência, sugestões ou reportar problemas..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />
              </div>
              
              <Button onClick={handleFeedbackSubmit} className="w-full">
                Enviar Feedback
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
