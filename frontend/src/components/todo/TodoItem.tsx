import React from "react"
import { motion } from "framer-motion"
import { Edit2, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Todo } from "@/types"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onEdit: (todo: { id: string; title: string; description: string }) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "group overflow-hidden rounded-sm border border-border shadow-sm transition-all",
          todo.completed
            ? "bg-muted/20 opacity-50"
            : "bg-muted/40 hover:bg-muted/60"
        )}
      >
        <CardContent className="flex items-center gap-4 px-4">
          <div className="relative flex items-center justify-center">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo._id, todo.completed)}
              className="h-5 w-5 rounded-full border border-border transition-all duration-300 hover:border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className={cn(
                "truncate text-sm font-medium transition-all",
                todo.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              )}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={cn(
                  "mt-0.5 truncate text-[11px] transition-all",
                  todo.completed
                    ? "text-muted-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {todo.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-100 transition-all duration-200 [@media(pointer:fine)]:opacity-0 [@media(pointer:fine)]:group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() =>
                onEdit({
                  id: todo._id,
                  title: todo.title,
                  description: todo.description || "",
                })
              }
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDelete(todo._id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TodoItem
