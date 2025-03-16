import { useState, Fragment } from "react";
import { useNavigate } from "react-router";
import lion from "@/assets/lion.jpeg";
import { useMediaQuery } from "@/shared/hooks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeaderButton = (props) => {
  return (
    <Button
      className={cn(
        "mr-10 p-3 uppercase text-lg bg-stone-200 text-black hover:!bg-amber-400 hover:text-white",
        props.className
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // 로그인 여부 상태, 우선 false로 초기화

  return (
    <div
      className={`header flex items-center justify-between w-full gap-5 px-5 py-2.5 h-20`}
    >
      <div
        className="flex flex-row items-center gap-5"
        onClick={() => navigate("/")}
      >
        <img src={lion} alt="lion" className="max-h-16 rounded-full" />
        <div className="text-xl">SNULION BLOG</div>
      </div>
      {isMobile ? null : (
        <div className="flex">
          {isUserLoggedIn ? (
            <HeaderButton onClick={() => navigate("/")}>sign out</HeaderButton>
          ) : (
            <Fragment>
              <HeaderButton onClick={() => navigate("/")}>sign in</HeaderButton>
              <HeaderButton onClick={() => navigate("/")}>sign up</HeaderButton>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};
