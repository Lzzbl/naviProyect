import { Header } from "@/components/header"
import AboutUsContent from "@/components/about-us-content"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"

export default function AboutUsContentPage() {
  return (
     <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <Hero />
          </div>
          <Footer />
        </div>
  )
}