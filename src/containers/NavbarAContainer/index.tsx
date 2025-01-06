import { FrameScreen } from "@/atoms";
import { ButtonSolid } from "@/components";
import { useAppRouter } from "@/hooks";
import { routes } from "@/routes";

export default function NavbarAContainer() {
  const router = useAppRouter();
  return (
    <FrameScreen>
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
