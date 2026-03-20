import React, { useEffect, useState } from "react"
import { useTodoStore } from "@/store/useTodoStore"
import { useAuthStore } from "@/store/useAuthStore"
import { Navigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import TodoForm from "@/components/todo/TodoForm"
import TodoList from "@/components/todo/TodoList"
import TodoPagination from "@/components/todo/TodoPagination"
import TodoEditDialog from "@/components/todo/TodoEditDialog"
import { motion } from "framer-motion"

const HomePage: React.FC = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore()
  const {
    todos,
    isLoading,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    page,
    limit,
    total,
    completed,
    remaining,
  } = useTodoStore()

  const [editingTodo, setEditingTodo] = useState<{
    id: string
    title: string
    description: string
  } | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos(page, limit)
    }
  }, [isAuthenticated, page, limit, fetchTodos])

  if (isAuthLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const totalPages = Math.ceil(total / limit)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchTodos(newPage, limit)
    }
  }

  const handleAddTodo = async (title: string, description: string) => {
    await addTodo(title, description)
    setIsAdding(false)
    toast.success("Task added to your list")
    fetchTodos(page, limit)
  }

  const handleToggleTodo = async (id: string, completed: boolean) => {
    await updateTodo(id, { completed: !completed })
    fetchTodos(page, limit)
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id)
    toast.success("Task removed")

    if (todos.length <= 1 && page > 1) {
      fetchTodos(page - 1, limit)
    } else {
      fetchTodos(page, limit)
    }
  }

  const handleEditTodo = async () => {
    if (!editingTodo || !editingTodo.title.trim()) {
      toast.error("Task title cannot be empty")
      return
    }

    await updateTodo(editingTodo.id, {
      title: editingTodo.title,
      description: editingTodo.description,
    })

    setIsEditDialogOpen(false)
    setEditingTodo(null)
    toast.success("Task updated")
    fetchTodos(page, limit)
  }

  const handleUpdateEditingTodo = (
    data: Partial<{ title: string; description: string }>
  ) => {
    setEditingTodo((prev) => (prev ? { ...prev, ...data } : null))
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      {/* Header: Title left, Button right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="h-9 rounded-full bg-primary px-3 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
          >
            <Plus className="mr-1.5 h-4 w-4" /> New Task
          </Button>
        )}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center justify-center rounded-sm p-4"
        >
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Total
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center rounded-sm p-4"
        >
          <span className="text-2xl font-bold">{remaining}</span>
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Remaining
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center rounded-sm p-4"
        >
          <span className="text-2xl font-bold">{completed}</span>
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Completed
          </span>
        </motion.div>
      </div>

      {/* Add Todo Form — only renders when isAdding */}
      <TodoForm
        onAdd={handleAddTodo}
        isLoading={isLoading}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />

      {/* Todo List */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
            Your Tasks
          </h3>
          <span className="rounded-sm bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Page {page} of {totalPages || 1}
          </span>
        </div>
        <TodoList
          todos={todos}
          isLoading={isLoading}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={(todo) => {
            setEditingTodo(todo)
            setIsEditDialogOpen(true)
          }}
          onStartAdding={() => setIsAdding(true)}
        />
      </div>

      {/* Pagination */}
      <TodoPagination
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />

      {/* Edit Dialog */}
      <TodoEditDialog
        todo={editingTodo}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleEditTodo}
        onUpdate={handleUpdateEditingTodo}
      />
    </div>
  )
}

export default HomePage
