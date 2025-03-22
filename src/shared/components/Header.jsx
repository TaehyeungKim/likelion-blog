import { Fragment, useContext } from "react";
import { useNavigate } from "react-router";
import lion from "@/assets/lion.jpeg";
import { useMediaQuery } from "@/shared/hooks";
import { Button } from "@/shared/components";
import { cn } from "@/lib/utils";
import { UserContext } from "@/shared/context";

const HeaderButton = (props) => {
  return (
    <Button className={cn("mr-10 uppercase", props.className)} {...props}>
      {props.children}
    </Button>
  );
};

export const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div
      className={`sticky bg-white shadow-accent shadow-lg top-0 left-0 z-50 flex items-center justify-between w-full gap-5 px-5 py-2.5 h-20`}
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
          {user ? (
            <HeaderButton onClick={handleSignOut}>sign out</HeaderButton>
          ) : (
            <Fragment>
              <HeaderButton onClick={() => navigate("/signin")}>
                sign in
              </HeaderButton>
              <HeaderButton onClick={() => navigate("/signup")}>
                sign up
              </HeaderButton>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};
