import { useContext } from "react";
import { signIn } from "./api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input, Button } from "@/shared/components";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router";
import { UserContext } from "@/shared/context";

export default function Signin() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSignin = async (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    try {
      const user = await signIn(username.value, password.value);
      console.log(user);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
      <form onSubmit={handleSignin}>
        <Card className="w-[400px] aspect-square">
          <img src={logo} className="h-[40%] mx-auto" />
          <CardHeader className="flex items-center !pt-0">
            <CardTitle className="text-2xl font-bold">로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Input
                name="username"
                type="text"
                placeholder="아이디를 입력하세요"
              />
              <Input
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-[4px]">
            <Button type="submit">로그인</Button>
            <Button type="button">회원가입</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
