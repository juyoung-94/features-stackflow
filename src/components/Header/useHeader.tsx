import { Body2 } from "@/atoms";
import Button from "../Button";
import Icon from "../Icon";
import { useAppRouter } from "@/hooks";

export default function useHeader() {
  const router = useAppRouter();

  const iconButtonProps = {
    h: "100%",
    isIconOnly: true,
    iconStyle: { size: 28, fill: "#000000" },
    activeStyle: { opacity: 0.3 },
  };
  const textButtonProps = {
    h: "100%",
    activeStyle: { opacity: 0.3 },
  };

  // const bellButton = (onClick = () => router.push("notification", {})) => (
  //   <Button {...iconButtonProps} onClick={onClick}>
  //     <Icon type='solid' name='check' />
  //   </Button>
  // );
  // const menuButton = (onClick = () => router.push("menu", {})) => (
  //   <Button {...iconButtonProps} onClick={onClick}>
  //     <Icon type="line" name="" size={28} />
  //   </Button>
  // );
  const backButton = (
    onClick = () => {
      router.pop();
    }
  ) => (
    <Button {...iconButtonProps} onClick={onClick}>
      <Icon type="solid" name="arrow-left" />
    </Button>
  );
  // const xButton = (onClick = () => router.pop()) => (
  //   <Button {...iconButtonProps} onClick={onClick}>
  //     <Icon type="menu" name="XIcon" />
  //   </Button>
  // );
  // const dotButton = (onClick = () => {}) => (
  //   <Button {...iconButtonProps} onClick={onClick}>
  //     <Icon type="menu" name="dot" size={28} />
  //   </Button>
  // );

  const uploadButton = (pending = false, onClick = () => {}) => (
    <Button
      loading={pending}
      fontSize={"16px"}
      fontColor="#11227B"
      lineHeight={"28px"}
      fontWeight={"600"}
      {...textButtonProps}
      onClick={onClick}
    >
      {`Upload`}
    </Button>
  );

  const readAllButton = (pending = false, onClick = () => {}) => (
    <Button
      loading={pending}
      fontSize={"16px"}
      fontColor="#11227B"
      lineHeight={"28px"}
      fontWeight={"600"}
      {...textButtonProps}
      onClick={onClick}
    >
      {`read all`}
    </Button>
  );

  const navbarATitle = () => (
    <Body2 fontColor="#3A3D43" fontWeight={"600"}>
      {`navbarA`}
    </Body2>
  );
  const navbarBTitle = () => (
    <Body2 fontColor="#3A3D43" fontWeight={"600"}>
      {`navbarB`}
    </Body2>
  );
  const navbarCTitle = () => (
    <Body2 fontColor="#3A3D43" fontWeight={"600"}>
      {`navbarC`}
    </Body2>
  );
  const detailADetailTitle = () => (
    <Body2 fontColor="#3A3D43" fontWeight={"600"}>
      {`detailADetail`}
    </Body2>
  );
  const detailATitle = () => (
    <Body2 fontColor="#3A3D43" fontWeight={"600"}>
      {`detailA`}
    </Body2>
  );
  const detailBTitle = () => (
    <Body2 fontColor="#3A3D43" fontWeight={"600"}>
      {`detailB`}
    </Body2>
  );

  const myPageTitle = () => (
    <Body2 fontColor="#3A3D43" fontWeight={"600"}>
      {`Mypage`}
    </Body2>
  );

  return {
    // image: {
    //   logoImage,
    // },
    icon: {
      //   bellButton,
      //   xButton,
      //   menuButton,
      backButton,
      //   dotButton,
    },
    button: {
      uploadButton,
      readAllButton,
    },
    title: {
      navbarATitle,
      navbarBTitle,
      navbarCTitle,
      myPageTitle,
      detailATitle,
      detailBTitle,
      detailADetailTitle,
    },
  };
}
