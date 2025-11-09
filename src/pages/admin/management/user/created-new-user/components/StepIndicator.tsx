import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";

interface StepIndicatorProps {
  currentStep: "upload" | "preview" | "result";
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useTranslation();
  const steps = [
    {
      key: "upload",
      label: t("management.user.upload"),
      icon: "lucide:upload",
    },
    {
      key: "preview",
      label: t("management.user.preview-data"),
      icon: "lucide:eye",
    },
    {
      key: "result",
      label: t("management.user.result"),
      icon: "lucide:check-circle",
    },
  ];

  const getStepIndex = (step: string) => steps.findIndex((s) => s.key === step);
  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div
            className={`
            flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
            ${
              index <= currentIndex
                ? "border-success text-success"
                : "bg-muted border-border text-muted-foreground"
            }
          `}
          >
            <Icon icon={step.icon} className="w-5 h-5" />
          </div>

          <div
            className={`
            ml-3 font-medium transition-all duration-300
            ${index <= currentIndex ? "text-success" : "text-muted-foreground"}
          `}
          >
            {step.label}
          </div>

          {index < steps.length - 1 && (
            <div
              className={`
              w-16 h-0.5 mx-6 transition-all duration-300
              ${index < currentIndex ? "bg-success" : "bg-gray-300"}
            `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
