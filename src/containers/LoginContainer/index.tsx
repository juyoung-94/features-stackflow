import { Frame, FrameScreen, Heading1 } from "@/atoms";
import { ButtonSolid } from "@/components";
import { useAppSelector } from "@/libs";

export default function LoginContainer() {
  const { tokens } = useAppSelector((state) => state.app.response);

  return (
    <FrameScreen>
      <Heading1>Login Screen</Heading1>

      <Frame gap={20} pt={20}>
        <ButtonSolid onClick={() => {}}>Apple Login</ButtonSolid>
        <ButtonSolid onClick={() => {}}>Google Login</ButtonSolid>
        <ButtonSolid onClick={() => {}}>Facebook Login</ButtonSolid>
        <ButtonSolid onClick={() => {}}>Kakao Login</ButtonSolid>
        <ButtonSolid onClick={() => {}}>Naver Login</ButtonSolid>
        {JSON.stringify(tokens)}
      </Frame>
    </FrameScreen>
  );
}
