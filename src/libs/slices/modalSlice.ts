import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalVarient = "DefaultModal" | "UploadModal";

type ModalButtonStyle = "cancel" | "default" | "destructive";

type ModalButton = {
  text: string;
  onPress?: () => void;
  style?: ModalButtonStyle;
};

export type ModalinitialState = {
  varient: ModalVarient;
  visiable: boolean;
  defaultModalProps: {
    title: string;
    message: string;
    button: ModalButton[];
  };
  uploadModalProps: {
    isMultiple: boolean;
    ref: React.RefObject<HTMLInputElement> | null;
  };
};

export const modalInitialState: ModalinitialState = {
  varient: "DefaultModal",
  visiable: false,
  defaultModalProps: {
    title: "",
    message: "",
    button: [],
  },
  uploadModalProps: {
    isMultiple: false,
    ref: null,
  },
};

// export const onDefaultModal = createAsyncThunk(
//     "modal/onDefaultModal",
//     async (data: {title: string, message:string, button: ModalButton[]}, thunkAPI) => {
//       console.log(data);
//       console.log("데이터 업로드 중...", data);

//       return "success";
//     }
//   );

const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    setVarient(state, action: PayloadAction<ModalinitialState["varient"]>) {
      state.varient = action.payload;
    },
    setDefaultModal(
      state,
      action: PayloadAction<ModalinitialState["defaultModalProps"]>
    ) {
      state.defaultModalProps = action.payload;
    },
    onVisiable(state) {
      state.visiable = true;
    },
    onInvisiable(state) {
      state.visiable = false;
    },
    setIsMultiple(
      state,
      action: PayloadAction<ModalinitialState["uploadModalProps"]["isMultiple"]>
    ) {
      state.uploadModalProps.isMultiple = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //     .addCase(onDefaultModal.pending, (state) => {
  //         state.pending.uploadBoard = true;
  //       })
  //       .addCase(onDefaultModal.rejected, (state) => {
  //         state.pending.uploadBoard = false;
  //       })
  //       .addCase(onDefaultModal.fulfilled, (state, action) => {
  //         state.pending.uploadBoard = false;
  //         console.log("check", action.payload);
  //       });
});

export default modalSlice;
