import React, { useEffect } from "react";
import classNames from "classnames";
import {
  Avatar,
  Card,
  Input,
  Notification,
  Skeleton,
  toast,
  Tooltip,
} from "components/ui";
import { GrowShrinkTag, Loading } from "components/shared";
import { getWalletData } from "../store/dataSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import { HiOutlineDuplicate, HiOutlinePlus } from "react-icons/hi";
import NumberFormat from "react-number-format";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Wallet as WalletData } from "../../../../mock/data/cryptoData";
import { noop } from "lodash";

const WalletCard = ({ data }: { data: WalletData }) => {
  const { textTheme } = useThemeClass();

  const handleCopyClick = (address = "") => {
    navigator.clipboard.writeText(address).then(noop);
    toast.push(<Notification title="Copied" type="success" duration={1000} />, {
      placement: "top-center",
    });
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="bg-transparent" src={data.icon} shape="circle" />
          <h6 className="font-bold">{data.name}</h6>
        </div>
        <div className="text-right rtl:text-left">
          <h6 className="mb-2">
            <NumberFormat
              displayType="text"
              value={data.fiatValue}
              suffix=" USD"
              thousandSeparator={true}
            />
          </h6>
          <GrowShrinkTag value={data.growShrink} suffix="%" />
        </div>
      </div>
      <div className="my-4">
        <h5 className="font-bold">
          {data.coinValue} {data.symbol}
        </h5>
      </div>
      <Input
        readOnly
        value={data.address}
        suffix={
          <Tooltip title="Copy">
            <HiOutlineDuplicate
              className={classNames(
                "cursor-pointer text-xl",
                `hover:${textTheme}`
              )}
              onClick={() => handleCopyClick(data.address)}
            />
          </Tooltip>
        }
      />
    </Card>
  );
};

const Wallet = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) => state.cryptoWallets.data.walletsData
  ) as WalletData[];

  const loading = useAppSelector((state) => state.cryptoWallets.data.loading);

  useEffect(() => {
    dispatch(getWalletData());
  }, [dispatch]);

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {!loading && (
        <>
          {data.map((wallet) => (
            <WalletCard key={wallet.symbol} data={wallet} />
          ))}
          <Card
            className="border-dashed border-2 hover:border-indigo-600 hover:dark:border-gray-300 bg-transparent"
            clickable
          >
            <div className="flex flex-col justify-center items-center py-5">
              <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-600">
                <HiOutlinePlus className="text-4xl text-gray-300" />
              </div>
              <p className="mt-5 font-semibold">Add Wallet</p>
            </div>
          </Card>
        </>
      )}
      {data.length === 0 &&
        loading &&
        [...Array(4).keys()].map((elm) => (
          <Card key={elm}>
            <Loading
              loading={loading}
              customLoader={
                <>
                  <div className="flex items-center gap-4">
                    <Skeleton variant="circle" />
                    <Skeleton width={100} />
                  </div>
                  <Skeleton className="mt-6" width={150} />
                  <Skeleton className="mt-6" />
                </>
              }
            />
          </Card>
        ))}
    </div>
  );
};

export default Wallet;
