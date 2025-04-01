import CustomDialog from "../components/ui/Dialog.js";
import Button from "../components/ui/Button.js";
export default function EditTask({ open, onChange }) {
  return (
    <div>
      <CustomDialog open={open} onChange={onChange} title={"Edit Task"}>
        <form>
          <label className="text-body-m text-medium-grey">Title</label>
          <br />
          <input
            type="text"
            className="w-full text-body-l p-2 border-2 border-light-grey rounded-md"
            placeholder="add authentication endpoints"
          ></input>
          <br />
          <label className="text-body-m text-medium-grey">Description</label>
          <br />
          <textarea
            rows="5"
            cols="40"
            className="w-full text-body-l p-2 border-2 border-light-grey rounded-md"
            placeholder="eg:It's always good to take a break. This 15 minutes break will recharge the batteries a little."
          ></textarea>
          <br />
          <label className="text-body-m text-medium-grey">Subtasks</label>
          <br />
          <div>
            <input
              type="text"
              placeholder="eg:Make coffee"
              readOnly
              className="w-5/6  text-body-l p-2 border-2 border-light-grey rounded-md"
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
              placeholder="eg:Drink coffee & smile"
              readOnly
              className="w-5/6  text-body-l p-2 border-2 border-light-grey rounded-md"
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
            +Add New Subtask
          </Button>
          <br />
          <label className="text-body-m  text-medium-grey">Status</label>
          <br />
          <select className="w-full p-2 border-2 border-light-grey">
            <option value="">Doing</option>
          </select>
          <br />
          <input
            type="submit"
            value="Save Changes"
            className="text-white bg-main-purple rounded-full m-2 p-1 w-full"
          />
        </form>
      </CustomDialog>
    </div>
  );
}
