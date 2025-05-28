import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, Move3D, MoreHorizontal, CheckSquare, Paperclip, DollarSign } from "lucide-react";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KanbanCard } from "@/components/kanban/KanbanCard";
import { useToast } from "@/components/ui/use-toast";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanList } from "@/components/kanban/KanbanList";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enUS } from 'date-fns/locale';
import { set } from "date-fns";
import { toast } from "@/components/ui/use-toast"

interface Subtask {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
}

interface CustomField {
  id: string;
  name: string;
  value: string;
}

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  value: number;
  phone?: string;
  date?: string;
  time?: string;
  responsible?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subtasks: Subtask[];
  attachments: Attachment[];
  tags: string[];
  customFields: CustomField[];
  listId: string;
}

interface KanbanList {
  id: string;
  title: string;
  cards: KanbanCard[];
  totalValue: number;
  color?: string;
}

interface KanbanBoard {
  id: string;
  title: string;
  lists: KanbanList[];
}

const GestaoFunil = () => {
  const [boards, setBoards] = useState<KanbanBoard[]>([
    {
      id: "board-1",
      title: "Board 1",
      lists: [
        {
          id: "list-1",
          title: "Em Aberto",
          totalValue: 1500,
          cards: [
            {
              id: "card-1",
              listId: "list-1",
              title: "Landing Page",
              description: "Criar a página de vendas",
              value: 1000,
              phone: "5511999999999",
              date: "2024-01-20",
              time: "10:00",
              responsible: "João",
              priority: "high",
              subtasks: [
                {
                  id: "subtask-1",
                  name: "Criar o layout",
                  description: "Criar o layout da página",
                  completed: true,
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false,
                },
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150",
                },
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento",
                },
              ],
            },
            {
              id: "card-2",
              listId: "list-1",
              title: "Página de Obrigado",
              description: "Criar a página de obrigado",
              value: 500,
              phone: "5511999999999",
              date: "2024-01-20",
              time: "10:00",
              responsible: "Maria",
              priority: "medium",
              subtasks: [
                {
                  id: "subtask-1",
                  name: "Criar o layout",
                  description: "Criar o layout da página",
                  completed: true,
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false,
                },
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150",
                },
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento",
                },
              ],
            },
          ],
        },
        {
          id: "list-2",
          title: "Em Desenvolvimento",
          totalValue: 2000,
          cards: [
            {
              id: "card-3",
              listId: "list-2",
              title: "Checkout",
              description: "Criar o checkout",
              value: 2000,
              phone: "5511999999999",
              date: "2024-01-20",
              time: "10:00",
              responsible: "José",
              priority: "low",
              subtasks: [
                {
                  id: "subtask-1",
                  name: "Criar o layout",
                  description: "Criar o layout da página",
                  completed: true,
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false,
                },
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150",
                },
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento",
                },
              ],
            },
          ],
        },
        {
          id: "list-3",
          title: "Concluído",
          totalValue: 3000,
          cards: [
            {
              id: "card-4",
              listId: "list-3",
              title: "Dashboard",
              description: "Criar o dashboard",
              value: 3000,
              phone: "5511999999999",
              date: "2024-01-20",
              time: "10:00",
              responsible: "Ana",
              priority: "urgent",
              subtasks: [
                {
                  id: "subtask-1",
                  name: "Criar o layout",
                  description: "Criar o layout da página",
                  completed: true,
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false,
                },
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150",
                },
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  const [activeBoard, setActiveBoard] = useState<KanbanBoard | null>(boards[0]);
  const [activeList, setActiveList] = useState<KanbanList | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [selectedList, setSelectedList] = useState<KanbanList | null>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardValue, setCardValue] = useState(0);
  const [cardPhone, setCardPhone] = useState("");
  const [cardDate, setCardDate] = useState<Date | undefined>(undefined);
  const [cardTime, setCardTime] = useState("");
  const [cardResponsible, setCardResponsible] = useState("");
  const [cardPriority, setCardPriority] = useState<"low" | "medium" | "high" | "urgent">("low");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [storedBoards, setStoredBoards] = useLocalStorage<KanbanBoard[]>("kanban-boards", boards);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    if (storedBoards) {
      setBoards(storedBoards);
      setActiveBoard(storedBoards[0] || null);
    }
  }, [setBoards, storedBoards]);

  useEffect(() => {
    setStoredBoards(boards);
  }, [boards, setStoredBoards]);

  useEffect(() => {
    if (selectedCard) {
      setCardTitle(selectedCard.title);
      setCardDescription(selectedCard.description || "");
      setCardValue(selectedCard.value);
      setCardPhone(selectedCard.phone || "");
      setCardDate(selectedCard.date ? new Date(selectedCard.date) : undefined);
      setCardTime(selectedCard.time || "");
      setCardResponsible(selectedCard.responsible || "");
      setCardPriority(selectedCard.priority);
      setSubtasks(selectedCard.subtasks || []);
      setAttachments(selectedCard.attachments || []);
      setTags(selectedCard.tags || []);
      setCustomFields(selectedCard.customFields || []);
    } else {
      setCardTitle("");
      setCardDescription("");
      setCardValue(0);
      setCardPhone("");
      setCardDate(undefined);
      setCardTime("");
      setCardResponsible("");
      setCardPriority("low");
      setSubtasks([]);
      setAttachments([]);
      setTags([]);
      setCustomFields([]);
    }
  }, [selectedCard]);

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    console.log("Drag Start", event);
  };

  const handleDragOver = (event: DragOverEvent) => {
    console.log("Drag Over", event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (!over) return;

    if (active?.id === over?.id) return;

    const activeId = active?.id as string;
    const overId = over?.id as string;

    const activeList = activeBoard?.lists.find((list) =>
      list.cards.find((card) => card.id === activeId)
    );
    const overList = activeBoard?.lists.find((list) =>
      list.cards.find((card) => card.id === overId)
    );

    if (!activeList || !overList) return;

    if (activeList.id === overList.id) {
      const activeIndex = activeList.cards.findIndex((card) => card.id === activeId);
      const overIndex = overList.cards.findIndex((card) => card.id === overId);

      const newLists = activeBoard?.lists.map((list) => {
        if (list.id === activeList.id) {
          return {
            ...list,
            cards: arrayMove(list.cards, activeIndex, overIndex),
          };
        }
        return list;
      });

      setBoards(
        boards.map((board) => {
          if (board.id === activeBoard?.id) {
            return { ...board, lists: newLists || [] };
          }
          return board;
        })
      );
    } else {
      const activeIndex = activeList.cards.findIndex((card) => card.id === activeId);
      const overIndex = overList.cards.findIndex((card) => card.id === overId);

      const cardToMove = activeList.cards[activeIndex];

      const newLists = activeBoard?.lists.map((list) => {
        if (list.id === activeList.id) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== activeId),
          };
        }
        if (list.id === overList.id) {
          return {
            ...list,
            cards: [
              ...list.cards.slice(0, overIndex),
              { ...cardToMove, listId: overList.id },
              ...list.cards.slice(overIndex),
            ],
          };
        }
        return list;
      });

      setBoards(
        boards.map((board) => {
          if (board.id === activeBoard?.id) {
            return { ...board, lists: newLists || [] };
          }
          return board;
        })
      );
    }
  };

  const handleDragEndList = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active?.id === over?.id) return;

    const activeId = active?.id as string;
    const overId = over?.id as string;

    const activeIndex = activeBoard?.lists.findIndex((list) => list.id === activeId);
    const overIndex = activeBoard?.lists.findIndex((list) => list.id === overId);

    if (activeIndex === undefined || overIndex === undefined) return;

    const newLists = arrayMove(activeBoard?.lists, activeIndex, overIndex);

    setBoards(
      boards.map((board) => {
        if (board.id === activeBoard?.id) {
          return { ...board, lists: newLists || [] };
        }
        return board;
      })
    );
  };

  const handleCreateBoard = () => {
    if (newBoardTitle) {
      const newBoard: KanbanBoard = {
        id: uuidv4(),
        title: newBoardTitle,
        lists: [],
      };
      setBoards([...boards, newBoard]);
      setNewBoardTitle("");
      setShowCreateBoard(false);
    }
  };

  const handleCreateList = () => {
    if (newListTitle && activeBoard) {
      const newList: KanbanList = {
        id: uuidv4(),
        title: newListTitle,
        cards: [],
        totalValue: 0,
      };

      const updatedBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          return { ...board, lists: [...board.lists, newList] };
        }
        return board;
      });

      setBoards(updatedBoards);
      setNewListTitle("");
      setShowCreateList(false);
    }
  };

  const handleCreateCard = () => {
    if (newCardTitle && activeList) {
      const newCard: KanbanCard = {
        id: uuidv4(),
        listId: activeList.id,
        title: newCardTitle,
        description: "",
        value: 0,
        phone: "",
        date: "",
        time: "",
        responsible: "",
        priority: "low",
        subtasks: [],
        attachments: [],
        tags: [],
        customFields: [],
      };

      const updatedBoards = boards.map((board) => {
        if (board.id === activeBoard?.id) {
          const updatedLists = board.lists.map((list) => {
            if (list.id === activeList.id) {
              return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
          });
          return { ...board, lists: updatedLists };
        }
        return board;
      });

      setBoards(updatedBoards);
      setNewCardTitle("");
      setShowCreateCard(false);
    }
  };

  const handleUpdateCard = () => {
    if (selectedCard && activeBoard) {
      const updatedCard: KanbanCard = {
        ...selectedCard,
        title: cardTitle,
        description: cardDescription,
        value: cardValue,
        phone: cardPhone,
        date: cardDate ? format(cardDate, 'yyyy-MM-dd') : "",
        time: cardTime,
        responsible: cardResponsible,
        priority: cardPriority,
        subtasks: subtasks,
        attachments: attachments,
        tags: tags,
        customFields: customFields,
      };

      const updatedBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          const updatedLists = board.lists.map((list) => {
            if (list.id === updatedCard.listId) {
              const updatedCards = list.cards.map((card) => {
                if (card.id === updatedCard.id) {
                  return updatedCard;
                }
                return card;
              });
              return { ...list, cards: updatedCards };
            }
            return list;
          });
          return { ...board, lists: updatedLists };
        }
        return board;
      });

      setBoards(updatedBoards);
      setSelectedCard(null);
    }
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId));
    if (activeBoard?.id === boardId) {
      setActiveBoard(boards[0] || null);
    }
  };

  const handleDeleteList = (boardId: string, listId: string) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          lists: board.lists.filter(list => list.id !== listId)
        };
      }
      return board;
    }));
  };

  const handleEditCard = (card: KanbanCard) => {
    const cardWithDefaults = {
      ...card,
      customFields: card.customFields || [],
      subtasks: Array.isArray(card.subtasks) ? card.subtasks : []
    };
    setSelectedCard(cardWithDefaults);
  };

  const handleDeleteCard = (boardId: string, listId: string, cardId: string) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                cards: list.cards.filter(card => card.id !== cardId)
              };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const handleEditList = (list: KanbanList) => {
    const listWithDefaults = {
      ...list,
      cards: list.cards.map(card => ({
        ...card,
        customFields: card.customFields || [],
        subtasks: Array.isArray(card.subtasks) ? card.subtasks : []
      }))
    };
    setSelectedList(listWithDefaults);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Funil</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {activeBoard ? activeBoard.title : "Selecionar Funil"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {boards.map((board) => (
                <DropdownMenuItem
                  key={board.id}
                  onClick={() => setActiveBoard(board)}
                >
                  {board.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => setShowCreateBoard(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Funil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          <ScrollArea className="w-full">
            <div className="flex gap-4 w-fit">
              <SortableContext
                items={activeBoard ? activeBoard.lists.map((list) => list.id) : []}
                strategy={verticalListSortingStrategy}
              >
                {activeBoard &&
                  activeBoard.lists.map((list) => (
                    <KanbanList
                      key={list.id}
                      list={list}
                      onCreateCard={(listId) => {
                        setActiveList(list);
                        setShowCreateCard(true);
                      }}
                      onEditCard={handleEditCard}
                      onDeleteCard={(cardId) => handleDeleteCard(activeBoard.id, list.id, cardId)}
                      onEditList={handleEditList}
                    />
                  ))}
              </SortableContext>

              <Card className="w-80">
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-gray-100"
                    onClick={() => {
                      setActiveList(null);
                      setShowCreateList(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Lista
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </DndContext>

      <Dialog open={showCreateBoard} onOpenChange={setShowCreateBoard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Funil</DialogTitle>
            <DialogDescription>
              Dê um nome para o seu novo funil.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Título
              </Label>
              <Input
                id="name"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" onClick={handleCreateBoard}>
              Criar Funil
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateList} onOpenChange={setShowCreateList}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Lista</DialogTitle>
            <DialogDescription>
              Dê um nome para a sua nova lista.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Título
              </Label>
              <Input
                id="name"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" onClick={handleCreateList}>
              Criar Lista
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateCard} onOpenChange={setShowCreateCard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Card</DialogTitle>
            <DialogDescription>
              Dê um título para o seu novo card.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Título
              </Label>
              <Input
                id="name"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" onClick={handleCreateCard}>
              Criar Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Card</DialogTitle>
            <DialogDescription>
              Edite as informações do seu card.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Valor
              </Label>
              <Input
                type="number"
                id="value"
                value={cardValue}
                onChange={(e) => setCardValue(Number(e.target.value))}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input
                id="phone"
                value={cardPhone}
                onChange={(e) => setCardPhone(e.target.value)}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !cardDate && "text-muted-foreground"
                    )}
                  >
                    {cardDate ? format(cardDate, "PPP", { locale: enUS }) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={cardDate}
                    onSelect={setCardDate}
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Hora
              </Label>
              <Input
                type="time"
                id="time"
                value={cardTime}
                onChange={(e) => setCardTime(e.target.value)}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="responsible" className="text-right">
                Responsável
              </Label>
              <Input
                id="responsible"
                value={cardResponsible}
                onChange={(e) => setCardResponsible(e.target.value)}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Prioridade
              </Label>
              <select
                id="priority"
                value={cardPriority}
                onChange={(e) =>
                  setCardPriority(e.target.value as "low" | "medium" | "high" | "urgent")
                }
                className="col-span-2 rounded-md border-gray-200"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" onClick={handleUpdateCard}>
              Salvar Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestaoFunil;
