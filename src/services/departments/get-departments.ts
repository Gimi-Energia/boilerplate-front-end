import { api } from '@/services/api'
import { IDepartment } from '@/types'

const getAllDepartments = async () => {
  try {
    const { data } = await api.get<IDepartment[]>('departments')

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getDepartmentsByCompany = async (company: string) => {
  try {
    const { data } = await api.get<IDepartment[]>(
      `departments?company=${company}`,
    )

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getDepartmentById = async (id: string) => {
  try {
    const { data } = await api.get<IDepartment>(`departments/${id}`)

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getAllDepartments, getDepartmentsByCompany, getDepartmentById }
