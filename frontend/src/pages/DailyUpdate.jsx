import { useState } from "react";
import axios from "axios";

function DailyUpdate() {

  const [workDone, setWorkDone] =
    useState("");

  const [hoursWorked, setHoursWorked] =
    useState("");

  const [challenges, setChallenges] =
    useState("");

  const [tomorrowPlan, setTomorrowPlan] =
    useState("");

  const submitReport = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/reports/submit",
        {
          employee_id:
            localStorage.getItem("userId"),

          work_done: workDone,

          hours_worked:
            hoursWorked,

          challenges,

          tomorrow_plan:
            tomorrowPlan
        }
      );

      alert(
        "Daily Report Submitted"
      );

      setWorkDone("");
      setHoursWorked("");
      setChallenges("");
      setTomorrowPlan("");

    } catch (err) {

      alert(
        "Failed To Submit"
      );

    }

  };

  return (
    <div style={{
      padding: "20px"
    }}>

      <h2>
        Daily Work Update
      </h2>

      <form onSubmit={submitReport}>

        <textarea
          placeholder="Work Done Today"
          value={workDone}
          onChange={(e)=>
            setWorkDone(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Hours Worked"
          value={hoursWorked}
          onChange={(e)=>
            setHoursWorked(
              e.target.value
            )
          }
        />

        <br /><br />

        <textarea
          placeholder="Challenges"
          value={challenges}
          onChange={(e)=>
            setChallenges(
              e.target.value
            )
          }
        />

        <br /><br />

        <textarea
          placeholder="Tomorrow Plan"
          value={tomorrowPlan}
          onChange={(e)=>
            setTomorrowPlan(
              e.target.value
            )
          }
        />

        <br /><br />

        <button type="submit">
          Submit
        </button>

      </form>

    </div>
  );
}

export default DailyUpdate;