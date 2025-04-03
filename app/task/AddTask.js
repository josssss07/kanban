import CustomDialog from "../components/ui/Dialog.js";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabaseclient.js";
import { BoardNameContext } from "../helpers/DisplayNavContext.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddNewTask({ open, onChange }) {
  const [task, setTask] = useState({
    name: "eg:Take coffee break",
    description: "",
    status: "",
    startDate: new Date(),
    endTime: new Date(),
  });
  const heighty = 600;
  const heightx = 400;
  const [boardDetails, setBoardDetails] = useContext(BoardNameContext);
  const [header, setHeaders] = useState([]);

  async function fetchData() {
    try {
      const { data: headers, error: headerError } = await supabase
        .from("headers")
        .select("*")
        .eq("boardid", boardDetails.id);
      if (headerError) {
        console.log("Error");
      }
      setHeaders(headers);
      setTask((prevTask) => ({ ...prevTask, status: headers[0] }));
      console.log(headers);
    } catch (error) {
      console.log("Error running useEffect");
    }
  }

  useEffect(() => {
    console.log("useEffect triggered with boardDetails:", boardDetails);
    if (boardDetails?.id) {
      fetchData();
    }
  }, [boardDetails?.id]);

  function updateTask({
    name = task.name,
    description = task.description,
    status = task.status,
    startDate = task.startDate,
    endTime = task.endTime,
  }) {
    console.log(status);
    if (name != undefined) {
      setTask((prevTask) => ({ ...prevTask, name: name }));
    } else if (description != undefined) {
      setTask((prevTask) => ({ ...prevTask, description: description }));
    } else if (status != undefined) {
      setTask((prevTask) => ({ ...prevTask, status: status }));
    } else if (startDate != undefined) {
      setTask((prevTask) => ({ ...prevTask, startDate: startDate }));
    } else if (endTime != undefined) {
      setTask((prevTask) => ({ ...prevTask, endTime: endTime }));
    }
  }

  //include Timestamps and somehow get the headerid
  async function handleSubmit(e) {
    e.preventDefault();
    const selectedHeader = header.find(
      (h) => h.headername == task.status.headername
    );

    if (!selectedHeader) {
      console.log("No matching header found for status:", task.status);
      return;
    }

    const { data: newTask, error: newTaskError } = await supabase
      .from("tasks")
      .insert({
        taskname: task.name,
        taskdescription: task.description,
        headerid: selectedHeader.headerid,
        totalsubtaskcompleted: 0,
        totalsubtask: 0,
        startdate: task.startDate,
        endtime: task.endTime,
      });

    if (newTaskError) {
      console.log("error in task");
    }
    console.log("success");
    console.log(boardDetails.change);
    setBoardDetails(!boardDetails.change);
    onChange(!open);
  }

  return (
    <div>
      <CustomDialog
        open={open}
        onChange={onChange}
        title={"Add New Task"}
        heightx={heightx}
        heighty={heighty}
      >
        <form onSubmit={handleSubmit}>
          <label className="text-body-m text-medium-grey">Title</label>
          <br />
          <input
            type="text"
            value={task.name}
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            onChange={(event) => {
              updateTask({ name: event.target.value });
            }}
          ></input>
          <br />
          <label className="text-body-m text-medium-grey">Description</label>
          <br />
          <textarea
            rows="5"
            cols="40"
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            placeholder="eg:It's always good to take a break. This 15 minutes break will recharge the batteries a little."
            onChange={(event) => {
              updateTask({ description: event.target.value });
            }}
          ></textarea>
          <br />
          <label className="text-body-m  text-medium-grey ">Status</label>
          <br />
          <select
            className="w-full p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)]"
            onChange={(event) => {
              updateTask({ status: event.target.value });
            }}
          >
            {header?.map((header) => (
              <option key={header?.headerid} value={header?.headername}>
                {header?.headername}
              </option>
            ))}
          </select>
          <br />

          <label className="text-body-m text-medium-grey">Start Time</label>
          <br />
          <DatePicker
            selected={task.startDate}
            onChange={(date) => updateTask({ startDate: date })}
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            showTimeSelect
        dateFormat="dd-mm-yyyy HH:mm"
          />
          <br />

          {/* End Time Picker */}
          <label className="text-body-m text-medium-grey">End Time</label>
          <br />
          <DatePicker
            selected={task.endTime}
            onChange={(date) => updateTask({ endTime: date })}
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            showTimeSelect
        dateFormat="dd-mm-yyyy HH:mm"
          />
          <br />
          <input
            type="submit"
            value="Create Task"
            className="text-white bg-main-purple rounded-full m-2 p-1 w-full"
          />
        </form>
      </CustomDialog>
    </div>
  );
}
