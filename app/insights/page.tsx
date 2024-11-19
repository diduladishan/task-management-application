import AssigneeSelector from "./components/AssigneeSelector";
import { DatePicker } from "./components/DatePicker";

export default function InsightsPage() {
  return (
    <div>
      <h1>Tasks</h1>
      <p>Here you can manage all your insights.</p>

      <DatePicker />
      <AssigneeSelector />
    </div>
  );
}
