import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Code, Palette, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Modern Architecture",
      description: "Built with React 18, TypeScript, and Vite for optimal performance"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Design System",
      description: "Consistent theming with Tailwind CSS and shadcn/ui components"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Development",
      description: "Hot module replacement and instant feedback during development"
    }
  ]

  const technologies = [
    "React 18", "TypeScript", "Vite", "Tailwind CSS", 
    "shadcn/ui", "React Router", "React Query", "Framer Motion"
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="mb-4">
            Modern Web Application
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to
            <span className="text-gradient block">Showcase Portal</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive demonstration of modern web development practices, 
            featuring React, TypeScript, and cutting-edge tooling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-elegant">
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This application showcases modern web development patterns and best practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-elegant">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm py-2 px-4">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage