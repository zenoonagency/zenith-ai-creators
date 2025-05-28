import { useState } from "react"
import { Plus, Search, CheckCircle, Settings, Zap, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "@/components/kanban/KanbanBoard"
import { CreateBoardDialog } from "@/components/kanban/CreateBoardDialog"
import { CreateListDialog } from "@/components/kanban/CreateListDialog"
import { CreateCardDialog } from "@/components/kanban/CreateCardDialog"
import { EditCardDialog } from "@/components/kanban/EditCardDialog"
import { EditListDialog } from "@/components/kanban/EditListDialog"
import { BoardSelector } from "@/components/kanban/BoardSelector"
import { CardSearch } from "@/components/kanban/CardSearch"
import { CompletedCards } from "@/components/kanban/CompletedCards"
import { AutomationDialog } from "@/components/kanban/AutomationDialog"
import { BoardConfigDialog } from "@/components/kanban/BoardConfigDialog"
import { TagManager } from "@/components/kanban/TagManager"
import { useToast } from "@/hooks/use-toast"

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

interface KanbanList {
  id: string
  title: string
  cards: KanbanCard[]
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

interface Automation {
  id: string
  trigger: string
  sourceListId?: string
  targetListId?: string
  webhookUrl: string
  active: boolean
}

const initialBoards: Board[] = [
  {
    id: "1",
    name: "Vendas Principal",
    lists: [
      {
        id: "pendente",
        title: "Pendente",
        totalValue: 500,
        color: "#ef4444",
        cards: [
          {
            id: "card-1",
            title: "teste",
            description: "Descrição do teste",
            value: 500,
            phone: "+55 (11) 99999-9999",
            date: "2024-01-15",
            time: "14:30",
            responsible: "João Silva",
            priority: "urgent",
            subtasks: [
              { id: "sub-1", name: "Tarefa 1", description: "Descrição", completed: true },
              { id: "sub-2", name: "Tarefa 2", description: "Descrição", completed: false }
            ],
            attachments: [
              { id: "att-1", name: "documento.pdf", type: "document", url: "#" }
            ],
            tags: ["Agente de IA", "Marketing"],
            customFields: [
              { id: "cf-1", name: "Origem", value: "Website" }
            ],
            listId: "pendente"
          }
        ]
      },
      {
        id: "concluido",
        title: "Concluído",
        totalValue: 0,
        color: "#22c55e",
        cards: []
      }
    ],
    completedListId: "concluido"
  }
]

const GestaoFunil = () => {
  const { toast } = useToast()
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [currentBoardId, setCurrentBoardId] = useState("1")
  const [automations, setAutomations] = useState<Automation[]>([])
  const [tags, setTags] = useState<TagData[]>([
    { id: "1", name: "Agente de IA", color: "#F59E0B" },
    { id: "2", name: "Marketing", color: "#3B82F6" }
  ])
  
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [showCreateList, setShowCreateList] = useState(false)
  const [showCreateCard, setShowCreateCard] = useState(false)
  const [showEditCard, setShowEditCard] = useState(false)
  const [showEditList, setShowEditList] = useState(false)
  const [showCardSearch, setShowCardSearch] = useState(false)
  const [showCompletedCards, setShowCompletedCards] = useState(false)
  const [showAutomations, setShowAutomations] = useState(false)
  const [showBoardConfig, setShowBoardConfig] = useState(false)
  const [showTagManager, setShowTagManager] = useState(false)
  const [selectedListId, setSelectedListId] = useState<string>("")
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null)
  const [selectedList, setSelectedList] = useState<KanbanList | null>(null)

  const currentBoard = boards.find(board => board.id === currentBoardId)

  const triggerAutomations = async (trigger: string, cardData: KanbanCard, fromListId?: string, toListId?: string) => {
    console.log('Checking automations for trigger:', trigger)
    
    const applicableAutomations = automations.filter(automation => {
      if (!automation.active) return false
      
      if (automation.trigger === trigger) {
        if (trigger === 'card_moved' && automation.sourceListId && automation.targetListId) {
          return automation.sourceListId === fromListId && automation.targetListId === toListId
        }
        if (trigger === 'card_created_in_list' && automation.sourceListId) {
          return automation.sourceListId === cardData.listId
        }
        return true
      }
      
      return false
    })

    console.log('Found applicable automations:', applicableAutomations)

    for (const automation of applicableAutomations) {
      try {
        console.log('Triggering webhook:', automation.webhookUrl)
        
        const webhookData = {
          trigger: automation.trigger,
          card: cardData,
          fromListId,
          toListId,
          timestamp: new Date().toISOString()
        }

        const response = await fetch(automation.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(webhookData)
        })

        console.log('Webhook triggered successfully')
        toast({
          title: "Automação Executada",
          description: `Webhook disparado para: ${automation.trigger}`,
        })
      } catch (error) {
        console.error('Error triggering webhook:', error)
        toast({
          title: "Erro na Automação",
          description: "Falha ao disparar webhook",
          variant: "destructive",
        })
      }
    }
  }

  const handleCreateBoard = (name: string) => {
    const newBoard: Board = {
      id: Date.now().toString(),
      name,
      lists: []
    }
    setBoards([...boards, newBoard])
    setCurrentBoardId(newBoard.id)
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
      lists: [...currentBoard.lists, newList]
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))
  }

  const handleEditList = (listId: string, title: string, color: string) => {
    if (!currentBoard) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => 
        list.id === listId 
          ? { ...list, title, color }
          : list
      )
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))
  }

  const handleDeleteList = (listId: string) => {
    if (!currentBoard) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.filter(list => list.id !== listId)
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))
  }

  const handleCreateCard = async (cardData: Omit<KanbanCard, 'id' | 'listId'>) => {
    if (!currentBoard || !selectedListId) return
    
    const newCard: KanbanCard = {
      ...cardData,
      id: Date.now().toString(),
      listId: selectedListId
    }
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => 
        list.id === selectedListId 
          ? { 
              ...list, 
              cards: [...list.cards, newCard],
              totalValue: list.totalValue + cardData.value
            }
          : list
      )
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))

    await triggerAutomations('card_created', newCard)
    await triggerAutomations('card_created_in_list', newCard)
  }

  const handleEditCard = async (cardData: Omit<KanbanCard, 'id' | 'listId'>) => {
    if (!currentBoard || !selectedCard) return
    
    const updatedCard = {
      ...selectedCard,
      ...cardData
    }
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => ({
        ...list,
        cards: list.cards.map(card => 
          card.id === selectedCard.id ? updatedCard : card
        ),
        totalValue: list.cards.reduce((total, card) => 
          total + (card.id === selectedCard.id ? cardData.value : card.value), 0
        )
      }))
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))
  }

  const handleDeleteCard = (cardId: string) => {
    if (!currentBoard) return
    
    console.log('Deleting card:', cardId)
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => ({
        ...list,
        cards: list.cards.filter(card => card.id !== cardId),
        totalValue: list.cards
          .filter(card => card.id !== cardId)
          .reduce((total, card) => total + card.value, 0)
      }))
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))

    toast({
      title: "Card Excluído",
      description: "O card foi removido com sucesso.",
    })
  }

  const handleMoveCard = async (cardId: string, fromListId: string, toListId: string) => {
    if (!currentBoard) return
    
    console.log('Moving card:', cardId, 'from:', fromListId, 'to:', toListId)
    
    const card = currentBoard.lists
      .find(list => list.id === fromListId)
      ?.cards.find(card => card.id === cardId)
    
    if (!card) return
    
    const updatedBoard = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => {
        if (list.id === fromListId) {
          return {
            ...list,
            cards: list.cards.filter(c => c.id !== cardId),
            totalValue: list.totalValue - card.value
          }
        }
        if (list.id === toListId) {
          return {
            ...list,
            cards: [...list.cards, { ...card, listId: toListId }],
            totalValue: list.totalValue + card.value
          }
        }
        return list
      })
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))

    await triggerAutomations('card_moved', { ...card, listId: toListId }, fromListId, toListId)
  }

  const handleDeleteBoard = () => {
    if (boards.length === 1) return
    
    const updatedBoards = boards.filter(board => board.id !== currentBoardId)
    setBoards(updatedBoards)
    setCurrentBoardId(updatedBoards[0].id)
  }

  const handleDuplicateBoard = () => {
    if (!currentBoard) return
    
    const duplicatedBoard: Board = {
      ...currentBoard,
      id: Date.now().toString(),
      name: `${currentBoard.name} (Cópia)`
    }
    
    setBoards([...boards, duplicatedBoard])
    setCurrentBoardId(duplicatedBoard.id)
  }

  const handleSetCompletedList = (listId: string) => {
    if (!currentBoard) return
    
    const updatedBoard = {
      ...currentBoard,
      completedListId: listId
    }
    
    setBoards(boards.map(board => 
      board.id === currentBoardId ? updatedBoard : board
    ))
  }

  const handleUpdateBoard = (boardId: string, updates: Partial<Board>) => {
    setBoards(boards.map(board => 
      board.id === boardId ? { ...board, ...updates } : board
    ))
  }

  const handleCreateAutomation = (automationData: Omit<Automation, 'id'>) => {
    const newAutomation: Automation = {
      ...automationData,
      id: Date.now().toString()
    }
    setAutomations([...automations, newAutomation])
    
    toast({
      title: "Automação Criada",
      description: "A automação foi configurada com sucesso.",
    })
  }

  const handleCreateTag = (tagData: Omit<TagData, 'id'>) => {
    const newTag: TagData = {
      ...tagData,
      id: Date.now().toString()
    }
    setTags([...tags, newTag])
    
    toast({
      title: "Marcador Criado",
      description: "O marcador foi criado com sucesso.",
    })
  }

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId))
    
    toast({
      title: "Marcador Excluído",
      description: "O marcador foi removido com sucesso.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Gestão de funil</h1>
        <div className="flex gap-2">
          <BoardSelector
            boards={boards}
            currentBoardId={currentBoardId}
            onSelectBoard={setCurrentBoardId}
            onCreateBoard={() => setShowCreateBoard(true)}
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowCompletedCards(true)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Lista de Concluídos
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowCardSearch(true)}
          >
            <Search className="h-4 w-4 mr-1" />
            Procurar Cartão
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowTagManager(true)}
          >
            <Tag className="h-4 w-4 mr-1" />
            Marcadores
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700" 
            size="sm"
            onClick={() => setShowAutomations(true)}
          >
            <Zap className="h-4 w-4 mr-1" />
            Criar Automação
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowBoardConfig(true)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Configurar Quadro
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          className="bg-purple-600 hover:bg-purple-700" 
          size="sm"
          onClick={() => setShowCreateBoard(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Novo Quadro
        </Button>
        <Button variant="outline" size="sm">
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleDuplicateBoard}
        >
          Duplicar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-600 hover:text-red-700"
          onClick={handleDeleteBoard}
          disabled={boards.length === 1}
        >
          Excluir
        </Button>
      </div>

      {currentBoard && (
        <KanbanBoard
          board={currentBoard}
          onMoveCard={handleMoveCard}
          onCreateList={() => setShowCreateList(true)}
          onCreateCard={(listId) => {
            setSelectedListId(listId)
            setShowCreateCard(true)
          }}
          onEditCard={(card) => {
            setSelectedCard(card)
            setShowEditCard(true)
          }}
          onDeleteCard={handleDeleteCard}
          onEditList={(list) => {
            setSelectedList(list)
            setShowEditList(true)
          }}
        />
      )}

      <CreateBoardDialog
        open={showCreateBoard}
        onOpenChange={setShowCreateBoard}
        onCreateBoard={handleCreateBoard}
      />

      <CreateListDialog
        open={showCreateList}
        onOpenChange={setShowCreateList}
        onCreateList={handleCreateList}
      />

      <CreateCardDialog
        open={showCreateCard}
        onOpenChange={setShowCreateCard}
        onCreateCard={handleCreateCard}
        availableTags={tags}
        onCreateTag={() => setShowTagManager(true)}
      />

      {selectedCard && (
        <EditCardDialog
          open={showEditCard}
          onOpenChange={setShowEditCard}
          card={selectedCard}
          onEditCard={handleEditCard}
          availableTags={tags}
          onCreateTag={() => setShowTagManager(true)}
        />
      )}

      {selectedList && (
        <EditListDialog
          open={showEditList}
          onOpenChange={setShowEditList}
          list={selectedList}
          onEditList={handleEditList}
          onDeleteList={handleDeleteList}
        />
      )}

      <TagManager
        open={showTagManager}
        onOpenChange={setShowTagManager}
        tags={tags}
        onCreateTag={handleCreateTag}
        onDeleteTag={handleDeleteTag}
      />

      {currentBoard && (
        <>
          <CardSearch
            open={showCardSearch}
            onOpenChange={setShowCardSearch}
            board={currentBoard}
            onCardSelect={(card) => {
              setSelectedCard(card)
              setShowEditCard(true)
            }}
          />

          <CompletedCards
            open={showCompletedCards}
            onOpenChange={setShowCompletedCards}
            board={currentBoard}
            completedListId={currentBoard.completedListId}
            onSetCompletedList={handleSetCompletedList}
          />

          <AutomationDialog
            open={showAutomations}
            onOpenChange={setShowAutomations}
            board={currentBoard}
            automations={automations}
            onCreateAutomation={handleCreateAutomation}
          />

          <BoardConfigDialog
            open={showBoardConfig}
            onOpenChange={setShowBoardConfig}
            board={currentBoard}
            onUpdateBoard={handleUpdateBoard}
          />
        </>
      )}
    </div>
  )
}

export default GestaoFunil
