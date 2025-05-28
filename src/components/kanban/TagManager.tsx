
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tag, Plus, X } from 'lucide-react'

interface TagData {
  id: string
  name: string
  color: string
}

interface TagManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tags: TagData[]
  onCreateTag: (tag: Omit<TagData, 'id'>) => void
  onDeleteTag: (tagId: string) => void
}

const tagColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
]

export function TagManager({ open, onOpenChange, tags, onCreateTag, onDeleteTag }: TagManagerProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(tagColors[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onCreateTag({
        name: name.trim(),
        color
      })
      setName('')
      setColor(tagColors[0])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Gerenciar Marcadores
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="tag-name">Nome do Marcador</Label>
              <Input
                id="tag-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome do marcador"
                autoFocus
              />
            </div>

            <div>
              <Label>Cor do Marcador</Label>
              <div className="flex gap-2 mt-2">
                {tagColors.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === colorOption ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => setColor(colorOption)}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Criar Marcador
            </Button>
          </form>

          {tags.length > 0 && (
            <div>
              <Label>Marcadores Existentes</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge 
                    key={tag.id} 
                    className="flex items-center gap-1 px-2 py-1"
                    style={{ backgroundColor: tag.color, color: 'white' }}
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => onDeleteTag(tag.id)}
                      className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
