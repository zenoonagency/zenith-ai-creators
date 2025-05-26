
import { useNavigate } from "react-router-dom"
import { Bot, MessageCircle, Sparkles, ArrowRight, Zap, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Index = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">AI Agents Hub</h1>
            </div>
            <Button 
              onClick={() => navigate("/agentes")}
              className="bg-primary hover:bg-primary/90"
            >
              Começar Agora
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Crie Agentes de IA
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Personalizados
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Configure agentes inteligentes para vendas, suporte e atendimento. 
              Integre com WhatsApp e automatize seu negócio com IA avançada.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/agentes")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Bot className="h-5 w-5 mr-2" />
              Criar Agente de IA
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/whatsapp")}
              className="border-2 px-8 py-4 text-lg font-medium rounded-lg hover:shadow-lg transition-all"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Conectar WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para criar agentes de IA profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Agentes Personalizados</CardTitle>
                <CardDescription>
                  Configure nome, função, estilo de comunicação e instruções específicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    Múltiplos estilos de comunicação
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    Funções especializadas (vendas, suporte)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Integração WhatsApp</CardTitle>
                <CardDescription>
                  Conecte facilmente com WhatsApp Business para atendimento automático
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Configuração rápida e simples
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    Conexão segura e confiável
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Automação Inteligente</CardTitle>
                <CardDescription>
                  IA avançada que entende contexto e responde de forma natural
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-blue-500" />
                    Respostas contextuais inteligentes
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    Aprendizado contínuo
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-blue-100">
              Crie seu primeiro agente de IA em menos de 5 minutos
            </p>
          </div>
          
          <Button 
            size="lg" 
            onClick={() => navigate("/agentes")}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Bot className="h-5 w-5 mr-2" />
            Criar Meu Agente Agora
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Index
