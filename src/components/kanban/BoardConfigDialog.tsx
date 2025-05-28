
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, GripVertical } from 'lucide-react'

interface KanbanList {
  id: string
  title: string
  cards: any[]
  totalValue: number
  color?: string
}

interface Board {
  id: string
  name: string
  lists: KanbanList[]
  visibility?: 'everyone' | 'me' | 'specific'
  completedListId?: string
}

interface BoardConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  board: Board
  onUpdateBoard: (boardId: string, updates: Partial<Board>) => void
}

export function BoardConfigDialog({ open, onOpenChange, board, onUpdateBoard }: BoardConfigDialogProps) {
  const [boardName, setBoardName] = useState(board.name)
  const [visibility, setVisibility] = useState<'everyone' | 'me' | 'specific'>(board.visibility || 'everyone')
  const [lists, setLists] = useState(board.lists)

  useEffect(() => {
    setBoardName(board.name)
    setVisibility(board.visibility || 'everyone')
    setLists(board.lists)
  }, [board])

  const handleSave = () => {
    onUpdateBoard(board.id, {
      name: boardName,
      visibility,
      lists
    })
    onOpenChange(false)
  }

  const moveList = (fromIndex: number, toIndex: number) => {
    const newLists = [...lists]
    const [removed] = newLists.splice(fromIndex, 1)
    newLists.splice(toIndex, 0, removed)
    setLists(newLists)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurar Quadro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="board-name">Nome do Quadro</Label>
              <Input
                id="board-name"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Nome do quadro"
              />
            </div>

            <div>
              <Label htmlFor="board-visibility">Visibilidade</Label>
              <Select value={visibility} onValueChange={(value: 'everyone' | 'me' | 'specific') => setVisibility(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Todos podem ver</SelectItem>
                  <SelectItem value="me">Apenas eu</SelectItem>
                  <SelectItem value="specific">Pessoas específicas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Ordem das Listas</h3>
            <div className="space-y-2">
              {lists.map((list, index) => (
                <Card key={list.id} className="p-3">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                    <div className="flex items-center gap-2 flex-1">
                      {list.color && (
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: list.color }}
                        />
                      )}
                      <span className="font-medium">{list.title}</span>
                      <span className="text-sm text-gray-500">({list.cards.length} cartões)</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => index > 0 && moveList(index, index - 1)}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => index < lists.length - 1 && moveList(index, index + 1)}
                        disabled={index === lists.length - 1}
                      >
                        ↓
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
