import { useEffect, useState, useContext } from "react";
import CustomDialog from "../components/ui/Dialog";
import supabase from "../supabaseclient";
import { BoardDetailsContext } from "../Home/AllContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditorDeletTaskForm({ open, onChange, task, status }) {
  const [header, setHeaders] = useState([]);
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [description, setDescription] = useState(task.taskdescription);
  const [startDate, setStartDate] = useState(new Date(task.startdate));
  const [endTime, setEndTime] = useState(new Date(task.endtime));

  console.log(task);

  async function fetchData() {
    try {
      const { data: headers, error: headerError } = await supabase
        .from("headers")
        .select("*")
        .eq("boardid", boardDetails.id);
      if (headerError) {
        console.log(headerError);
      }
      setHeaders(headers);
      console.log(headers);
    } catch (error) {
      console.log("Error running useEffect");
    }
  }
  useEffect(() => {
    fetchData();
  }, [boardDetails.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const selectedHeader = header.find((h) => h.headername === selectedStatus);
    const { data: newTask, error: newTaskError } = await supabase
      .from("tasks")
      .update({
        taskdescription: description,
        headerid: selectedHeader.headerid,
        startdate: startDate,
        endtime: endTime,
      })
      .eq("taskid", task.taskid);
    if (newTaskError) {
      console.log("Couldnt get the tasks");
    }
    setBoardDetails((prevBoard)=>({
      ...prevBoard,
      change: !prevBoard.change
    }));
    onChange(!open);
  }

  async function deleteTask() {
    const { data: newTask, error: newTaskError } = await supabase
      .from("tasks")
      .delete()
      .eq("taskid", task.taskid);
    if (newTaskError) {
      console.log("Couldnt delete tasks");
    }
    setBoardDetails((prevBoard)=>({
      ...prevBoard,
      change: !prevBoard.change
    }));
    onChange(!open);
  }

  return (
    <div>
      <CustomDialog
        open={open}
        onChange={onChange}
        title={task.taskname}
        heightx={400}
        heighty={400}
        titleWidth="max-w-sm"
      >
        <form className="max-w-sm text-body-m" onSubmit={handleSubmit}>
          <textarea
            rows="5"
            cols="40"
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            placeholder={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea> 
          <br/>
          
        <label className="text-body-m text-medium-grey">Start Time</label>
          <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="w-full p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)]"
          showTimeSelect
        dateFormat="dd-mm-yyyy HH:mm"
        /> 
          <br/>

        <label className="text-body-m text-medium-grey">End Time</label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          className="w-full p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)]"
          showTimeSelect
        dateFormat="dd-mm-yyyy HH:mm"
        /> 
          <br/>

          <label className="text-body-m  text-medium-grey ">
            CurrentStatus
          </label>
          <br />
          <select
            className="w-full p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)]"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {header?.map((header) => (
              <option key={header?.headerid} value={header?.headername}>
                {header?.headername}
              </option>
            ))}
          </select>
          <button className="w-full p-2">Edit</button>
          <br />
          <button
            className="w-full p-2 bg-red-500"
            type="button"
            onClick={deleteTask}
          >
            Delete
          </button>
        </form>
      </CustomDialog>
    </div>
  );
}
