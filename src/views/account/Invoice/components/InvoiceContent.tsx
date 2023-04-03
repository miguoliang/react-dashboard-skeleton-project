import React, { useEffect, useState } from "react";
import { Button } from "components/ui";
import { Loading } from "components/shared";
import Logo from "components/template/Logo";
import ContentTable from "./ContentTable";
import { useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { apiGetAccountInvoiceData } from "services/AccountServices";
import { HiLocationMarker, HiPhone } from "react-icons/hi";
import useThemeClass from "utils/hooks/useThemeClass";
import dayjs from "dayjs";
import { noop } from "../../../../components/ui/utils/constant";
import { useAppSelector } from "store/hooks";
import { Invoice } from "../../../../mock/data/accountData";

const InvoiceContent = () => {
  const { textTheme } = useThemeClass();

  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Invoice>({} as Invoice);

  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    fetchData().then(noop);
  }, []);

  const fetchData = async () => {
    const id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (id) {
      setLoading(true);
      const response = await apiGetAccountInvoiceData({ id });
      setLoading(false);
      setData(response.data);
    }
  };

  return (
    <Loading loading={loading}>
      {!isEmpty(data) && (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
            <div>
              <Logo className="mb-3" mode={mode} />
              <address className="not-italic">
                <div>
                  <h5>Elstar, Inc.</h5>
                  <br />
                  <span>9498 Harvard Street</span>
                  <br />
                  <span>Fairfield, Chicago Town 06824</span>
                  <br />
                  <abbr title="Phone">Phone:</abbr>
                  <span>(123) 456-7890</span>
                </div>
              </address>
            </div>
            <div className="my-4">
              <div className="mb-2">
                <h4>Invoice #{data.id}</h4>
                <span>
                  Date:{" "}
                  {dayjs.unix(data.dateTime).format("dddd, DD MMMM, YYYY")}
                </span>
              </div>
              <h6>{data.recipient}</h6>
              <div className="mt-4 flex">
                <HiLocationMarker className={`text-xl ${textTheme}`} />
                <div className="ltr:ml-3 rtl:mr-3">
                  {data.address.map((line) => (
                    <div className="mb-1" key={line}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex">
                <HiPhone className={`text-xl ${textTheme}`} />
                <div className="ltr:ml-3 rtl:mr-3">{data.phoneNumber}</div>
              </div>
            </div>
          </div>
          <ContentTable products={data.product} summary={data.paymentSummary} />
          <div className="print:hidden mt-6 flex items-center justify-between">
            <small className="italic">
              Invoice was created on a computer and is valid without the
              signature and seal.
            </small>
            <Button variant="solid" onClick={() => window.print()}>
              Print
            </Button>
          </div>
        </>
      )}
    </Loading>
  );
};

export default InvoiceContent;
