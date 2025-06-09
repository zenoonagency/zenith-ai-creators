
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Settings } from 'lucide-react'
import { HttpIntegration } from '@/types/agent'

interface IntegrationManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  integrations: HttpIntegration[]
  onSave: (integrations: HttpIntegration[]) => void
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export function IntegrationManager({ open, onOpenChange, integrations, onSave }: IntegrationManagerProps) {
  const [localIntegrations, setLocalIntegrations] = useState<HttpIntegration[]>(integrations)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    method: 'GET' as HttpMethod,
    url: '',
    query: '',
    headers: '',
    body: '',
    when: '',
    requiredData: ''
  })

  const handleAddIntegration = () => {
    if (localIntegrations.length >= 3) return
    
    try {
      const newIntegration: HttpIntegration = {
        id: Date.now().toString(),
        name: formData.name,
        method: formData.method,
        url: formData.url,
        query: formData.query ? JSON.parse(formData.query) : undefined,
        headers: formData.headers ? JSON.parse(formData.headers) : undefined,
        body: formData.body || undefined,
        when: formData.when,
        requiredData: formData.requiredData.split(',').map(item => item.trim()).filter(Boolean)
      }

      if (editingIndex !== null) {
        const updated = [...localIntegrations]
        updated[editingIndex] = newIntegration
        setLocalIntegrations(updated)
        setEditingIndex(null)
      } else {
        setLocalIntegrations([...localIntegrations, newIntegration])
      }

      resetForm()
    } catch (error) {
      console.error('Erro ao processar JSON:', error)
      alert('Erro no formato JSON. Verifique os campos query e headers.')
    }
  }

  const handleEditIntegration = (index: number) => {
    const integration = localIntegrations[index]
    setFormData({
      name: integration.name,
      method: integration.method,
      url: integration.url,
      query: integration.query ? JSON.stringify(integration.query, null, 2) : '',
      headers: integration.headers ? JSON.stringify(integration.headers, null, 2) : '',
      body: integration.body || '',
      when: integration.when,
      requiredData: integration.requiredData.join(', ')
    })
    setEditingIndex(index)
  }

  const handleDeleteIntegration = (index: number) => {
    setLocalIntegrations(localIntegrations.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      method: 'GET',
      url: '',
      query: '',
      headers: '',
      body: '',
      when: '',
      requiredData: ''
    })
  }

  const handleSave = () => {
    onSave(localIntegrations)
    onOpenChange(false)
  }

  const methodColors = {
    GET: 'bg-green-100 text-green-800',
    POST: 'bg-blue-100 text-blue-800',
    PUT: 'bg-yellow-100 text-yellow-800',
    PATCH: 'bg-orange-100 text-orange-800',
    DELETE: 'bg-red-100 text-red-800'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gerenciar Integrações HTTP
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Existing Integrations */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Integrações Configuradas ({localIntegrations.length}/3)
            </h3>
            <div className="space-y-3">
              {localIntegrations.map((integration, index) => (
                <Card key={integration.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={methodColors[integration.method]}>
                          {integration.method}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditIntegration(index)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteIntegration(index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-2">URL: {integration.url}</p>
                    <p className="text-sm text-gray-600 mb-2">Quando: {integration.when}</p>
                    <div className="flex gap-1 flex-wrap">
                      {integration.requiredData.map((data, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {data}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add/Edit Integration Form */}
          {localIntegrations.length < 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {editingIndex !== null ? 'Editar Integração' : 'Nova Integração'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="integration-name">Nome da Integração</Label>
                    <Input
                      id="integration-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Enviar email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="integration-method">Método</Label>
                    <Select
                      value={formData.method}
                      onValueChange={(value: HttpMethod) => setFormData({ ...formData, method: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="integration-url">URL da Requisição</Label>
                  <Input
                    id="integration-url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://api.exemplo.com/endpoint"
                  />
                </div>

                <div>
                  <Label htmlFor="integration-when">Quando o agente deve realizar esta ação</Label>
                  <Textarea
                    id="integration-when"
                    value={formData.when}
                    onChange={(e) => setFormData({ ...formData, when: e.target.value })}
                    placeholder="Ex: Quando o usuário solicitar o envio de um email ou quando uma venda for finalizada"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="integration-required">Dados necessários (separados por vírgula)</Label>
                  <Input
                    id="integration-required"
                    value={formData.requiredData}
                    onChange={(e) => setFormData({ ...formData, requiredData: e.target.value })}
                    placeholder="Ex: nome, email, telefone"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="integration-query">Query Parameters (JSON)</Label>
                    <Textarea
                      id="integration-query"
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      placeholder='{"param1": "value1", "param2": "value2"}'
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="integration-headers">Headers (JSON)</Label>
                    <Textarea
                      id="integration-headers"
                      value={formData.headers}
                      onChange={(e) => setFormData({ ...formData, headers: e.target.value })}
                      placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="integration-body">Body da Requisição</Label>
                  <Textarea
                    id="integration-body"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder='{"message": "Hello World"}'
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleAddIntegration}
                  disabled={!formData.name || !formData.url || !formData.when}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {editingIndex !== null ? 'Atualizar Integração' : 'Adicionar Integração'}
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              Salvar Integrações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
