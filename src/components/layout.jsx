import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 animate-gradient-xy">
      <div className="backdrop-blur-[2px]">
        <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className={`inline-flex items-center px-4 py-2 mt-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                    location.pathname === '/'
                      ? 'text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg hover:shadow-purple-500/25'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  Todo List
                </Link>
                <Link
                  to="/employees"
                  className={`inline-flex items-center px-4 py-2 mt-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                    location.pathname === '/employees'
                      ? 'text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg hover:shadow-purple-500/25'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  Employee List
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

