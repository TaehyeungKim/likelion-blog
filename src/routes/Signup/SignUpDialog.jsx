import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SignUpInputLabelContainer } from "./index";
import { Label, Input, Button } from "@/shared/components";

export const SignUpDialog = ({ signupValues, open, onSubmit }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
        </DialogHeader>
        <SignUpInputLabelContainer
          label={<Label htmlFor="id">아이디</Label>}
          input={
            <Input type="text" id="id" readOnly value={signupValues.username} />
          }
        />
        <SignUpInputLabelContainer
          label={<Label htmlFor="name">이름</Label>}
          input={
            <Input
              type="text"
              placeholder="이름을 입력하세요"
              id="name"
              value={signupValues.name}
              readOnly
            />
          }
        ></SignUpInputLabelContainer>

        <SignUpInputLabelContainer
          label={<Label htmlFor="email">이메일</Label>}
          input={
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              id="email"
              value={signupValues.email}
              readOnly
            />
          }
        ></SignUpInputLabelContainer>
        <SignUpInputLabelContainer
          label={<Label htmlFor="university">학교</Label>}
          input={
            <Input
              type="text"
              placeholder="학교를 입력하세요"
              id="university"
              value={signupValues.university}
              readOnly
            />
          }
        ></SignUpInputLabelContainer>
        <SignUpInputLabelContainer
          label={<Label htmlFor="major">전공</Label>}
          input={
            <Input
              type="text"
              placeholder="전공 입력하세요"
              id="major"
              value={signupValues.major}
              readOnly
            />
          }
        ></SignUpInputLabelContainer>
        <DialogFooter className="flex !justify-center">
          <Button onClick={onSubmit}>회원가입</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
