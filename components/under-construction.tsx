import { Wrench, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface UnderConstructionProps {
  title?: string
  message?: string
  showBackButton?: boolean
}

export default function UnderConstruction({
  title = "Página en Construcción",
  message = "Estamos trabajando duro para traerte esta sección. ¡Vuelve pronto!",
  showBackButton = true,
}: UnderConstructionProps) {
  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Construction Message */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6">
                <Wrench className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">{message}</p>

            {showBackButton && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al Inicio
              </Link>
            )}
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué estamos preparando?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está trabajando para ofrecerte la mejor experiencia. Mientras tanto, puedes explorar
              nuestras otras secciones disponibles.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛹</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Productos</h3>
                <p className="text-sm text-gray-600">Explora nuestra colección completa</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Categorías</h3>
                <p className="text-sm text-gray-600">Encuentra lo que necesitas</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Inicio</h3>
                <p className="text-sm text-gray-600">Vuelve a la página principal</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
