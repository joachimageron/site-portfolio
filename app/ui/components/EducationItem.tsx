interface EducationItemProps {
  period: string;
  title: string;
  url?: string;
  items?: string[];
}

export default function EducationItem({
  period,
  title,
  url,
  items,
}: EducationItemProps) {
  return (
    <article className="flex gap-5 lg:gap-14">
      <div className="text-nowrap">
        <p>{period}</p>
      </div>
      <div>
        {url ? (
          <a href={url}>
            <h3 className="text-white font-bold underline pb-2">
              {title} {"->"}
            </h3>
          </a>
        ) : (
          <h3 className="text-white font-bold underline pb-2">
            {title} {"->"}
          </h3>
        )}
        {items?.map((item, index) => (
          <p key={index} className="pb-1">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}
