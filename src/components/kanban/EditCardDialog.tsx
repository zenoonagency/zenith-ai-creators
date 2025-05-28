import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User, DollarSign, Phone, Plus, X, Upload, CheckSquare, Tag as TagIcon } from 'lucide-react'

interface Subtask {
  id: string
  name: string
  description: string
  completed: boolean
}

interface Attachment {
  id: string
  name: string
  type: 'image' | 'document' | 'video'
  url: string
}

interface CustomField {
  id: string
  name: string
  value: string
}

interface TagData {
  id: string
  name: string
  color: string
}

interface KanbanCard {
  id: string
  title: string
  description?: string
  value: number
  phone?: string
  date?: string
  time?: string
  responsible?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  subtasks: Subtask[]
  attachments: Attachment[]
  tags: string[]
  customFields: CustomField[]
  listId: string
}

interface EditCardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: KanbanCard
  onEditCard: (card: Omit<KanbanCard, 'id' | 'listId'>) => void
  availableTags: TagData[]
  onCreateTag: () => void
}

export function EditCardDialog({ open, onOpenChange, card, onEditCard, availableTags, onCreateTag }: EditCardDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [responsible, setResponsible] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('low')
  const [subtasks, setSubtasks] = useState<Subtask[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customFields, setCustomFields] = useState<CustomField[]>([])

  useEffect(() => {
    if (open && card) {
      setTitle(card.title)
      setDescription(card.description || '')
      setValue(card.value.toString())
      setPhone(card.phone || '')
      setDate(card.date || '')
      setTime(card.time || '')
      setResponsible(card.responsible || '')
      setPriority(card.priority)
      setSubtasks(card.subtasks || [])
      setAttachments(card.attachments || [])
      setSelectedTags(card.tags || [])
      setCustomFields(card.customFields || [])
    }
  }, [open, card])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onEditCard({
        title: title.trim(),
        description: description.trim(),
        value: parseFloat(value) || 0,
        phone: phone.trim(),
        date: date || undefined,
        time: time || undefined,
        responsible: responsible.trim(),
        priority,
        subtasks,
        attachments,
        tags: selectedTags,
        customFields
      })
      onOpenChange(false)
    }
  }

  const addSubtask = () => {
    setSubtasks([...subtasks, {
      id: Date.now().toString(),
      name: '',
      description: '',
      completed: false
    }])
  }

  const updateSubtask = (id: string, field: keyof Subtask, value: any) => {
    setSubtasks(subtasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ))
  }

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter(task => task.id !== id))
  }

  const addCustomField = () => {
    setCustomFields([...customFields, {
      id: Date.now().toString(),
      name: '',
      value: ''
    }])
  }

  const updateCustomField = (id: string, field: keyof CustomField, value: string) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, [field]: value } : field
    ))
  }

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const type = file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'document'
        
        setAttachments(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type,
          url: URL.createObjectURL(file)
        }])
      })
    }
  }

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Cartão</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="edit-card-title">Título</Label>
            <Input
              id="edit-card-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do cartão"
            />
          </div>

          <div>
            <Label htmlFor="edit-card-description">Descrição</Label>
            <Textarea
              id="edit-card-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição do cartão..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-card-value" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Valor
              </Label>
              <Input
                id="edit-card-value"
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="edit-card-phone" className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Telefone
              </Label>
              <Input
                id="edit-card-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+55 (11) 99999-9999"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-card-date" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Data
              </Label>
              <Input
                id="edit-card-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-card-time">Hora</Label>
              <Input
                id="edit-card-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-card-responsible" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Responsável
            </Label>
            <Select value={responsible} onValueChange={setResponsible}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="João Silva">João Silva</SelectItem>
                <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                <SelectItem value="Pedro Oliveira">Pedro Oliveira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-card-priority">Prioridade</Label>
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1">
                <TagIcon className="h-4 w-4" />
                Marcadores
              </Label>
              <Button type="button" variant="outline" size="sm" onClick={onCreateTag}>
                <Plus className="h-4 w-4 mr-1" />
                Criar Marcador
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag.id}
                  className={`cursor-pointer ${
                    selectedTags.includes(tag.name) 
                      ? 'opacity-100' 
                      : 'opacity-50'
                  }`}
                  style={{ backgroundColor: tag.color, color: 'white' }}
                  onClick={() => toggleTag(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1">
                <CheckSquare className="h-4 w-4" />
                Subtarefas
              </Label>
              <Button type="button" variant="outline" size="sm" onClick={addSubtask}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Subtarefa
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {subtasks.map((subtask) => (
                <Card key={subtask.id} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={(checked) => updateSubtask(subtask.id, 'completed', checked)}
                      />
                      <Input
                        placeholder="Nome da subtarefa"
                        value={subtask.name}
                        onChange={(e) => updateSubtask(subtask.id, 'name', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubtask(subtask.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Descrição da subtarefa"
                      value={subtask.description}
                      onChange={(e) => updateSubtask(subtask.id, 'description', e.target.value)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Anexos</Label>
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="edit-file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('edit-file-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Adicionar Anexo
                </Button>
              </div>
            </div>
            {attachments.length > 0 && (
              <div className="space-y-2 mt-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{attachment.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setAttachments(attachments.filter(a => a.id !== attachment.id))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Campos Personalizados</Label>
              <Button type="button" variant="outline" size="sm" onClick={addCustomField}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Campo
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {customFields.map((field) => (
                <div key={field.id} className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Nome do campo"
                    value={field.name}
                    onChange={(e) => updateCustomField(field.id, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Valor"
                    value={field.value}
                    onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomField(field.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
