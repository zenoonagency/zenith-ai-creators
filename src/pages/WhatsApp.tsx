
import { useState } from "react"
import { MessageCircle, Smartphone, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const WhatsApp = () => {
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phoneNumber) {
      toast({
        title: "Erro",
        description: "Por favor, insira um número de telefone",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    console.log("Conectando WhatsApp:", phoneNumber)

    // Simular conexão
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
      toast({
        title: "WhatsApp Conectado!",
        description: "Sua conta foi conectada com sucesso",
      })
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageCircle className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Conectar WhatsApp</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Integre seus agentes de IA com o WhatsApp para atendimento automatizado
        </p>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Configuração do WhatsApp
          </CardTitle>
          <CardDescription>
            Configure a integração com sua conta do WhatsApp Business
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          {isConnected ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800">
                WhatsApp Conectado com Sucesso!
              </h3>
              <p className="text-gray-600">
                Número conectado: <span className="font-medium">{phoneNumber}</span>
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsConnected(false)
                  setPhoneNumber("")
                }}
                className="mt-4"
              >
                Conectar Outro Número
              </Button>
            </div>
          ) : (
            <form onSubmit={handleConnect} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Número do WhatsApp Business
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+55 11 99999-9999"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border-2 focus:border-green-500"
                />
                <p className="text-sm text-gray-500">
                  Insira o número com código do país (ex: +55 para Brasil)
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-blue-900">Importante:</h4>
                    <p className="text-sm text-blue-800">
                      Certifique-se de que você tem acesso ao WhatsApp Business no número informado. 
                      Você receberá um código de verificação.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isConnecting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all hover:shadow-lg"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Conectando...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Conectar WhatsApp
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {!isConnected && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-medium text-amber-900">Pré-requisitos:</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Conta ativa no WhatsApp Business</li>
                  <li>• Acesso ao telefone para verificação</li>
                  <li>• Permissões administrativas na conta</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default WhatsApp
