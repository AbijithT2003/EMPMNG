import "./Schedule.css";

export default function Schedule() {
  const schedules = [
    { id: 1, name: "Team Meeting", time: "10:00 AM" },
    { id: 2, name: "Project Deadline", time: "3:00 PM" },
    { id: 3, name: "HR Review", time: "5:00 PM" },
  ];

  return (
    <div className="schedule">
      <h1>Schedule</h1>
      <ul>
        {schedules.map((item) => (
          <li key={item.id}>
            <span className="time">{item.time}</span> -{" "}
            <span className="name">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
