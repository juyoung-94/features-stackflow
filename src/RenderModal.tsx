import { renderModal } from "@/components";
import { useAppSelector } from "@/libs";

export default function RenderModal() {
    const varient = useAppSelector((state) => state.modal.varient);
    const ModalComponent = renderModal[varient];
    return <ModalComponent />;
}
