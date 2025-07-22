interface SkillItemProps {
  skill: string;
  level: string;
}

export default function SkillItem({ skill, level }: SkillItemProps) {
  return (
    <article className="flex gap-3">
      <p className="text-white">{skill}</p>
      <p className="text-white">I</p>
      <p>{level}</p>
    </article>
  );
}
