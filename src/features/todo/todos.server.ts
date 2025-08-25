'use server'

import { prisma } from "@/lib/prisma"

export const getAllTodos = async () => {
    const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return todos
}

export const createTodo = async (text: string) => {
    const todo = await prisma.todo.create({
        data: { text }
    })
    return todo
}

export const deleteTodo = async (id: string) => {
    await prisma.todo.delete({
        where: { id }
    })
}

export const updateTodo = async (id: string, completed: boolean) => {
    const todo = await prisma.todo.update({
        where: { id },
        data: { completed }
    })
    return todo
}