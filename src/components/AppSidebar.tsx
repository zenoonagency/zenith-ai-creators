
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Send,
  BarChart3,
  Users,
  DollarSign,
  FileText,
  Globe,
  Bot,
  MessageSquare,
  Tag,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigation = [
  {
    title: "GERAL",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Calendário", url: "/calendario", icon: Calendar, badge: "Novo" },
    ]
  },
  {
    title: "COMUNICAÇÃO",
    items: [
      { title: "Conversas", url: "/conversas", icon: MessageCircle },
      { title: "Disparo", url: "/disparo", icon: Send },
    ]
  },
  {
    title: "GESTÃO",
    items: [
      { title: "Gestão de funil", url: "/gestao-funil", icon: BarChart3, badge: "Novo" },
      { title: "Equipe", url: "/equipe", icon: Users },
    ]
  },
  {
    title: "FINANCEIRO",
    items: [
      { title: "Financeiro", url: "/financeiro", icon: DollarSign },
      { title: "Contratos", url: "/contratos", icon: FileText },
    ]
  },
  {
    title: "AVANÇADO",
    items: [
      { title: "Páginas Embed", url: "/paginas-embed", icon: Globe, badge: "Novo" },
    ]
  }
]

const marcadores = [
  { id: "1", name: "Marketing", color: "bg-blue-500" },
  { id: "2", name: "Agente de IA", color: "bg-orange-500" },
  { id: "3", name: "teste", color: "bg-purple-500" },
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const [marcadoresOpen, setMarcadoresOpen] = useState(false)

  const isActive = (url: string) => location.pathname === url

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            Z
          </div>
          {!collapsed && (
            <span className="font-bold text-xl text-gray-900">ZENAX</span>
          )}
        </div>
      </div>

      <SidebarContent className="p-4">
        {navigation.map((section) => (
          <SidebarGroup key={section.title} className="mb-6">
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`w-full justify-start rounded-lg transition-colors ${
                        isActive(item.url)
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm">{item.title}</span>
                            {item.badge && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {!collapsed && (
          <div className="mt-6">
            <Collapsible open={marcadoresOpen} onOpenChange={setMarcadoresOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Marcadores
                </div>
                {marcadoresOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                {marcadores.map((marcador) => (
                  <div key={marcador.id} className="flex items-center gap-2 px-6 py-1">
                    <div className={`w-3 h-3 rounded-full ${marcador.color}`} />
                    <span className="text-sm text-gray-600">{marcador.name}</span>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-6 py-1 text-sm text-purple-600 hover:text-purple-700">
                  + Novo
                </button>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
