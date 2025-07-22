interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex gap-5 mb-10">
      <h2 className="text-xl font-bold text-white text-nowrap">{title}</h2>
      <div className="bg-white w-full h-0.5 rounded-full self-center" />
    </div>
  );
}
