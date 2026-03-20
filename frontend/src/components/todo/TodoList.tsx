import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Todo } from "@/types"
import TodoItem from "./TodoItem"

interface TodoListProps {
  todos: Todo[]
  isLoading: boolean
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onEdit: (todo: { id: string; title: string; description: string }) => void
  onStartAdding: () => void
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  isLoading,
  onToggle,
  onDelete,
  onEdit,
  onStartAdding,
}) => {
  if (isLoading && todos?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-muted-foreground">
        <Loader2 className="mb-4 h-8 w-8 animate-spin" />
        <p>Loading your tasks...</p>
      </div>
    )
  }

  if (todos?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-primary/20 bg-primary/5 p-16 backdrop-blur-sm"
      >
        <div className="mb-6 rounded-md bg-background/50 p-6 shadow-xl ring-1 shadow-primary/5 ring-primary/10">
          <PlusCircle className="h-10 w-10 text-primary/40" />
        </div>
        <h3 className="text-gradient text-2xl font-bold tracking-tight">
          No tasks yet
        </h3>
        <p className="mt-3 max-w-xs text-center text-balance text-muted-foreground">
          Stay organized and productive. Add your first task to begin your
          journey with Focus.
        </p>
        <Button
          variant="default"
          className="mt-8 h-12 rounded-full px-8 font-bold shadow-lg transition-all active:scale-95"
          onClick={onStartAdding}
        >
          Add your first task
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="grid gap-2">
      <AnimatePresence mode="popLayout">
        {todos?.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TodoList
