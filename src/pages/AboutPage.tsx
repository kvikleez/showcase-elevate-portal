import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Layers, Database, Globe, Smartphone } from 'lucide-react'

const AboutPage = () => {
  const architectureLayers = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Presentation Layer",
      description: "React components with TypeScript for type safety",
      technologies: ["React 18", "TypeScript", "JSX"]
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "State Management",
      description: "Context API and React Query for local and server state",
      technologies: ["useState", "useContext", "React Query"]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Layer",
      description: "API integration and data fetching strategies",
      technologies: ["Fetch API", "Axios", "JSON"]
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "UI/UX Layer",
      description: "Responsive design with Tailwind CSS and component library",
      technologies: ["Tailwind CSS", "shadcn/ui", "Responsive Design"]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center py-12">
        <Badge variant="secondary" className="mb-4">
          Architecture Overview
        </Badge>
        <h1 className="text-4xl font-bold mb-6">About This Project</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          This showcase demonstrates a modern, scalable React application architecture 
          following industry best practices and contemporary web development patterns.
        </p>
      </section>

      {/* Architecture Overview */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Application Architecture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureLayers.map((layer, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {layer.icon}
                  </div>
                  <CardTitle className="text-lg">{layer.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{layer.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {layer.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Technical Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Architecture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Component Structure</h4>
                  <p className="text-sm text-muted-foreground">
                    Modular component architecture with clear separation of concerns
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Type Safety</h4>
                  <p className="text-sm text-muted-foreground">
                    TypeScript ensures compile-time error checking and better developer experience
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Routing</h4>
                  <p className="text-sm text-muted-foreground">
                    Client-side routing with React Router for seamless navigation
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Build System</h4>
                  <p className="text-sm text-muted-foreground">
                    Vite for fast development and optimized production builds
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Code Quality</h4>
                  <p className="text-sm text-muted-foreground">
                    ESLint and TypeScript for code quality and consistency
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Styling</h4>
                  <p className="text-sm text-muted-foreground">
                    Utility-first CSS with Tailwind and component tokens
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage