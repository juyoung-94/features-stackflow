import { FrameScreen } from "@/atoms";

interface Props {
  params: {
    id: number;
  };
}
export default function DetailADetailContainer({ params }: Props) {
  return <FrameScreen>{`${JSON.stringify(params)}`}</FrameScreen>;
}
