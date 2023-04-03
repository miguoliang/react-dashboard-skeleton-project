import React from "react";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";
import RecentActivity, {
  RecentActivityProps,
} from "../../Portfolio/components/RecentActivity";

const RecentActivities = (props: RecentActivityProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app/crypto/wallets");
  };

  return (
    <RecentActivity
      title="Recent Activities"
      extra={
        <Button size="sm" onClick={handleClick}>
          Details
        </Button>
      }
      {...props}
    />
  );
};

export default RecentActivities;
