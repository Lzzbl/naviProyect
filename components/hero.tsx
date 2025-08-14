import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (

    
    <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Las Mejores Patinetas del Mundo</h1>
          <p className="text-xl mb-8 text-orange-100">
            Descubre nuestra colección de patinetas profesionales, completas y accesorios. Desde principiantes hasta
            profesionales, tenemos todo lo que necesitas.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/products">Ver Productos</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
            >
              <Link href="/categories">Explorar Categorías</Link>
            </Button>
          </div> */}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>
    </section>
  )
}
