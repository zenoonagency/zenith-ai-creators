
import { useState } from "react"
import { Plus, Search, CheckCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "@/components/kanban/KanbanBoard"
import { CreateBoardDialog } from "@/components/kanban/CreateBoardDialog"
import { CreateListDialog } from "@/components/kanban/CreateListDialog"
import { CreateCardDialog } from "@/components/kanban/CreateCardDialog"
import { EditCardDialog } from "@/components/kanban/EditCardDialog"
import { BoardSelector } from "@/components/kanban/BoardSelector"
import { CardSearch } from "@/components/kanban/CardSearch"
import { CompletedCards } from "@/components/kanban/CompletedCards"

interface KanbanCard {
  id: string
  title: string
  value: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  subtasks: { completed: number; total: number }
  attachments: number
  tags: string[]
  listId: string
}

interface KanbanList {
  id: string
  title: string
  cards: KanbanCard[]
  totalValue: number
}

interface Board {
  id: string
  name: string
  lists: KanbanList[]
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
        cards: [
          {
            id: "card-1",
            title: "teste",
            value: 500,
            priority: "urgent",
            subtasks: { completed: 1, total: 2 },
            attachments: 1,
            tags: ["Agente de IA", "Marketing"],
            listId: "pendente"
          }
        ]
      },
      {
        id: "concluido",
        title: "Concluído",
        totalValue: 0,
        cards: []
      }
    ]
  }
]

const GestaoFunil = () => {
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [currentBoardId, setCurrentBoardId] = useState("1")
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [showCreateList, setShowCreateList] = useState(false)
  const [showCreateCard, setShowCreateCard] = useState(false)
  const [showEditCard, setShowEditCard] = useState(false)
  const [showCardSearch, setShowCardSearch] = useState(false)
  const [showCompletedCards, setShowCompletedCards] = useState(false)
  const [selectedListId, setSelectedListId] = useState<string>("")
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null)

  const currentBoard = boards.find(board => board.id === currentBoardId)

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

  const handleCreateCard = (cardData: Omit<KanbanCard, 'id' | 'listId'>) => {
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
  }

  const handleEditCard = (cardData: Omit<KanbanCard, 'id' | 'listId'>) => {
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
  }

  const handleMoveCard = (cardId: string, fromListId: string, toListId: string) => {
    if (!currentBoard) return
    
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
  }

  const handleDeleteBoard = () => {
    if (boards.length === 1) return // Não deletar o último quadro
    
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
          <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
            Criar Automação
          </Button>
          <Button variant="outline" size="sm">
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
      />

      {selectedCard && (
        <EditCardDialog
          open={showEditCard}
          onOpenChange={setShowEditCard}
          card={selectedCard}
          onEditCard={handleEditCard}
        />
      )}

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
          />
        </>
      )}
    </div>
  )
}

export default GestaoFunil
