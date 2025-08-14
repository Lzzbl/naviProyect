import { Header } from "@/components/header"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
        <Categories />
      </div>
      <Footer />
    </div>
  )
}