import Link from "next/link";

export default function EmptyState({ title, description, actionLabel, href }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {href && actionLabel && (
        <Link href={href} className="button button-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
