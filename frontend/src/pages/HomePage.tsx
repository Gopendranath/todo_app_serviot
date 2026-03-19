import React, { useEffect, useState } from 'react';
import { useTodoStore } from '@/store/useTodoStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit2, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const HomePage: React.FC = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const { todos, isLoading, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDesc, setNewTodoDesc] = useState('');
  const [editingTodo, setEditingTodo] = useState<{ id: string; title: string; description: string } | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated, fetchTodos]);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      toast.error('Title is required');
      return;
    }
    await addTodo(newTodoTitle, newTodoDesc);
    setNewTodoTitle('');
    setNewTodoDesc('');
    toast.success('Todo added!');
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    await updateTodo(id, { completed: !completed });
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    toast.success('Todo deleted');
  };

  const handleEditTodo = async () => {
    if (!editingTodo || !editingTodo.title.trim()) return;
    await updateTodo(editingTodo.id, { 
      title: editingTodo.title, 
      description: editingTodo.description 
    });
    setIsEditDialogOpen(false);
    setEditingTodo(null);
    toast.success('Todo updated');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTodo} className="space-y-4">
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                placeholder="Todo title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input
                placeholder="Description (optional)"
                value={newTodoDesc}
                onChange={(e) => setNewTodoDesc(e.target.value)}
              />
            </Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Plus className="mr-2 h-4 w-4" /> Add Todo
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Todos</h2>
        {isLoading && todos.length === 0 ? (
          <div className="flex justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : todos.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No todos yet. Add one above!</p>
        ) : (
          <div className="grid gap-4">
            {todos.map((todo) => (
              <Card key={todo._id} className={todo.completed ? 'opacity-60' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleTodo(todo._id, todo.completed)}
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${todo.completed ? 'line-through' : ''}`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-sm text-muted-foreground">{todo.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingTodo({ 
                          id: todo._id, 
                          title: todo.title, 
                          description: todo.description || '' 
                        });
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTodo(todo._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={editingTodo?.title || ''}
                onChange={(e) => setEditingTodo(prev => prev ? { ...prev, title: e.target.value } : null)}
              />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input
                value={editingTodo?.description || ''}
                onChange={(e) => setEditingTodo(prev => prev ? { ...prev, description: e.target.value } : null)}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditTodo}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
