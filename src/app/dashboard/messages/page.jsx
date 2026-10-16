import { Inbox } from "@/components/dashboard/inbox";
import { CONVERSATIONS } from "@/data/dashboard";

export const metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow mb-1">Inbox</p>
        <h1 className="text-3xl sm:text-4xl">Messages</h1>
      </header>
      <Inbox initial={CONVERSATIONS} />
    </div>
  );
}
