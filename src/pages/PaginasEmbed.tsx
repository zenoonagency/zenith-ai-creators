
import { useState } from "react"
import { Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateEmbedPageDialog } from "@/components/embed/CreateEmbedPageDialog"
import { EmbedPageTabs } from "@/components/embed/EmbedPageTabs"

interface EmbedPage {
  id: string
  name: string
  url: string
}

const PaginasEmbed = () => {
  const [pages, setPages] = useState<EmbedPage[]>([])
  const [activePageId, setActivePageId] = useState<string | null>(null)

  const handleCreatePage = (name: string, url: string) => {
    const newPage: EmbedPage = {
      id: Date.now().toString(),
      name,
      url: url.startsWith('http') ? url : `https://${url}`
    }
    setPages(prev => [...prev, newPage])
    setActivePageId(newPage.id)
  }

  const handleRemovePage = (pageId: string) => {
    setPages(prev => prev.filter(page => page.id !== pageId))
    if (activePageId === pageId) {
      const remainingPages = pages.filter(page => page.id !== pageId)
      setActivePageId(remainingPages.length > 0 ? remainingPages[0].id : null)
    }
  }

  const handleSelectPage = (pageId: string) => {
    setActivePageId(pageId)
  }

  const activePage = pages.find(page => page.id === activePageId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Páginas Embed</h1>
        <CreateEmbedPageDialog onCreatePage={handleCreatePage} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Páginas Incorporadas
          </CardTitle>
          <CardDescription>
            Crie e gerencie páginas para incorporar em outros sites
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {pages.length === 0 ? (
            <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg m-6">
              <div className="text-center">
                <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Nenhuma página embed criada</p>
                <CreateEmbedPageDialog onCreatePage={handleCreatePage} />
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              <EmbedPageTabs
                pages={pages}
                activePageId={activePageId}
                onSelectPage={handleSelectPage}
                onRemovePage={handleRemovePage}
              />
              {activePage && (
                <div className="h-[calc(100vh-300px)] border rounded-b-lg overflow-hidden">
                  <iframe
                    src={activePage.url}
                    className="w-full h-full border-0"
                    title={activePage.name}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PaginasEmbed
