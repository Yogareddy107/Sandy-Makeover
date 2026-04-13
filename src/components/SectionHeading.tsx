interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: Props) => (
  <div className="text-center mb-10 md:mb-14">
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    {subtitle && <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{subtitle}</p>}
    <div className="mx-auto mt-4 w-16 h-0.5 bg-accent" />
  </div>
);

export default SectionHeading;
