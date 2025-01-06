"use client";

import {
  ModalinitialState,
  modalSlice,
  useAppDispatch,
  useAppSelector,
} from "@/libs";
import Modal, { ModalBody, ModalFooter } from ".";
import { Body2, Heading4 } from "@/atoms";
import { colors } from "@/styles";
import Button from "../Button";

const useModal = () => {
  const dispatch = useAppDispatch();
  const { fromApp } = useAppSelector((state) => state.app.response);

  const onModal = async (
    title: string,
    message: string,
    button: ModalinitialState["defaultModalProps"]["button"]
  ) => {
    dispatch(modalSlice.actions.setVarient("DefaultModal"));
    dispatch(modalSlice.actions.setDefaultModal({ title, message, button }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(modalSlice.actions.onVisiable());
  };

  const onUploadModal = async ({
    isMultiple,
    ref = null,
  }: ModalinitialState["uploadModalProps"]) => {
    dispatch(modalSlice.actions.setIsMultiple(isMultiple));
    dispatch(modalSlice.actions.setVarient("UploadModal"));
    // await new Promise((resolve) => setTimeout(resolve, 500));
    if (fromApp) {
      dispatch(modalSlice.actions.onVisiable());
    } else {
      ref?.current?.click();
    }
  };

  return {
    onModal,
    onUploadModal,
  };
};

const DefaultModal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.defaultModalProps);
  return (
    <Modal isAnimation isBackdropBlur radius={16} placement="center" isBackdrop>
      <ModalBody gap={12} p={20}>
        <Heading4 fontColor={colors.neutral["950"]} fontWeight={700}>
          {modal.title}
        </Heading4>
        <Body2 fontColor={colors.neutral["400"]}>{modal.message}</Body2>
      </ModalBody>
      {modal.button && modal.button.length > 0 ? (
        <ModalFooter pb={20} pl={20} pr={20} gap={12}>
          {modal.button.map((item, index) => (
            <Button
              key={index}
              flex={1}
              onClick={() => {
                if (item.style === "cancel") {
                  item.onPress && item.onPress();
                  dispatch(modalSlice.actions.onInvisiable());
                } else {
                  item.onPress && item.onPress();
                }
              }}
              style={
                item.style === "cancel"
                  ? "outline"
                  : item.style === "default"
                  ? "solid"
                  : item.style === "destructive"
                  ? "solid"
                  : "solid"
              }
              color={
                item.style === "cancel"
                  ? "neutral"
                  : item.style === "default"
                  ? "main"
                  : item.style === "destructive"
                  ? "red"
                  : "main"
              }
            >
              {item.text}
            </Button>
          ))}
        </ModalFooter>
      ) : (
        <></>
      )}
    </Modal>
  );
};

const UploadModal = () => {
  const dispatch = useAppDispatch();
  const { uploadModalProps } = useAppSelector((state) => state.modal);

  const showCamera = () => {
    // @ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        camera: true,
      })
    );
    dispatch(modalSlice.actions.onInvisiable());
  };
  const showLibrary = () => {
    //@ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        library: true,
        isMultiple: uploadModalProps.isMultiple,
      })
    );
    dispatch(modalSlice.actions.onInvisiable());
  };

  return (
    <Modal placement="bottom" isBackdrop radius={16} isBackdropClose>
      <ModalBody>
        <Button p={10} onClick={showCamera}>
          {`Camera ${uploadModalProps.isMultiple}`}
        </Button>
        <Button p={10} onClick={() => showLibrary()}>
          Library
        </Button>
      </ModalBody>
    </Modal>
  );
};

export const renderModal = {
  DefaultModal,
  UploadModal,
};

export default useModal;
