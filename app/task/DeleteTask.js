import CustomDialog from "../components/ui/Dialog.js";
import Button from "../components/ui/Button.js";
export default function DeleteTask({ open, onChange }) {
  return (
    <div>
      <CustomDialog open={open} onChange={onChange} title={"Delete this task?"}>
        <div>
          <div>
            Are you sure you want to delete &apos;{taskName}&apos; task and
            it&apos;s subtaks? This action cannot be reversed.
          </div>
          <div className="flex">
            <Button textColor={"text-white"} bgColor={"bg-red"}>
              Delete
            </Button>
            <br />
            <Button textColor={"text-main-purple"} bgColor={"bg-lines-light"}>
              Cancel
            </Button>
            <br />
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
