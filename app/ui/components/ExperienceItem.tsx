interface ExperienceItemProps {
  title: string;
  period: string;
  description: string;
  url?: string;
  linkText?: string;
  tags: string[];
}

export default function ExperienceItem({
  title,
  period,
  description,
  url,
  linkText,
  tags,
}: ExperienceItemProps) {
  return (
    <article>
      <div className="flex flex-col lg:flex-row gap-4">
        <h3 className="text-white font-bold pb-2 text-nowrap">
          {title}{" "}
          {url && linkText && (
            <a className="underline" href={url}>
              {linkText} {"->"}
            </a>
          )}
        </h3>
        <p className="text-nowrap mb-4">{period}</p>
      </div>
      <p className="pb-5">{description}</p>
      <div className="flex gap-5 flex-wrap">
        {tags.map((tag) => (
          <div key={tag} className="rounded-full px-5 py-2 bg-blue-950 w-fit">
            <p>{tag}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
