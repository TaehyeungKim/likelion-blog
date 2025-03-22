import { Label as LabelComponent } from "@/components/ui/label";

export const Label = ({ children, ...props }) => {
  return <LabelComponent {...props}>{children}</LabelComponent>;
};
