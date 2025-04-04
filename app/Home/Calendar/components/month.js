import React from "react";
import Day from "./Day";
export default function Month({ month }) {
    // Guard clause - if month is not an array, use an empty array instead
    const monthData = Array.isArray(month) ? month : [];
    
    return (
      <div className="flex-1 grid grid-cols-7 grid-rows-5 rounded-2xl p-4 bg-gray-900">
        {monthData.map((row, i) => (
          <React.Fragment key={i}>
            {Array.isArray(row) ? row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            )) : null}
          </React.Fragment>
        ))}
      </div>
    );
  }