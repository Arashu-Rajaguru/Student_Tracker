import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Planner() {
  const [plans, setPlans] = useState({});
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [newPlan, setNewPlan] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("planner_plans");
    if (saved) {
      setPlans(JSON.parse(saved));
    } else {
      // Initialize with empty arrays for each day
      const initial = {};
      DAYS.forEach((d) => {
        initial[d] = [];
      });
      setPlans(initial);
    }
  }, []);

  // Save to localStorage whenever plans change
  useEffect(() => {
    if (Object.keys(plans).length > 0) {
      localStorage.setItem("planner_plans", JSON.stringify(plans));
    }
  }, [plans]);

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlan.trim()) return;

    const newItem = {
      id: Date.now(),
      text: newPlan.trim(),
    };

    setPlans((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newItem],
    }));

    setNewPlan("");
  };

  const handleDeletePlan = (day, id) => {
    setPlans((prev) => ({
      ...prev,
      [day]: prev[day].filter((p) => p.id !== id),
    }));
  };

  const startEditing = (plan) => {
    setEditingId(plan.id);
    setEditingText(plan.text);
  };

  const handleEditSubmit = (day, id) => {
    if (!editingText.trim()) return;
    setPlans((prev) => ({
      ...prev,
      [day]: prev[day].map((p) =>
        p.id === id ? { ...p, text: editingText.trim() } : p
      ),
    }));
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="planner-container">
      <BackButton/>
      <h2>🗓 Weekly Planner</h2>
      <p>Plan your week by adding and editing tasks for each day.</p>

      <div className="planner-layout">
        {/* Days column */}
        <div className="planner-days">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              className={`planner-day-btn ${
                selectedDay === day ? "active" : ""
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Plans for selected day */}
        <div className="planner-content">
          <h3>{selectedDay}</h3>

          <form className="planner-form" onSubmit={handleAddPlan}>
            <input
              type="text"
              placeholder={`Add a plan for ${selectedDay}`}
              value={newPlan}
              onChange={(e) => setNewPlan(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>

          {(!plans[selectedDay] || plans[selectedDay].length === 0) ? (
            <p className="planner-empty">
              No plans for this day. Add something you want to get done.
            </p>
          ) : (
            <ul className="planner-list">
              {plans[selectedDay].map((plan) => (
                <li key={plan.id} className="planner-item">
                  {editingId === plan.id ? (
                    <>
                      <input
                        type="text"
                        className="planner-edit-input"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <div className="planner-actions">
                        <button
                          type="button"
                          onClick={() => handleEditSubmit(selectedDay, plan.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditingText("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{plan.text}</span>
                      <div className="planner-actions">
                        <button
                          type="button"
                          onClick={() => startEditing(plan)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeletePlan(selectedDay, plan.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Planner;

