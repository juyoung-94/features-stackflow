import { FrameScreen, Heading1 } from "@/atoms";
import { ButtonSolid } from "@/components";
import { useAppRouter } from "@/hooks";
import { routes } from "@/routes";

export default function DetailAContainer() {
  const router = useAppRouter();
  return (
    <FrameScreen>
      <Heading1>DetailA</Heading1>
      <ButtonSolid
        onClick={() => {
          router.push(routes.DetailB, {});
        }}
      >
        go to DetailB
      </ButtonSolid>{" "}
      <ButtonSolid
        onClick={() => {
          router.push(routes.DetailADetail, { id: 1231 });
        }}
      >
        go to DetailA_Detail id = 1231
      </ButtonSolid>
    </FrameScreen>
  );
}
