import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TodoPaginationProps {
  page: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

const TodoPagination: React.FC<TodoPaginationProps> = ({
  page,
  totalPages,
  isLoading,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="mt-12 flex items-center justify-center gap-2 py-4">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isLoading}
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> Prev
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            variant={page === p ? "secondary" : "ghost"}
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full text-xs font-medium",
              page === p ? "bg-primary text-primary-foreground shadow-sm" : ""
            )}
            onClick={() => onPageChange(p)}
            disabled={isLoading}
          >
            {p}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || isLoading}
      >
        Next <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  )
}

export default TodoPagination
