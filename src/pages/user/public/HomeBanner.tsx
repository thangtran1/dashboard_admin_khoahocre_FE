import { Button } from "antd";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-warning/10 dark:bg-warning/20 rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-foreground capitalize font-sans">
          Grab Upto 50% off on <br />
          Selected headphone
        </h2>
        <Button
          href={"/shop"}
          type="primary"
          className="text-muted-foreground px-5 py-2 rounded-md text-sm font-semibold"
        >
          Buy Now
        </Button>
      </div>
      <div>
        <img
          src="/images/banner/banner_1.png"
          alt="banner_1"
          className="hidden md:inline-flex w-96"
      />
    </div>
  </div>
);
};
export default HomeBanner;
