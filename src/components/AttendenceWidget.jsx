import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, LogIn, LogOut, CheckCircle2 } from "lucide-react";

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function AttendanceWidget() {
  const [now, setNow] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setCheckInTime(new Date());
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckInTime(null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">Today's Attendance</h2>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            checkedIn ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${checkedIn ? "bg-emerald-500" : "bg-slate-400"}`}
          />
          {checkedIn ? "Checked In" : "Not Checked In"}
        </span>
      </div>

      {/* Current time */}
      <div className="mt-6 flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 py-6 text-white shadow-lg shadow-blue-500/20">
        <Clock size={22} className="opacity-80" />
        <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight">
          {now ? formatTime(now) : "--:--:--"}
        </p>
        <p className="mt-1 text-xs text-blue-100">
          {now
            ? now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })
            : ""}
        </p>
      </div>

      {/* Check-in confirmation */}
      {checkedIn && checkInTime && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          <CheckCircle2 size={18} />
          <span>Checked in at </span>
          <span className="font-semibold">{formatTime(checkInTime)}</span>
        </motion.div>
      )}

      {/* Action button */}
      {!checkedIn ? (
        <button
          onClick={handleCheckIn}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <LogIn size={18} />
          Check In
        </button>
      ) : (
        <button
          onClick={handleCheckOut}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 py-3 text-sm font-semibold text-white shadow-md shadow-rose-500/20 transition hover:bg-rose-600 active:scale-[0.98]"
        >
          <LogOut size={18} />
          Check Out
        </button>
      )}
    </div>
  );
}
