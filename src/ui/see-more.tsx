import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

interface SeeMoreLinkProps {
  to: string;
  children: React.ReactNode;
}

const SeeMore = ({ to, children }: SeeMoreLinkProps) => {
  return (
    <Link
      to={to}
      className="text-sm text-blue-600 font-medium hover:underline inline-flex items-center"
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 ml-1" />
    </Link>

    
  );
};

export default SeeMore;
