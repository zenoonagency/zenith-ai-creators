
import { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Board {
  id: string
  name: string
  lists: any[]
}

interface BoardSelectorProps {
  boards: Board[]
  currentBoardId: string
  onSelectBoard: (boardId: string) => void
  onCreateBoard: () => void
}

export function BoardSelector({ boards, currentBoardId, onSelectBoard, onCreateBoard }: BoardSelectorProps) {
  const currentBoard = boards.find(board => board.id === currentBoardId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between min-w-[200px]">
          {currentBoard?.name || 'Selecionar Quadro'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {boards.map((board) => (
          <DropdownMenuItem 
            key={board.id}
            onClick={() => onSelectBoard(board.id)}
            className={currentBoardId === board.id ? 'bg-purple-50' : ''}
          >
            {board.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={onCreateBoard}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Quadro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
