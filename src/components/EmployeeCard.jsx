import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { STATUS_CONFIG } from "../data/employees";

export default function EmployeeCard({ employee, onSelect }) {
  const status = STATUS_CONFIG[employee.status] || STATUS_CONFIG.absent;

  return (
    <motion.button
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect && onSelect(employee)}
      className="group flex cursor-pointer flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div className="relative">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="h-20 w-20 rounded-2xl object-cover ring-4 ring-slate-50 transition group-hover:ring-blue-50"
        />
        {/* Status indicator top-right */}
        <span
          className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow ring-4 ${status.ring}`}
        >
          {employee.status === "leave" ? (
            <Plane size={12} className="text-amber-500" />
          ) : (
            <span className={`h-3 w-3 rounded-full ${status.dot}`} />
          )}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-800">{employee.name}</h3>
      <p className="text-xs font-medium text-blue-600">{employee.id}</p>

      <div className="mt-2 space-y-0.5">
        <p className="text-xs text-slate-500">{employee.designation}</p>
        <p className="text-[11px] text-slate-400">{employee.department}</p>
      </div>

      <span
        className={`mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold ${status.text}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
        {status.label}
      </span>
    </motion.button>
  );
}
