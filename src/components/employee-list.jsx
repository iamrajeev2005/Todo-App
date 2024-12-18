import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from '../store/employeeSlice'
import { UserIcon, MailIcon, PhoneIcon, GlobeIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmployeeList() {
  const dispatch = useDispatch()
  const { employees, loading, error } = useSelector((state) => state.employees)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-purple-200 animate-spin border-t-purple-600"></div>
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 animate-ping absolute inset-0 opacity-30"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 rounded-xl p-6 shadow-lg"
      >
        <p className="text-red-700 text-center font-medium">{error}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50"
    >
      <div className="px-6 py-4 border-b border-gray-200/50">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Employee List
        </h2>
      </div>
      
      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {employees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transform -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{employee.name}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MailIcon className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm">{employee.phone}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <GlobeIcon className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm">{employee.website}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {employee.company.name}
                </p>
                <p className="text-xs text-gray-400 italic">
                  {employee.company.catchPhrase}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

