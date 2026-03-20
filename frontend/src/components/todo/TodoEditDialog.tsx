import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldLabel } from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface TodoEditDialogProps {
  todo: { id: string; title: string; description: string } | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: () => void
  onUpdate: (data: Partial<{ title: string; description: string }>) => void
}

const TodoEditDialog: React.FC<TodoEditDialogProps> = ({
  todo,
  isOpen,
  onOpenChange,
  onSave,
  onUpdate,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] border border-white/10 bg-card/95 p-8 shadow-2xl backdrop-blur-2xl sm:max-w-md">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-gradient text-2xl font-bold tracking-tight">
            Edit Task
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-2">
          <div className="space-y-2.5">
            <FieldLabel className="ml-1 text-[10px] font-bold tracking-widest text-muted-foreground/80 uppercase">
              Title
            </FieldLabel>
            <Input
              value={todo?.title || ""}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="h-12 rounded-2xl border-transparent bg-muted/40 px-5 transition-all focus-visible:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/20"
              placeholder="What needs to be done?"
            />
          </div>
          <div className="space-y-2.5">
            <FieldLabel className="ml-1 text-[10px] font-bold tracking-widest text-muted-foreground/80 uppercase">
              Description
            </FieldLabel>
            <Input
              value={todo?.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="h-12 rounded-2xl border-transparent px-5 transition-all"
              placeholder="Add some details..."
            />
          </div>
        </div>
        <DialogFooter className="gap-3 pt-6 sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-full px-6 font-medium"
          >
            Cancel
          </Button>
          <Button onClick={onSave} className="h-11 rounded-full px-8 font-bold">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TodoEditDialog
