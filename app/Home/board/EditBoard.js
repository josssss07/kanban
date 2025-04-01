import CustomDialog from "@/app/components/ui/Dialog.js";
import Button from "@/app/components/ui/Button.js";
export default function EditBoard({ open, onChange }) {
  const heightx = 400;
  const heighty = 500;
  return (
    <div>
      <CustomDialog
        open={open}
        onChange={onChange}
        title={"Edit Board"}
        heightx={heightx}
        heighty={heighty}
      >
        <form>
          <label className="text-body-m text-medium-grey">Board Name</label>
          <br />
          <input
            type="text"
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            placeholder="Platform Launch"
          ></input>
          <br />
          <label className="text-body-m text-medium-grey">Board Cloumns</label>
          <br />
          <div>
            <input
              type="text"
              placeholder="Todo"
              readOnly
              className="w-5/6  text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md  bg-[var(--color-dialog)]"
            ></input>
            <Button
              textColor={"text-medium-grey"}
              bgColor={"bg-none"}
              className={"text-heading-l"}
            >
              X
            </Button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Doing"
              readOnly
              className="w-5/6  text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md  bg-[var(--color-dialog)]"
            ></input>
            <Button
              textColor={"text-medium-grey"}
              bgColor={"bg-none"}
              className={"text-heading-l"}
            >
              X
            </Button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Done"
              readOnly
              className="w-5/6  text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md  bg-[var(--color-dialog)]"
            ></input>
            <Button
              textColor={"text-medium-grey"}
              bgColor={"bg-none"}
              className={"text-heading-l"}
            >
              X
            </Button>
          </div>
          <Button
            className="w-full"
            textColor={"text-main-purple"}
            bgColor={"bg-lines-light"}
          >
            +Add New Cloumn
          </Button>
          <br />
          <input
            type="submit"
            value="Create New Board"
            className="text-white bg-main-purple rounded-full m-2 p-1 w-full"
          />
        </form>
      </CustomDialog>
    </div>
  );
}
