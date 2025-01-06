import { DetailADetailContainer } from "@/containers";
import { AppScreen } from "@stackflow/plugin-basic-ui";
interface Props {
  params: {
    id: number;
  };
}

const DetailADetail = ({ params }: Props) => {
  return (
    <AppScreen>
      <DetailADetailContainer params={params} />
    </AppScreen>
  );
};

export default DetailADetail;
