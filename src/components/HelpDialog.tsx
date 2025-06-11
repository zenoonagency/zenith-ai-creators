
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
import { 
  Video, 
  MessageSquare, 
  Heart, 
  Play, 
  Clock, 
  Star,
  ArrowLeft,
  Send,
  CheckCircle
} from 'lucide-react';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const [serviceRequest, setServiceRequest] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [currentView, setCurrentView] = useState<'main' | 'service' | 'feedback'>('main');
  const [rating, setRating] = useState(0);
  const [priority, setPriority] = useState('');

  const handleServiceSubmit = () => {
    console.log('Solicitação de serviço:', { email, serviceRequest, priority });
    setServiceRequest('');
    setEmail('');
    setPriority('');
    setCurrentView('main');
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback:', { email, feedback, rating });
    setFeedback('');
    setEmail('');
    setRating(0);
    setCurrentView('main');
  };

  const tutorials = [
    { 
      title: 'Introdução ao sistema Zenaix', 
      duration: '5:25', 
      icon: <Play className="h-4 w-4" />,
      description: 'Conheça os principais recursos da plataforma'
    },
    { 
      title: 'Como usar o disparo em massa', 
      duration: '5:40', 
      icon: <Play className="h-4 w-4" />,
      description: 'Aprenda a enviar mensagens para múltiplos contatos'
    },
    { 
      title: 'Gerenciamento de contatos e importação', 
      duration: '4:12', 
      icon: <Play className="h-4 w-4" />,
      description: 'Organize e importe seus contatos facilmente'
    },
    { 
      title: 'Configurando seu funil de vendas', 
      duration: '7:30', 
      icon: <Play className="h-4 w-4" />,
      description: 'Monte seu pipeline de vendas de forma eficiente'
    },
    { 
      title: 'Usando o assistente de IA', 
      duration: '6:15', 
      icon: <Play className="h-4 w-4" />,
      description: 'Automatize processos com inteligência artificial'
    },
    { 
      title: 'Gerenciando sua equipe', 
      duration: '4:45', 
      icon: <Play className="h-4 w-4" />,
      description: 'Adicione colaboradores e gerencie permissões'
    },
    { 
      title: 'Criando templates para mensagens', 
      duration: '5:20', 
      icon: <Play className="h-4 w-4" />,
      description: 'Padronize sua comunicação com templates'
    }
  ];

  const renderMainView = () => (
    <div className="space-y-6">
      {/* Header com cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200"
          onClick={() => {/* Scroll to tutorials */}}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Vídeos tutoriais</h3>
            <p className="text-sm text-gray-600">Assista a vídeos explicativos sobre as funcionalidades do sistema.</p>
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 cursor-pointer hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200"
          onClick={() => setCurrentView('service')}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Serviço personalizado</h3>
            <p className="text-sm text-gray-600">Solicite suporte técnico ou um serviço personalizado para seu negócio.</p>
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 cursor-pointer hover:from-pink-100 hover:to-pink-200 transition-all duration-200 border border-pink-200"
          onClick={() => setCurrentView('feedback')}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Feedback e sugestões</h3>
            <p className="text-sm text-gray-600">Compartilhe sua opinião e sugira melhorias para o sistema.</p>
          </div>
        </div>
      </div>

      {/* Seção de vídeos tutoriais */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Vídeos tutoriais</h3>
        
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="basicos">Básicos</TabsTrigger>
            <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
            <TabsTrigger value="avancados">Avançados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-3">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {tutorial.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tutorial.title}</h4>
                    <p className="text-sm text-gray-500">{tutorial.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <span className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration}
                  </span>
                  <Button size="sm" variant="outline">
                    Assistir
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="basicos" className="space-y-3">
            {tutorials.slice(0, 2).map((tutorial, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {tutorial.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tutorial.title}</h4>
                    <p className="text-sm text-gray-500">{tutorial.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <span className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration}
                  </span>
                  <Button size="sm" variant="outline">
                    Assistir
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="mensagens" className="space-y-3">
            {tutorials.slice(2, 4).map((tutorial, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {tutorial.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tutorial.title}</h4>
                    <p className="text-sm text-gray-500">{tutorial.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <span className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration}
                  </span>
                  <Button size="sm" variant="outline">
                    Assistir
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="avancados" className="space-y-3">
            {tutorials.slice(4).map((tutorial, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {tutorial.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tutorial.title}</h4>
                    <p className="text-sm text-gray-500">{tutorial.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <span className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration}
                  </span>
                  <Button size="sm" variant="outline">
                    Assistir
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const renderServiceView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentView('main')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-semibold text-gray-900">Solicitar serviço personalizado</h3>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-gray-700">
          Nossa equipe está pronta para ajudar você a personalizar a plataforma de acordo com suas necessidades específicas.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="service-email" className="text-sm font-medium">Seu Email *</Label>
          <Input
            id="service-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Tipo de serviço *</Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'integracao', label: 'Integração personalizada' },
              { value: 'customizacao', label: 'Customização de interface' },
              { value: 'automacao', label: 'Automação de processos' },
              { value: 'treinamento', label: 'Treinamento da equipe' },
              { value: 'outro', label: 'Outro' }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="service-type"
                  value={option.value}
                  checked={priority === option.value}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="service-request" className="text-sm font-medium">Detalhes da solicitação *</Label>
          <Textarea
            id="service-request"
            placeholder="Descreva com detalhes o que você precisa..."
            value={serviceRequest}
            onChange={(e) => setServiceRequest(e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Prioridade</Label>
          <div className="flex space-x-6">
            {[
              { value: 'baixa', label: 'Baixa', color: 'bg-green-100 text-green-800' },
              { value: 'media', label: 'Média', color: 'bg-yellow-100 text-yellow-800' },
              { value: 'alta', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
              { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-800' }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={priority === option.value}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${option.color}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('main')}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleServiceSubmit} 
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            disabled={!email || !serviceRequest || !priority}
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar solicitação
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFeedbackView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentView('main')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-semibold text-gray-900">Feedback e sugestões</h3>
      </div>

      <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
        <p className="text-gray-700">
          Sua opinião é muito importante para nós! Compartilhe sua experiência e ajude-nos a melhorar a plataforma.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="feedback-email" className="text-sm font-medium">Seu Email *</Label>
          <Input
            id="feedback-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Tipo de feedback</Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'bug', label: 'Reportar problema/bug' },
              { value: 'melhoria', label: 'Sugestão de melhoria' },
              { value: 'elogio', label: 'Elogio/Experiência positiva' },
              { value: 'recurso', label: 'Solicitação de novo recurso' },
              { value: 'outro', label: 'Outro' }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="feedback-type"
                  value={option.value}
                  className="w-4 h-4 text-pink-600"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="feedback-text" className="text-sm font-medium">Sua mensagem *</Label>
          <Textarea
            id="feedback-text"
            placeholder="Compartilhe suas ideias e opiniões..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Avaliação geral</Label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-8 h-8 ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 transition-colors`}
              >
                <Star className="w-full h-full fill-current" />
              </button>
            ))}
            <span className="text-sm text-gray-500 ml-2">
              {rating > 0 && `${rating}/5 estrelas`}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('main')}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleFeedbackSubmit} 
            className="flex-1 bg-pink-600 hover:bg-pink-700"
            disabled={!email || !feedback}
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar feedback
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto bg-gray-50">
        <DialogHeader className="border-b border-gray-200 pb-4 bg-white -mx-6 -mt-6 px-6 pt-6 mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">Central de Ajuda</DialogTitle>
          <DialogDescription className="text-gray-600">
            Tutoriais, suporte personalizado e feedback
          </DialogDescription>
        </DialogHeader>

        <div className="px-1">
          {currentView === 'main' && renderMainView()}
          {currentView === 'service' && renderServiceView()}
          {currentView === 'feedback' && renderFeedbackView()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
