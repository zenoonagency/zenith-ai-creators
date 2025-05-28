import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanList } from "@/components/kanban/KanbanList";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enUS } from 'date-fns/locale';
import { Board, KanbanCard, KanbanList as KanbanListType, Subtask, Attachment, CustomField } from "@/types/kanban";

const GestaoFunil = () => {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "board-1",
      name: "Board 1",
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
                  completed: true
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false
                }
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150"
                }
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento"
                }
              ]
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
                  completed: true
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false
                }
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150"
                }
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento"
                }
              ]
            }
          ]
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
                  completed: true
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false
                }
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150"
                }
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento"
                }
              ]
            }
          ]
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
                  completed: true
                },
                {
                  id: "subtask-2",
                  name: "Implementar o layout",
                  description: "Implementar o layout da página",
                  completed: false
                }
              ],
              attachments: [
                {
                  id: "attachment-1",
                  name: "Design da página",
                  type: "image",
                  url: "https://via.placeholder.com/150"
                }
              ],
              tags: ["Agente de IA"],
              customFields: [
                {
                  id: "custom-field-1",
                  name: "Status",
                  value: "Em andamento"
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  const [activeBoard, setActiveBoard] = useState<Board | null>(boards[0]);
  const [activeList, setActiveList] = useState<KanbanListType | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [selectedList, setSelectedList] = useState<KanbanListType | null>(null);
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setIsDragging(true);
    const { active } = event;
    const card = activeBoard?.lists
      .flatMap((list) => list.cards)
      .find((card) => card.id === active.id);
    if (card) {
      setSelectedCard(card);
    }
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeList = activeBoard?.lists.find((list) =>
      list.cards.find((card) => card.id === activeId)
    );
    const overList = activeBoard?.lists.find((list) =>
      list.cards.find((card) => card.id === overId)
    );

    if (!activeList || !overList) return;

    if (activeList.id !== overList.id) {
      setActiveList(overList);
      return;
    }
  };

  const handleDragEnd = (event: any) => {
    setIsDragging(false);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeList = activeBoard?.lists.find((list) =>
      list.cards.find((card) => card.id === activeId)
    );
    const overList = activeBoard?.lists.find((list) =>
      list.cards.find((card) => card.id === overId)
    );

    if (!activeList || !overList) return;

    if (activeList.id !== overList.id) {
      // Card moved to a different list
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === activeBoard?.id) {
            const newLists = board.lists.map((list) => {
              if (list.id === activeList.id) {
                const cardToMoveIndex = list.cards.findIndex(
                  (card) => card.id === activeId
                );
                const cardToMove = list.cards[cardToMoveIndex];
                const updatedCards = [...list.cards];
                updatedCards.splice(cardToMoveIndex, 1);
                return { ...list, cards: updatedCards };
              } else if (list.id === overList.id) {
                const cardToMoveIndex = activeList.cards.findIndex(
                  (card) => card.id === activeId
                );
                const cardToMove = activeList.cards[cardToMoveIndex];
                return { ...list, cards: [...list.cards, cardToMove] };
              } else {
                return list;
              }
            });
            return { ...board, lists: newLists };
          } else {
            return board;
          }
        });
      });
    } else {
      // Card reordered within the same list
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === activeBoard?.id) {
            const newLists = board.lists.map((list) => {
              if (list.id === activeList.id) {
                const oldIndex = list.cards.findIndex(
                  (card) => card.id === activeId
                );
                const newIndex = list.cards.findIndex(
                  (card) => card.id === overId
                );
                const updatedCards = arrayMove(list.cards, oldIndex, newIndex);
                return { ...list, cards: updatedCards };
              } else {
                return list;
              }
            });
            return { ...board, lists: newLists };
          } else {
            return board;
          }
        });
      });
    }

    setActiveList(null);
  };

  const handleCreateBoardSubmit = (e: any) => {
    e.preventDefault();
    if (newBoardTitle) {
      const newBoard: Board = {
        id: uuidv4(),
        name: newBoardTitle,
        lists: [],
      };
      setBoards([...boards, newBoard]);
      setNewBoardTitle("");
      setShowCreateBoard(false);
    }
  };

  const handleCreateListSubmit = (e: any) => {
    e.preventDefault();
    if (newListTitle && activeBoard) {
      const newList: KanbanListType = {
        id: uuidv4(),
        title: newListTitle,
        totalValue: 0,
        cards: [],
      };
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === activeBoard.id) {
            return { ...board, lists: [...board.lists, newList] };
          } else {
            return board;
          }
        });
      });
      setNewListTitle("");
      setShowCreateList(false);
    }
  };

  const handleCreateCardSubmit = (e: any) => {
    e.preventDefault();
    if (newCardTitle && activeBoard && activeList) {
      const newCard: KanbanCard = {
        id: uuidv4(),
        listId: activeList.id,
        title: newCardTitle,
        value: 0,
        priority: "low",
        subtasks: [],
        attachments: [],
        tags: [],
        customFields: [],
      };
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === activeBoard.id) {
            const newLists = board.lists.map((list) => {
              if (list.id === activeList.id) {
                return { ...list, cards: [...list.cards, newCard] };
              } else {
                return list;
              }
            });
            return { ...board, lists: newLists };
          } else {
            return board;
          }
        });
      });
      setNewCardTitle("");
      setShowCreateCard(false);
    }
  };

  const handleEditCardSubmit = (e: any) => {
    e.preventDefault();
    if (selectedCard && activeBoard) {
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === activeBoard.id) {
            const newLists = board.lists.map((list) => {
              if (list.id === selectedCard.listId) {
                const newCards = list.cards.map((card) => {
                  if (card.id === selectedCard.id) {
                    return {
                      ...card,
                      title: cardTitle,
                      description: cardDescription,
                      value: cardValue,
                      phone: cardPhone,
                      date: cardDate ? format(cardDate, "yyyy-MM-dd") : undefined,
                      time: cardTime,
                      responsible: cardResponsible,
                      priority: cardPriority,
                      subtasks: subtasks,
                      attachments: attachments,
                      tags: tags,
                      customFields: customFields,
                    };
                  } else {
                    return card;
                  }
                });
                return { ...list, cards: newCards };
              } else {
                return list;
              }
            });
            return { ...board, lists: newLists };
          } else {
            return board;
          }
        });
      });
      setSelectedCard(null);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    if (activeBoard) {
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === activeBoard.id) {
            const newLists = board.lists.map((list) => {
              const newCards = list.cards.filter((card) => card.id !== cardId);
              return { ...list, cards: newCards };
            });
            return { ...board, lists: newLists };
          } else {
            return board;
          }
        });
      });
    }
  };

  const handleDeleteList = (listId: string) => {
    if (activeBoard) {
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === activeBoard.id) {
            const newLists = board.lists.filter((list) => list.id !== listId);
            return { ...board, lists: newLists };
          } else {
            return board;
          }
        });
      });
    }
  };

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
      setSubtasks(selectedCard.subtasks);
      setAttachments(selectedCard.attachments);
      setTags(selectedCard.tags);
      setCustomFields(selectedCard.customFields);
    }
  }, [selectedCard]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <h1 className="text-2xl font-bold">Gestão do Funil</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowCreateBoard(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Board
          </Button>
          <Button onClick={() => setShowCreateList(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Lista
          </Button>
          <Button onClick={() => setShowCreateCard(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Card
          </Button>
        </div>
      </div>

      {/* Board Selector */}
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-between">
              {activeBoard?.name || "Selecionar Board"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {boards.map((board) => (
              <DropdownMenuItem key={board.id} onClick={() => setActiveBoard(board)}>
                {board.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-auto">
        {activeBoard && (
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-6 p-6 h-full">
              <SortableContext
                items={activeBoard.lists.map((list) => list.id)}
                strategy={verticalListSortingStrategy}
              >
                {activeBoard.lists.map((list) => (
                  <KanbanList
                    key={list.id}
                    list={list}
                    onEditCard={(card) => setSelectedCard(card)}
                    onEditList={(list) => setSelectedList(list)}
                    onDeleteCard={handleDeleteCard}
                    onDeleteList={handleDeleteList}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        )}
      </div>

      {/* Dialogs */}
      <Dialog open={showCreateBoard} onOpenChange={setShowCreateBoard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Board</DialogTitle>
            <DialogDescription>
              Adicione um novo board para organizar suas listas e cards.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateBoardSubmit} className="space-y-4">
            <div>
              <Label htmlFor="boardTitle">Título do Board</Label>
              <Input
                id="boardTitle"
                placeholder="Título"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
              />
            </div>
            <Button type="submit">Criar</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateList} onOpenChange={setShowCreateList}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Lista</DialogTitle>
            <DialogDescription>
              Adicione uma nova lista ao board selecionado.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateListSubmit} className="space-y-4">
            <div>
              <Label htmlFor="listTitle">Título da Lista</Label>
              <Input
                id="listTitle"
                placeholder="Título"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
              />
            </div>
            <Button type="submit">Criar</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateCard} onOpenChange={setShowCreateCard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Card</DialogTitle>
            <DialogDescription>
              Adicione um novo card à lista selecionada.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCardSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardTitle">Título do Card</Label>
              <Input
                id="cardTitle"
                placeholder="Título"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
              />
            </div>
            <Button type="submit">Criar</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Card</DialogTitle>
            <DialogDescription>
              Edite os detalhes do card selecionado.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full">
            <form onSubmit={handleEditCardSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cardTitle">Título do Card</Label>
                <Input
                  id="cardTitle"
                  placeholder="Título"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cardDescription">Descrição do Card</Label>
                <Textarea
                  id="cardDescription"
                  placeholder="Descrição"
                  value={cardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cardValue">Valor do Card</Label>
                <Input
                  id="cardValue"
                  type="number"
                  placeholder="Valor"
                  value={cardValue}
                  onChange={(e) => setCardValue(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="cardPhone">Telefone do Card</Label>
                <Input
                  id="cardPhone"
                  type="tel"
                  placeholder="Telefone"
                  value={cardPhone}
                  onChange={(e) => setCardPhone(e.target.value)}
                />
              </div>
              <div>
                <Label>Data do Card</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
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
              <div>
                <Label htmlFor="cardTime">Hora do Card</Label>
                <Input
                  id="cardTime"
                  type="time"
                  placeholder="Hora"
                  value={cardTime}
                  onChange={(e) => setCardTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cardResponsible">Responsável do Card</Label>
                <Input
                  id="cardResponsible"
                  placeholder="Responsável"
                  value={cardResponsible}
                  onChange={(e) => setCardResponsible(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cardPriority">Prioridade do Card</Label>
                <select
                  id="cardPriority"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={cardPriority}
                  onChange={(e) =>
                    setCardPriority(e.target.value as "low" | "medium" | "high" | "urgent")
                  }
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <Button type="submit">Salvar</Button>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestaoFunil;
