import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input, Label, Button } from "@/shared/components";
import logo from "@/assets/logo.png";
import { useContext, useState, useRef } from "react";
import { SignUpDialog } from "./SignUpDialog";
import { UserContext } from "@/shared/context";
import { useNavigate } from "react-router";
import { getUserById } from "@/shared/api";
import { signUp } from "./api";
export const SignUpInputLabelContainer = ({ label, input }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium pl-2">{label}</div>
      {input}
    </div>
  );
};

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);

  const signUpInfoRef = useRef({
    username: "",
    password: "",
    name: "",
    email: "",
    university: "",
    major: "",
  });

  const handleSubmitToDialog = (e) => {
    e.preventDefault();
    const {
      username,
      password,
      passwordCheck,
      name,
      email,
      university,
      major,
    } = e.target;
    if (password.value !== passwordCheck.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    signUpInfoRef.current = {
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value,
      university: university.value,
      major: major.value,
    };
    setIsSignupDialogOpen(true);
  };

  const handleSignUpDataSubmit = async () => {
    try {
      const { userId: newUserId } = await signUp(signUpInfoRef.current);
      const newUser = await getUserById(newUserId);
      setUser(newUser);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center  py-5">
      <Card className="w-[400px] aspect-square">
        <img src={logo} className="h-[40%] mx-auto" />
        <CardHeader className="flex items-center !pt-0">
          <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitToDialog}>
            <SignUpInputLabelContainer
              label={<Label htmlFor="id">아이디</Label>}
              input={
                <Input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  id="username"
                  name="username"
                  required
                />
              }
            ></SignUpInputLabelContainer>
            <SignUpInputLabelContainer
              label={<Label htmlFor="password">비밀번호</Label>}
              input={
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  id="password"
                  name="password"
                  required
                />
              }
            ></SignUpInputLabelContainer>
            <SignUpInputLabelContainer
              label={<Label htmlFor="passwordCheck">비밀번호 확인</Label>}
              input={
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  id="passwordCheck"
                  name="passwordCheck"
                  required
                />
              }
            ></SignUpInputLabelContainer>
            <SignUpInputLabelContainer
              label={<Label htmlFor="name">이름</Label>}
              input={
                <Input
                  type="text"
                  placeholder="이름을 입력하세요"
                  id="name"
                  name="name"
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
                  name="email"
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
                  name="university"
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
                  name="major"
                />
              }
            ></SignUpInputLabelContainer>
            <Button type="submit">회원가입</Button>
            <SignUpDialog
              open={isSignupDialogOpen}
              onSubmit={handleSignUpDataSubmit}
              signupValues={signUpInfoRef.current}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
