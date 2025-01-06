import { FrameScreen, Heading1 } from "@/atoms";
import { ButtonSolid } from "@/components";
import { useAppRouter } from "@/hooks";
import { routes } from "@/routes";

export default function NavbarBContainer() {
  const router = useAppRouter();
  return (
    <FrameScreen>
      <Heading1>NavbarB</Heading1>
      <ButtonSolid
        onClick={() => {
          router.push(routes.DetailA, {});
        }}
      >
        go to DetailA
      </ButtonSolid>
    </FrameScreen>
  );
}
