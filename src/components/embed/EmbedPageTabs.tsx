
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmbedPage {
  id: string
  name: string
  url: string
}

interface EmbedPageTabsProps {
  pages: EmbedPage[]
  activePageId: string | null
  onSelectPage: (pageId: string) => void
  onRemovePage: (pageId: string) => void
}

export function EmbedPageTabs({ pages, activePageId, onSelectPage, onRemovePage }: EmbedPageTabsProps) {
  if (pages.length === 0) return null

  return (
    <div className="flex gap-1 border-b bg-white p-2 overflow-x-auto">
      {pages.map((page) => (
        <div
          key={page.id}
          className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border-b-2 transition-colors ${
            activePageId === page.id
              ? "bg-purple-50 border-purple-600 text-purple-700"
              : "bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          <button
            onClick={() => onSelectPage(page.id)}
            className="text-sm font-medium truncate max-w-32"
            title={page.name}
          >
            {page.name}
          </button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRemovePage(page.id)}
            className="h-5 w-5 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}
