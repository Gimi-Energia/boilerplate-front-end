import { useQuery } from '@tanstack/react-query'

import {
  getAllDepartments,
  getDepartmentById,
  getDepartmentsByCompany,
} from '@/services/departments/get-departments'
import { IUser } from '@/types/user'

export function useDepartmentsQuery(user: IUser | null) {
  const { data: departments, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => {
      if (user?.is_iso_admin) {
        return getAllDepartments()
      }

      return getDepartmentsByCompany(user?.company as string)
    },
  })

  const sortedDepartments = departments?.sort((a, b) => {
    if (a.company === b.company) {
      return a.name.localeCompare(b.name)
    }
    return a.company.localeCompare(b.company)
  })

  return { departments: sortedDepartments, isLoading }
}

export function useDepartmentByIdQuery(id: string) {
  const { data: department, isLoading } = useQuery({
    queryKey: ['department', id],
    queryFn: () => getDepartmentById(id),
  })

  return { department, isLoading }
}
