import {
  LucideProps,
  Bot,
  Phone,
  Zap,
  IndianRupee
} from 'lucide-react';

export const iconMap = {
  Bot,
  Phone,
  Zap,
  IndianRupee,
};

interface IconProps extends LucideProps {
  name: keyof typeof iconMap;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon {...props} />;
};
