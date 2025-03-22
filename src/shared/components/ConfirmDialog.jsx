import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  onCancel,
  triggerButton,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancel}>취소</Button>
          <Button onClick={onConfirm}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
