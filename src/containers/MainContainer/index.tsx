import { Body3, Frame, FrameScreen, Heading1 } from "@/atoms";
import { Button, ButtonOutline, Icon, Uploader, useModal } from "@/components";
import { useAppRouter } from "@/hooks";
import { useAppSelector } from "@/libs";
import { routes } from "@/routes";
import { useState } from "react";

export default function MainContainer() {
  const { fromApp } = useAppSelector((state) => state.app.response);
  const { onModal } = useModal();
  const { push } = useAppRouter();
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = async (files: File[]) => {
    const imageList: string[] = [];
    files.map((file) => {
      imageList.push(URL.createObjectURL(file));
    });

    setImages(imageList);
  };
  return (
    <FrameScreen>
      <ButtonOutline
        onClick={() => {
          push(routes.Login, {});
        }}
      >
        go to Login Screen
      </ButtonOutline>

      <ButtonOutline
        color="red"
        onClick={async () => {
          onModal("title", "message", [
            {
              style: "cancel",
              text: "cancel",
              onPress: () => {
                console.log("cancel");
              },
            },
            {
              style: "default",
              text: "OK",
              onPress: () => {
                console.log("cancel");
              },
            },
          ]);
        }}
      >
        show default Modal
      </ButtonOutline>
      <Frame row gap={8} flexWrap>
        <Uploader isMultiple onFileChange={handleFileChange}>
          <Frame
            alignment="center"
            w={70}
            h={70}
            radius={12}
            stroke={{ size: 1 }}
          >
            <Icon type={"line"} name={"camera"} />
          </Frame>
        </Uploader>

        {images.length > 0 &&
          images.map((image, index) => (
            <Button
              key={index}
              activeStyle={{ opacity: 0.3 }}
              onClick={() => {
                const filteredImages = images.filter((v) => v !== image);
                setImages(filteredImages);
              }}
            >
              <img
                key={index}
                src={image}
                width={70}
                height={70}
                style={{
                  objectFit: "cover",
                  borderRadius: 12,
                  width: 70,
                  height: 70,
                }}
              />
            </Button>
          ))}
      </Frame>

      <Body3>{`fromApp: ${fromApp}`}</Body3>
      {Array.from({ length: 20 }).map((_, index) => (
        <Heading1 key={index}>{`${index + 1} Box`}</Heading1>
      ))}
    </FrameScreen>
  );
}
