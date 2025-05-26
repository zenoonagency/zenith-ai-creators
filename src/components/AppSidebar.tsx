
import { 
  LayoutDashboard, 
  Calendar, 
  MessageCircle, 
  Send, 
  Users, 
  DollarSign, 
  FileText, 
  Settings,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

const menuSections = [
  {
    label: "GERAL",
    items: [
      { 
        title: "Dashboard", 
        url: "/dashboard", 
        icon: LayoutDashboard,
        badge: null
      },
      { 
        title: "Calendário", 
        url: "/calendario", 
        icon: Calendar,
        badge: "Novo"
      },
    ]
  },
  {
    label: "COMUNICAÇÃO",
    items: [
      { 
        title: "Conversas", 
        url: "/conversas", 
        icon: MessageCircle,
        badge: null
      },
      { 
        title: "Disparo", 
        url: "/disparo", 
        icon: Send,
        badge: null
      },
    ]
  },
  {
    label: "GESTÃO",
    items: [
      { 
        title: "Gestão de funil", 
        url: "/gestao-funil", 
        icon: Settings,
        badge: "Novo"
      },
      { 
        title: "Equipe", 
        url: "/equipe", 
        icon: Users,
        badge: null
      },
    ]
  },
  {
    label: "FINANCEIRO",
    items: [
      { 
        title: "Financeiro", 
        url: "/financeiro", 
        icon: DollarSign,
        badge: null
      },
      { 
        title: "Contratos", 
        url: "/contratos", 
        icon: FileText,
        badge: null
      },
    ]
  },
  {
    label: "AVANÇADO",
    items: [
      { 
        title: "Páginas Embed", 
        url: "/paginas-embed", 
        icon: Settings,
        badge: "Novo"
      },
      { 
        title: "Agentes de IA", 
        url: "/agentes", 
        icon: MessageCircle,
        badge: null
      },
      { 
        title: "Conectar WhatsApp", 
        url: "/whatsapp", 
        icon: MessageCircle,
        badge: null
      },
    ]
  }
]

const advancedItems = [
  { title: "Marcadores", url: "/marcadores", hasSubmenu: true }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path)

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent className="px-0">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">ZEN<span className="text-purple-600">AIX</span></h2>
        </div>

        {/* Menu Sections */}
        <div className="py-2">
          {menuSections.map((section) => (
            <SidebarGroup key={section.label} className="px-0 py-2">
              <SidebarGroupLabel className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {section.label}
              </SidebarGroupLabel>
              
              <SidebarGroupContent>
                <SidebarMenu className="px-3">
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <NavLink 
                          to={item.url} 
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full group relative ${
                            isActive(item.url)
                              ? "bg-purple-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                          {isActive(item.url) && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r-full" />
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}

          {/* Advanced Items with Submenu */}
          <SidebarGroup className="px-0 py-2">
            <SidebarGroupContent>
              <SidebarMenu className="px-3">
                {advancedItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Collapsible
                      open={openSubmenu === item.title}
                      onOpenChange={() => toggleSubmenu(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full text-gray-700 hover:bg-gray-100">
                          <Settings className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{item.title}</span>
                          <ChevronRight 
                            className={`h-4 w-4 ml-auto transition-transform ${
                              openSubmenu === item.title ? "rotate-90" : ""
                            }`} 
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <NavLink 
                                to="/marcadores/submenu"
                                className="flex items-center gap-3 px-8 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                              >
                                Submenu Item
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
