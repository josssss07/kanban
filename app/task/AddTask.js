// import CustomDialog from "../components/ui/Dialog.js";
// import { useContext, useEffect, useState } from "react";
// import supabase from "../supabaseclient.js";
// import { BoardDetailsContext } from "../Home/AllContext.js";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function AddNewTask({ open, onChange }) {
//   const [task, setTask] = useState({
//     name: "eg:Take coffee break",
//     description: "",
//     status: 0,
//     startDate: new Date(),
//     endTime: new Date(),
//   });
//   const heighty = 600;
//   const heightx = 400;
//   const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
//   const [header, setHeaders] = useState([]);

//   async function fetchData() {
//     try {
//       const { data: headers, error: headerError } = await supabase
//         .from("headers")
//         .select("*")
//         .eq("boardid", boardDetails.id);
//       if (headerError) {
//         console.log("Error");
//       }
//       setHeaders(headers);
//       setTask((prevTask) => ({ ...prevTask, status: headers[0].headerid }));
//       console.log(headers);
//     } catch (error) {
//       console.log("Error running useEffect");
//     }
//   }

//   useEffect(() => {
//     console.log("useEffect triggered with boardDetails:", boardDetails);
//     if (boardDetails?.id) {
//       fetchData();
//     }
//   }, [boardDetails?.id]);

//   function updateTask({
//     name = task.name,
//     description = task.description,
//     status = task.status,
//     startDate = task.startDate,
//     endTime = task.endTime,
//   }) {
//     console.log(status);
//     const selectedHeader = header.find(
//       (h) => h.headername == status
//     );
//     console.log("selected Header IS: ");
//     console.log(selectedHeader?.headerid);
//     if (name != undefined) {
//       setTask((prevTask) => ({ ...prevTask, name: name }));
//     } else if (description != undefined) {
//       setTask((prevTask) => ({ ...prevTask, description: description }));
//     } else if (status != undefined) {
//       setTask((prevTask) => ({ ...prevTask, status: selectedHeader.headerid }));
//     } else if (startDate != undefined) {
//       setTask((prevTask) => ({ ...prevTask, startDate: startDate }));
//     } else if (endTime != undefined) {
//       setTask((prevTask) => ({ ...prevTask, endTime: endTime }));
//     }
//   }

//   //include Timestamps and somehow get the headerid
//   async function handleSubmit(e) {
//     e.preventDefault();
//     const selectedHeader = header.find(
//       (h) => h.headername == task.status.headername
//     );
//     console.log("selected header name is : ", task.status.headername);
//     console.log("selected header is : ", selectedHeader);

//     if (!selectedHeader) {
//       console.log("No matching header found for status:", task.status);
//       return;
//     }

//     const { data: newTask, error: newTaskError } = await supabase
//       .from("tasks")
//       .insert({
//         taskname: task.name,
//         taskdescription: task.description,
//         headerid: selectedHeader.headerid,
//         startdate: task.startDate,
//         endtime: task.endTime,
//       });

//     if (newTaskError) {
//       console.log("error in task");
//     }
//     console.log("success");
//     console.log(boardDetails.change);
//     setBoardDetails((prevBoard)=>({
//       ...prevBoard,
//       change: !prevBoard.change,
//     }));
//     console.log(boardDetails.name);
//     onChange(!open);
//   }

//   return (
//     <div>
//       <CustomDialog
//         open={open}
//         onChange={onChange}
//         title={"Add New Task"}
//         heightx={heightx}
//         heighty={heighty}
//       >
//         <form onSubmit={handleSubmit}>
//           <label className="text-body-m text-medium-grey">Title</label>
//           <br />
//           <input
//             type="text"
//             value={task.name}
//             className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
//             onChange={(event) => {
//               updateTask({ name: event.target.value });
//             }}
//           ></input>
//           <br />
//           <label className="text-body-m text-medium-grey">Description</label>
//           <br />
//           <textarea
//             rows="5"
//             cols="40"
//             className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
//             placeholder="eg:It's always good to take a break. This 15 minutes break will recharge the batteries a little."
//             onChange={(event) => {
//               updateTask({ description: event.target.value });
//             }}
//           ></textarea>
//           <br />
//           <label className="text-body-m  text-medium-grey ">Status</label>
//           <br />
//           <select
//             className="w-full p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)]"
//             onChange={(event) => {
//               updateTask({ status: event.target.value });
//             }}
//           >
//             {header?.map((header) => (
//               <option key={header?.headerid} value={header?.headername}>
//                 {header?.headername}
//               </option>
//             ))}
//           </select>
//           <br />

//           <label className="text-body-m text-medium-grey">Start Time</label>
//           <br />
//           <DatePicker
//             selected={task.startDate}
//             onChange={(date) => updateTask({ startDate: date })}
//             className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
//             showTimeSelect
//         dateFormat="dd-mm-yyyy HH:mm"
//           />
//           <br />

//           {/* End Time Picker */}
//           <label className="text-body-m text-medium-grey">End Time</label>
//           <br />
//           <DatePicker
//             selected={task.endTime}
//             onChange={(date) => updateTask({ endTime: date })}
//             className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
//             showTimeSelect
//         dateFormat="dd-mm-yyyy HH:mm"
//           />
//           <br />
//           <input
//             type="submit"
//             value="Create Task"
//             className="text-white bg-main-purple rounded-full m-2 p-1 w-full"
//           />
//         </form>
//       </CustomDialog>
//     </div>
//   );
// }


import CustomDialog from "../components/ui/Dialog.js";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabaseclient.js";
import { BoardDetailsContext } from "../Home/AllContext.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddNewTask({ open, onChange }) {
  const [task, setTask] = useState({
    name: "eg: Take coffee break",
    description: "",
    status: null, // store headerid here
    startDate: new Date(),
    endTime: new Date(),
  });

  const heighty = 600;
  const heightx = 400;
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
  const [headers, setHeaders] = useState([]);

  async function fetchData() {
    try {
      const { data: headersData, error } = await supabase
        .from("headers")
        .select("*")
        .eq("boardid", boardDetails.id);

      if (error) {
        console.log("Error fetching headers:", error);
        return;
      }

      setHeaders(headersData);

      if (headersData && headersData.length > 0) {
        setTask((prevTask) => ({
          ...prevTask,
          status: headersData[0].headerid,
        }));
      }

    } catch (error) {
      console.log("Error running useEffect:", error);
    }
  }

  useEffect(() => {
    if (boardDetails?.id) {
      fetchData();
    }
  }, [boardDetails?.id]);

  function updateTask(changes) {
    setTask((prevTask) => ({
      ...prevTask,
      ...changes,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const selectedHeader = headers.find((h) => h.headerid === task.status);

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
        startdate: task.startDate,
        endtime: task.endTime,
      });

    if (newTaskError) {
      console.log("Error creating task:", newTaskError);
    } else {
      console.log("Task created successfully!");
    }

    // Trigger UI updates
    setBoardDetails((prevBoard) => ({
      ...prevBoard,
      change: !prevBoard.change,
    }));

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
          {/* Title Input */}
          <label className="text-body-m text-medium-grey">Title</label>
          <input
            type="text"
            value={task.name}
            onChange={(e) => updateTask({ name: e.target.value })}
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
          />
          <br />

          {/* Description Input */}
          <label className="text-body-m text-medium-grey">Description</label>
          <textarea
            rows="5"
            cols="40"
            value={task.description}
            onChange={(e) => updateTask({ description: e.target.value })}
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            placeholder="eg: It's always good to take a break. This 15 minutes break will recharge the batteries a little."
          />
          <br />

          {/* Status Dropdown */}
          <label className="text-body-m text-medium-grey">Status</label>
          <select
            value={task.status || ""}
            onChange={(e) => updateTask({ status: parseInt(e.target.value) })}
            className="w-full p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)]"
          >
            {headers.map((header) => (
              <option key={header.headerid} value={header.headerid}>
                {header.headername}
              </option>
            ))}
          </select>
          <br />

          {/* Start Time */}
          <label className="text-body-m text-medium-grey">Start Time</label>
          <DatePicker
            selected={task.startDate}
            onChange={(date) => updateTask({ startDate: date })}
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            showTimeSelect
            dateFormat="dd-MM-yyyy HH:mm"
          />
          <br />

          {/* End Time */}
          <label className="text-body-m text-medium-grey">End Time</label>
          <DatePicker
            selected={task.endTime}
            onChange={(date) => updateTask({ endTime: date })}
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
            showTimeSelect
            dateFormat="dd-MM-yyyy HH:mm"
          />
          <br />

          {/* Submit Button */}
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
