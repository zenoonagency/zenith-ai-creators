import { useState, useEffect } from 'react'
import { Plus, Search, Filter, MoreVertical, Archive } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { CreateBoardDialog } from '@/components/kanban/CreateBoardDialog'
import { CreateCardDialog } from '@/components/kanban/CreateCardDialog'
import { CreateListDialog } from '@/components/kanban/CreateListDialog'
import { EditCardDialog } from '@/components/kanban/EditCardDialog'
import { EditListDialog } from '@/components/kanban/EditListDialog'
import { BoardSelector } from '@/components/kanban/BoardSelector'
import { CardSearch } from '@/components/kanban/CardSearch'
import { TagManager } from '@/components/kanban/TagManager'
import { CompletedCards } from '@/components/kanban/CompletedCards'
import { AutomationDialog } from '@/components/kanban/AutomationDialog'
import { BoardConfigDialog } from '@/components/kanban/BoardConfigDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Board, KanbanList, KanbanCard, Tag, CardFilter, Automation, BoardConfig } from '@/types/kanban'

const GestaoFunil = () => {
  const [boards, setBoards] = useState<Board[]>([])
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<CardFilter>({
    tags: [],
    assignee: '',
    priority: '',
    dueDate: ''
  })
  const [automations, setAutomations] = useState<Automation[]>([])
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [showCreateCard, setShowCreateCard] = useState(false)
  const [showCreateList, setShowCreateList] = useState(false)
  const [showEditCard, setShowEditCard] = useState(false)
  const [showEditList, setShowEditList] = useState(false)
  const [showTagManager, setShowTagManager] = useState(false)
  const [showCompletedCards, setShowCompletedCards] = useState(false)
  const [showAutomation, setShowAutomation] = useState(false)
  const [showBoardConfig, setShowBoardConfig] = useState(false)
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null)
  const [selectedList, setSelectedList] = useState<KanbanList | null>(null)
  const [selectedListId, setSelectedListId] = useState<string>('')
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Urgente', color: '#EF4444' },
    { id: '2', name: 'Em Progresso', color: '#F59E0B' },
    { id: '3', name: 'Revisão', color: '#3B82F6' },
    { id: '4', name: 'Concluído', color: '#10B981' }
  ])

  useEffect(() => {
    // Simular carregamento de boards
    const mockBoards: Board[] = [
      {
        id: '1',
        name: 'Vendas Q1 2024',
        description: 'Pipeline de vendas para o primeiro trimestre',
        lists: [
          {
            id: '1',
            title: 'Leads',
            totalValue: 5000,
            cards: [
              {
                id: '1',
                title: 'João Silva - Consultoria',
                description: 'Cliente interessado em consultoria empresarial',
                value: 5000,
                priority: 'high',
                date: '2024-02-15',
                tags: ['1'],
                assignees: ['Ana Costa'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                subtasks: [],
                attachments: [],
                customFields: [],
                listId: '1'
              }
            ]
          },
          {
            id: '2',
            title: 'Qualificação',
            totalValue: 0,
            cards: []
          },
          {
            id: '3',
            title: 'Proposta',
            totalValue: 0,
            cards: []
          },
          {
            id: '4',
            title: 'Negociação',
            totalValue: 0,
            cards: []
          },
          {
            id: '5',
            title: 'Fechado',
            totalValue: 0,
            cards: []
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    
    setBoards(mockBoards)
    setCurrentBoard(mockBoards[0])
  }, [])

  const handleCreateBoard = (name: string, description?: string) => {
    const newBoard: Board = {
      id: Date.now().toString(),
      name,
      description: description || '',
      lists: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setBoards([...boards, newBoard])
    setCurrentBoard(newBoard)
  }

  const handleUpdateBoard = (boardId: string, updates: Partial<Board>) => {
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { ...board, ...updates, updatedAt: new Date().toISOString() }
        : board
    ))
    
    if (currentBoard?.id === boardId) {
      setCurrentBoard({ ...currentBoard, ...updates, updatedAt: new Date().toISOString() })
    }
  }

  const handleDeleteBoard = (boardId: string) => {
    setBoards(boards.filter(board => board.id !== boardId))
    if (currentBoard?.id === boardId) {
      setCurrentBoard(boards[0] || null)
    }
  }

  const handleCreateCard = (listId: string, cardData: Omit<KanbanCard, 'id' | 'listId' | 'createdAt' | 'updatedAt' | 'assignees'>) => {
    if (!currentBoard) return
    
    const newCard: KanbanCard = {
      ...cardData,
      id: Date.now().toString(),
      listId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      value: cardData.value || 0,
      priority: cardData.priority || 'medium',
      subtasks: cardData.subtasks || [],
      attachments: cardData.attachments || [],
      tags: cardData.tags || [],
      customFields: cardData.customFields || [],
      assignees: []
    }
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list =>
        list.id === listId
          ? { 
              ...list, 
              cards: [...list.cards, newCard],
              totalValue: list.totalValue + newCard.value
            }
          : list
      ),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentBoard(updatedBoard)
    setBoards(boards.map(board => 
      board.id === currentBoard.id ? updatedBoard : board
    ))
  }

  const handleUpdateCard = (cardId: string, updates: Partial<KanbanCard>) => {
    if (!currentBoard) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => ({
        ...list,
        cards: list.cards.map(card =>
          card.id === cardId
            ? { ...card, ...updates, updatedAt: new Date().toISOString() }
            : card
        )
      })),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentBoard(updatedBoard)
    setBoards(boards.map(board => 
      board.id === currentBoard.id ? updatedBoard : board
    ))
  }

  const handleDeleteCard = (cardId: string) => {
    if (!currentBoard) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => ({
        ...list,
        cards: list.cards.filter(card => card.id !== cardId)
      })),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentBoard(updatedBoard)
    setBoards(boards.map(board => 
      board.id === currentBoard.id ? updatedBoard : board
    ))
  }

  const handleCreateAutomation = (automation: Omit<Automation, 'id'>) => {
    const newAutomation: Automation = {
      ...automation,
      id: Date.now().toString()
    }
    setAutomations([...automations, newAutomation])
  }

  const handleCreateList = (title: string) => {
    if (!currentBoard) return
    
    const newList: KanbanList = {
      id: Date.now().toString(),
      title,
      cards: [],
      totalValue: 0
    }
    
    const updatedBoard = {
      ...currentBoard,
      lists: [...currentBoard.lists, newList],
      updatedAt: new Date().toISOString()
    }
    
    setCurrentBoard(updatedBoard)
    setBoards(boards.map(board => 
      board.id === currentBoard.id ? updatedBoard : board
    ))
  }

  const handleUpdateList = (listId: string, updates: Partial<KanbanList>) => {
    if (!currentBoard) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list =>
        list.id === listId
          ? { ...list, ...updates }
          : list
      ),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentBoard(updatedBoard)
    setBoards(boards.map(board => 
      board.id === currentBoard.id ? updatedBoard : board
    ))
  }

  const handleDeleteList = (listId: string) => {
    if (!currentBoard) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.filter(list => list.id !== listId),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentBoard(updatedBoard)
    setBoards(boards.map(board => 
      board.id === currentBoard.id ? updatedBoard : board
    ))
  }

  const handleMoveCard = (cardId: string, sourceListId: string, targetListId: string) => {
    if (!currentBoard) return
    
    const sourceList = currentBoard.lists.find(list => list.id === sourceListId)
    const targetList = currentBoard.lists.find(list => list.id === targetListId)
    
    if (!sourceList || !targetList) return
    
    const card = sourceList.cards.find(card => card.id === cardId)
    if (!card) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => {
        if (list.id === sourceListId) {
          return {
            ...list,
            cards: list.cards.filter(card => card.id !== cardId),
            totalValue: list.totalValue - card.value
          }
        }
        if (list.id === targetListId) {
          return {
            ...list,
            cards: [...list.cards, { ...card, listId: targetListId }],
            totalValue: list.totalValue + card.value
          }
        }
        return list
      }),
      updatedAt: new Date().toISOString()
    }
    
    setCurrentBoard(updatedBoard)
    setBoards(boards.map(board => 
      board.id === currentBoard.id ? updatedBoard : board
    ))
  }

  const handleEditCard = (card: KanbanCard) => {
    setSelectedCard(card)
    setShowEditCard(true)
  }

  const handleEditList = (list: KanbanList) => {
    setSelectedList(list)
    setShowEditList(true)
  }

  const filteredCards = currentBoard?.lists.flatMap(list => 
    list.cards.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTags = filter.tags.length === 0 || 
                         filter.tags.some(tagId => card.tags.includes(tagId))
      
      const matchesAssignee = !filter.assignee || 
                             card.assignees.includes(filter.assignee)
      
      const matchesPriority = !filter.priority || 
                             card.priority === filter.priority
      
      return matchesSearch && matchesTags && matchesAssignee && matchesPriority
    })
  ) || []

  const completedCards = currentBoard?.lists.flatMap(list => 
    list.cards.filter(card => card.tags.includes('4'))
  ) || []

  if (!currentBoard) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Funil</h1>
          <Button onClick={() => setShowCreateBoard(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Board
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 mb-4">Nenhum board encontrado</p>
            <Button onClick={() => setShowCreateBoard(true)}>
              Criar seu primeiro board
            </Button>
          </CardContent>
        </Card>

        <CreateBoardDialog 
          open={showCreateBoard}
          onOpenChange={setShowCreateBoard}
          onCreateBoard={handleCreateBoard}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Funil</h1>
          <BoardSelector 
            boards={boards}
            currentBoardId={currentBoard.id}
            onSelectBoard={(boardId) => {
              const board = boards.find(b => b.id === boardId)
              if (board) setCurrentBoard(board)
            }}
            onCreateBoard={() => setShowCreateBoard(true)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowTagManager(true)}>
            Gerenciar Tags
          </Button>
          
          <Button variant="outline" onClick={() => setShowCompletedCards(true)}>
            <Archive className="h-4 w-4 mr-2" />
            Concluídos ({completedCards.length})
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções do Board</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowAutomation(true)}>
                Automações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowBoardConfig(true)}>
                Configurações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setShowCreateList(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Lista
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Badge variant="outline" className="text-sm">
          {filteredCards.length} cards encontrados
        </Badge>
      </div>

      <KanbanBoard
        board={currentBoard}
        onMoveCard={handleMoveCard}
        onEditCard={handleEditCard}
        onEditList={handleEditList}
        onDeleteCard={handleDeleteCard}
        onCreateCard={(listId) => {
          setSelectedListId(listId)
          setShowCreateCard(true)
        }}
        onCreateList={() => setShowCreateList(true)}
      />

      <CreateBoardDialog 
        open={showCreateBoard}
        onOpenChange={setShowCreateBoard}
        onCreateBoard={handleCreateBoard}
      />

      <CreateCardDialog
        open={showCreateCard}
        onOpenChange={setShowCreateCard}
        availableTags={tags}
        onCreateTag={(tag) => setTags([...tags, tag])}
        onCreateCard={(cardData) => handleCreateCard(selectedListId, cardData)}
      />

      <CreateListDialog
        open={showCreateList}
        onOpenChange={setShowCreateList}
        onCreateList={handleCreateList}
      />

      {selectedCard && (
        <EditCardDialog
          open={showEditCard}
          onOpenChange={setShowEditCard}
          card={selectedCard}
          onSave={(updates) => {
            handleUpdateCard(selectedCard.id, updates)
          }}
        />
      )}

      {selectedList && (
        <EditListDialog
          open={showEditList}
          onOpenChange={setShowEditList}
          list={selectedList}
          onSave={(updates) => {
            handleUpdateList(selectedList.id, updates)
          }}
        />
      )}

      <TagManager
        open={showTagManager}
        onOpenChange={setShowTagManager}
        tags={tags}
        onSave={setTags}
      />

      <CompletedCards
        open={showCompletedCards}
        onOpenChange={setShowCompletedCards}
        board={currentBoard}
        completedListId={currentBoard.completedListId}
        onSetCompletedList={(listId) => {
          handleUpdateBoard(currentBoard.id, { completedListId: listId })
        }}
      />

      <AutomationDialog
        open={showAutomation}
        onOpenChange={setShowAutomation}
        board={currentBoard}
        automations={automations}
        onCreateAutomation={handleCreateAutomation}
      />

      <BoardConfigDialog
        open={showBoardConfig}
        onOpenChange={setShowBoardConfig}
        board={currentBoard}
        onSave={(config) => {
          handleUpdateBoard(currentBoard.id, config)
        }}
      />
    </div>
  )
}

export default GestaoFunil
