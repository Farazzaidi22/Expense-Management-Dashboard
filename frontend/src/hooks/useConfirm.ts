// frontend/src/hooks/useConfirm.ts
import { useAppDispatch } from "../store/hooks";
import { showConfirmDialog, hideConfirmDialog } from "../store/slices/uiSlice";

export function useConfirm() {
  const dispatch = useAppDispatch();

  const confirm = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      dispatch(
        showConfirmDialog({
          title,
          message,
          onConfirm: () => {
            dispatch(hideConfirmDialog());
            resolve(true);
          },
        })
      );
    });
  };

  return { confirm };
}
