import Link from "next/link";

export default function ActionCard({ href, title, description, action }) {
  return (
    <Link href={href} className="action-card">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span>{action}</span>
    </Link>
  );
}
