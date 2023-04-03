import React, { useEffect } from "react";
import { Avatar, Card } from "components/ui";
import { GrowShrinkTag, Loading, MediaSkeleton } from "components/shared";
import { getCustomerStatistic } from "../store/dataSlice";
import {
  HiOutlineUserAdd,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import NumberFormat from "react-number-format";
import { useAppDispatch, useAppSelector } from "store/hooks";

const StatisticCard = (props: {
  icon: React.ReactNode;
  avatarClass: string;
  label: string;
  value: number;
  growthRate: number;
  loading: boolean;
}) => {
  const { icon, avatarClass, label, value, growthRate, loading } = props;

  const avatarSize = 55;

  return (
    <Card bordered>
      <Loading
        loading={loading}
        customLoader={
          <MediaSkeleton
            avatarProps={{
              className: "rounded",
              width: avatarSize,
              height: avatarSize,
            }}
          />
        }
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className={avatarClass} size={avatarSize} icon={icon} />
            <div>
              <span>{label}</span>
              <h3>
                <NumberFormat
                  displayType="text"
                  value={value}
                  thousandSeparator
                />
              </h3>
            </div>
          </div>
          <GrowShrinkTag value={growthRate} suffix="%" />
        </div>
      </Loading>
    </Card>
  );
};

const CustomerStatistic = () => {
  const dispatch = useAppDispatch();

  const statisticData = useAppSelector(
    (state) => state.crmCustomers.data.statisticData
  );
  const loading = useAppSelector(
    (state) => state.crmCustomers.data.statisticLoading
  );

  useEffect(() => {
    dispatch(getCustomerStatistic());
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
      <StatisticCard
        icon={<HiOutlineUserGroup />}
        avatarClass="!bg-indigo-600"
        label="Total Customers"
        value={statisticData?.totalCustomers?.value}
        growthRate={statisticData?.totalCustomers?.growShrink}
        loading={loading}
      />
      <StatisticCard
        icon={<HiOutlineUsers />}
        avatarClass="!bg-blue-500"
        label="Active Customers"
        value={statisticData?.activeCustomers?.value}
        growthRate={statisticData?.activeCustomers?.growShrink}
        loading={loading}
      />
      <StatisticCard
        icon={<HiOutlineUserAdd />}
        avatarClass="!bg-emerald-500"
        label="New Customers"
        value={statisticData?.newCustomers?.value}
        growthRate={statisticData?.newCustomers?.growShrink}
        loading={loading}
      />
    </div>
  );
};

export default CustomerStatistic;
