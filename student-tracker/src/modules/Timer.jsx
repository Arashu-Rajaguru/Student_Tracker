import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

const TABS = ["Clock", "Stopwatch", "Timer", "Pomodoro"];

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function Timer() {
  const [activeTab, setActiveTab] = useState("Clock");

  // Clock
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Stopwatch
  const [swRunning, setSwRunning] = useState(false);
  const [swElapsed, setSwElapsed] = useState(0); // ms
  const [swLastStart, setSwLastStart] = useState(null);

  useEffect(() => {
    let interval;
    if (swRunning) {
      interval = setInterval(() => {
        setSwElapsed((prev) => prev + 100);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [swRunning]);

  const handleSwStartStop = () => {
    setSwRunning((prev) => !prev);
    if (!swRunning) {
      setSwLastStart(Date.now());
    }
  };

  const handleSwReset = () => {
    setSwRunning(false);
    setSwElapsed(0);
    setSwLastStart(null);
  };

  // Timer (countdown)
  const [timerInput, setTimerInput] = useState(5); // minutes
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1000) {
            // finish
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Timer finished", {
                body: "Your countdown has completed.",
              });
            }
            setTimerRunning(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerRemaining]);

  const handleTimerStart = () => {
    if (timerRunning) return;
    const ms = Number(timerInput) * 60 * 1000;
    if (!ms) return;
    setTimerRemaining(ms);
    setTimerRunning(true);

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const handleTimerStop = () => {
    setTimerRunning(false);
  };

  const handleTimerReset = () => {
    setTimerRunning(false);
    setTimerRemaining(0);
  };

  // Pomodoro
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoRemaining, setPomoRemaining] = useState(25 * 60 * 1000);
  const [pomoRunning, setPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState("Work"); // Work / Break

  useEffect(() => {
    let interval;
    if (pomoRunning && pomoRemaining > 0) {
      interval = setInterval(() => {
        setPomoRemaining((prev) => {
          if (prev <= 1000) {
            const nextMode = pomoMode === "Work" ? "Break" : "Work";
            const nextMinutes = nextMode === "Work" ? pomoMinutes : 5;

            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Pomodoro session finished", {
                body:
                  nextMode === "Break"
                    ? "Work session done! Time for a short break."
                    : "Break over! Back to focus.",
              });
            }

            setPomoMode(nextMode);
            return nextMinutes * 60 * 1000;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomoRunning, pomoMode, pomoMinutes, pomoRemaining]);

  const handlePomoStart = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    setPomoRunning(true);
  };

  const handlePomoPause = () => {
    setPomoRunning(false);
  };

  const handlePomoReset = () => {
    setPomoRunning(false);
    setPomoMode("Work");
    setPomoRemaining(pomoMinutes * 60 * 1000);
  };

  const handlePomoMinutesChange = (value) => {
    const val = Number(value) || 25;
    setPomoMinutes(val);
    if (pomoMode === "Work") {
      setPomoRemaining(val * 60 * 1000);
    }
  };

  const formatShort = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="timer-container">
      <BackButton />
      <h2>⏱ Timer & Focus</h2>
      <p>Use clock, stopwatch, countdown timer, and pomodoro to manage your time.</p>

      <div className="timer-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`timer-tab-btn ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="timer-panel">
        {activeTab === "Clock" && (
          <div className="timer-section">
            <div className="timer-display-large">
              {now.toLocaleTimeString()}
            </div>
            <div className="timer-subtext">
              {now.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        )}

        {activeTab === "Stopwatch" && (
          <div className="timer-section">
            <div className="timer-display-large">
              {formatTime(swElapsed)}
            </div>
            <div className="timer-buttons-row">
              <button type="button" onClick={handleSwStartStop}>
                {swRunning ? "Pause" : "Start"}
              </button>
              <button type="button" onClick={handleSwReset}>
                Reset
              </button>
            </div>
          </div>
        )}

        {activeTab === "Timer" && (
          <div className="timer-section">
            <div className="timer-input-row">
              <label>
                Minutes:
                <input
                  type="number"
                  min="1"
                  value={timerInput}
                  onChange={(e) => setTimerInput(e.target.value)}
                />
              </label>
            </div>
            <div className="timer-display-large">
              {timerRemaining === 0
                ? `${timerInput.toString().padStart(2, "0")}:00`
                : formatShort(timerRemaining)}
            </div>
            <div className="timer-buttons-row">
              <button type="button" onClick={handleTimerStart}>
                Start
              </button>
              <button type="button" onClick={handleTimerStop}>
                Pause
              </button>
              <button type="button" onClick={handleTimerReset}>
                Reset
              </button>
            </div>
          </div>
        )}

        {activeTab === "Pomodoro" && (
          <div className="timer-section">
            <div className="timer-pomo-header">
              <span className={`pomo-mode ${pomoMode.toLowerCase()}`}>
                {pomoMode} session
              </span>
              <label>
                Work minutes:
                <input
                  type="number"
                  min="5"
                  value={pomoMinutes}
                  onChange={(e) => handlePomoMinutesChange(e.target.value)}
                />
              </label>
            </div>
            <div className="timer-display-large">
              {formatShort(pomoRemaining)}
            </div>
            <div className="timer-buttons-row">
              <button type="button" onClick={handlePomoStart}>
                Start
              </button>
              <button type="button" onClick={handlePomoPause}>
                Pause
              </button>
              <button type="button" onClick={handlePomoReset}>
                Reset
              </button>
            </div>
            <div className="timer-subtext">
              Default cycle: Work → 5‑min Break and repeats.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
