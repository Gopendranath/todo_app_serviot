import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface TodoFormProps {
  onAdd: (title: string, description: string) => Promise<void>
  isLoading: boolean
  isAdding: boolean
  setIsAdding: (isAdding: boolean) => void
}

const TodoForm: React.FC<TodoFormProps> = ({
  onAdd,
  isLoading,
  isAdding,
  setIsAdding,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [newTodoDesc, setNewTodoDesc] = useState("")

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return
    await onAdd(newTodoTitle, newTodoDesc)
    setNewTodoTitle("")
    setNewTodoDesc("")
  }

  return (
    <AnimatePresence>
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="overflow-hidden rounded-md border border-border bg-background shadow-sm">
            {/* Accent bar at top */}

            <CardContent className="px-5 py-4">
              <form onSubmit={handleAddTodo}>
                {/* Header label */}
                <p className="mb-3 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  New Task
                </p>

                <div className="mb-4 space-y-2">
                  <Input
                    placeholder="What needs to be done?"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    className="h-10 rounded-sm border-border bg-muted/50 px-3 text-sm font-medium transition-colors placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                    autoFocus
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={newTodoDesc}
                    onChange={(e) => setNewTodoDesc(e.target.value)}
                    className="h-9 rounded-sm border-border/60 bg-muted/30 px-3 text-xs transition-colors placeholder:text-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-primary/60 focus-visible:ring-offset-0"
                  />
                </div>

                {/* Divider */}
                <div className="mb-3 h-px w-full bg-border" />

                <div className="flex items-center justify-between">
                  {/* Subtle hint */}
                  <span className="text-[10px] text-muted-foreground/40 select-none">
                    Press ↵ to save
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsAdding(false)}
                      className="h-8 rounded-sm px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Discard
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || !newTodoTitle.trim()}
                      className="h-8 rounded-sm bg-primary px-4 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40"
                    >
                      {isLoading ? "Adding…" : "Add Task"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TodoForm
