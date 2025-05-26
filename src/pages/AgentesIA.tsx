
import { useState } from "react"
import { Bot, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const funcoes = [
  { value: "vendedor", label: "Vendedor" },
  { value: "suporte", label: "Suporte" },
  { value: "atendente", label: "Atendente" },
]

const estilos = [
  { value: "informal", label: "Informal", color: "bg-blue-100 text-blue-800" },
  { value: "formal", label: "Formal", color: "bg-gray-100 text-gray-800" },
  { value: "animado", label: "Animado", color: "bg-yellow-100 text-yellow-800" },
  { value: "serio", label: "Sério", color: "bg-purple-100 text-purple-800" },
  { value: "direto", label: "Direto", color: "bg-red-100 text-red-800" },
  { value: "gentil", label: "Gentil", color: "bg-green-100 text-green-800" },
  { value: "proativo", label: "Proativo", color: "bg-orange-100 text-orange-800" },
]

interface AgentData {
  nomeAgente: string
  nomeEmpresa: string
  nichoEmpresa: string
  funcao: string
  estilosSelecionados: string[]
  instrucoes: string
}

const AgentesIA = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [agentData, setAgentData] = useState<AgentData>({
    nomeAgente: "",
    nomeEmpresa: "",
    nichoEmpresa: "",
    funcao: "",
    estilosSelecionados: [],
    instrucoes: "",
  })

  const handleEstiloToggle = (estilo: string) => {
    setAgentData(prev => ({
      ...prev,
      estilosSelecionados: prev.estilosSelecionados.includes(estilo)
        ? prev.estilosSelecionados.filter(e => e !== estilo)
        : [...prev.estilosSelecionados, estilo]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agentData.nomeAgente || !agentData.nomeEmpresa || !agentData.nichoEmpresa || 
        !agentData.funcao || agentData.estilosSelecionados.length === 0) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    console.log("Enviando dados do agente:", agentData)

    try {
      const response = await fetch("https://zenoon-agency-n8n.htm57w.easypanel.host/webhook/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...agentData,
          timestamp: new Date().toISOString(),
          created_from: window.location.origin,
        }),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Agente de IA criado com sucesso!",
        })
        
        // Reset form
        setAgentData({
          nomeAgente: "",
          nomeEmpresa: "",
          nichoEmpresa: "",
          funcao: "",
          estilosSelecionados: [],
          instrucoes: "",
        })
      } else {
        throw new Error("Falha na criação do agente")
      }
    } catch (error) {
      console.error("Erro ao criar agente:", error)
      toast({
        title: "Erro",
        description: "Falha ao criar o agente. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Criar Agente de IA</h1>
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-gray-600 text-lg">
          Configure seu agente personalizado para atendimento automatizado
        </p>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Configuração do Agente
          </CardTitle>
          <CardDescription>
            Preencha as informações abaixo para criar seu agente de IA personalizado
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nomeAgente" className="text-sm font-medium">
                  Nome do Agente *
                </Label>
                <Input
                  id="nomeAgente"
                  placeholder="Ex: Sofia, João, Assistente Virtual..."
                  value={agentData.nomeAgente}
                  onChange={(e) => setAgentData(prev => ({ ...prev, nomeAgente: e.target.value }))}
                  className="border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeEmpresa" className="text-sm font-medium">
                  Nome da Empresa *
                </Label>
                <Input
                  id="nomeEmpresa"
                  placeholder="Nome da sua empresa"
                  value={agentData.nomeEmpresa}
                  onChange={(e) => setAgentData(prev => ({ ...prev, nomeEmpresa: e.target.value }))}
                  className="border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nichoEmpresa" className="text-sm font-medium">
                  Nicho da Empresa *
                </Label>
                <Input
                  id="nichoEmpresa"
                  placeholder="Ex: E-commerce, Consultoria, Saúde..."
                  value={agentData.nichoEmpresa}
                  onChange={(e) => setAgentData(prev => ({ ...prev, nichoEmpresa: e.target.value }))}
                  className="border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="funcao" className="text-sm font-medium">
                  Função do Agente *
                </Label>
                <Select value={agentData.funcao} onValueChange={(value) => setAgentData(prev => ({ ...prev, funcao: value }))}>
                  <SelectTrigger className="border-2 focus:border-primary">
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    {funcoes.map((funcao) => (
                      <SelectItem key={funcao.value} value={funcao.value}>
                        {funcao.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Estilo de Comunicação * (selecione um ou mais)
              </Label>
              <div className="flex flex-wrap gap-2">
                {estilos.map((estilo) => (
                  <Badge
                    key={estilo.value}
                    variant={agentData.estilosSelecionados.includes(estilo.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      agentData.estilosSelecionados.includes(estilo.value) 
                        ? "bg-primary text-primary-foreground" 
                        : estilo.color
                    }`}
                    onClick={() => handleEstiloToggle(estilo.value)}
                  >
                    {estilo.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instrucoes" className="text-sm font-medium">
                Instruções Específicas
              </Label>
              <Textarea
                id="instrucoes"
                placeholder="Descreva instruções específicas para o agente, como procedimentos especiais, informações importantes sobre produtos/serviços, tom de voz desejado, etc."
                value={agentData.instrucoes}
                onChange={(e) => setAgentData(prev => ({ ...prev, instrucoes: e.target.value }))}
                className="min-h-32 border-2 focus:border-primary"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-all hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Criando Agente...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Criar Agente de IA
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgentesIA
