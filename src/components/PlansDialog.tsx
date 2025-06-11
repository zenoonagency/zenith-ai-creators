
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star } from 'lucide-react'

interface PlansDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const plans = [
  {
    id: 'essential',
    name: 'Essential',
    description: 'Estratégias seguintes e profissionais autônomos',
    price: 'R$ 297,00',
    period: '/mês',
    isPopular: false,
    features: [
      'Até 100 contatos',
      'Disparo em massa padrão',
      'Suporte 24/7 por whatsapp',
      'Controle financeiro e contratos',
      'CRM avançado',
      'Até 3 funis/kanbans',
      'Até 3 Disparos por mês'
    ]
  },
  {
    id: 'premium',
    name: 'Premium AI',
    description: 'Para times que precisam que precisam de mais recursos',
    price: 'R$ 397,00',
    period: '/mês',
    isPopular: true,
    features: [
      'Tudo do Essential',
      'Até 1.000 contatos',
      'Disparo com inteligência artificial',
      'ChatGPT integrado',
      'Múltiplos usuários',
      'Até 5 funis/kanbans',
      'Até 5 Disparos por mês'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise AI',
    description: 'Escale suas necessidades de recursos personalizados',
    price: 'R$ 697,00',
    period: '/mês',
    isPopular: false,
    features: [
      'Tudo do Premium AI',
      'Até 10.000 contatos',
      'Suporte 24/7 por whatsapp',
      'ChatGPT integrado',
      'Múltiplos usuários',
      'Até 10 funis/kanbans',
      'Até disparos ilimitados'
    ]
  }
]

export function PlansDialog({ open, onOpenChange }: PlansDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    // Aqui você implementaria a lógica de upgrade do plano
    console.log('Plano selecionado:', planId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Escolha seu Plano
          </DialogTitle>
          <p className="text-center text-gray-600">
            Selecione o plano que melhor atende às suas necessidades
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative transition-all duration-200 hover:shadow-lg ${
                plan.isPopular ? 'border-purple-500 shadow-lg' : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg font-semibold mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-gray-600 mb-4 min-h-[40px]">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  1 licença incluída
                </p>
                <p className="text-xs text-gray-500">
                  Licenças adicionais disponíveis no checkout
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.isPopular 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Resumo do plano</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Licenças</h4>
              <p className="text-sm text-gray-600 mb-2">1 licença incluída</p>
              <p className="text-sm text-gray-600">
                Opção de licenças adicionais dentro do checkout
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Nossos termos</h4>
              <div className="space-y-1">
                <a href="#" className="text-sm text-purple-600 hover:underline block">
                  Termos de uso
                </a>
                <a href="#" className="text-sm text-purple-600 hover:underline block">
                  Termos de segurança
                </a>
                <a href="#" className="text-sm text-purple-600 hover:underline block">
                  Termos gerais
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
