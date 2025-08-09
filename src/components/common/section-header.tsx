interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-10 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 font-headline">{title}</h2>
      {subtitle && <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
