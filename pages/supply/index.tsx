import { Breadcrumb } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api, handle401Error } from "../../api";
import { PC } from "../../common";
import { AppLayout } from "../../components/AppLayout";
import { HeadTitle } from "../../components/head";
import { PhoneSupply } from "../../components/table/supply";
import { AppButton } from "../../components/ui/Button";
import { SupplyItemsTable } from "../../components/ui/SupplyContent";
import { AntTableExpanded } from "../../components/ui/Table";
import { useSupply } from "../../hooks/useSupply";
import { useWindowSize } from "../../hooks/useWindowSize";
import { setSuppy } from "../../redux/supply/slice";

const Supply: NextPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/supply')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setSuppy(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const { columns, rows } = useSupply();

  const addSupply = () => {
    Router.push("/supply/new");
  };

  return (
    <AppLayout>
      <HeadTitle title="Supply" />
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Dashboard</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Supply</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addSupply}>
          Add
        </AppButton>
      </div>

      <div className="mt-5">
        {
          width > PC ? <AntTableExpanded
            loading={loading}
            rowKey="id"
            expandable={SupplyItemsTable}
            columns={columns}
            rows={rows}
          /> : <PhoneSupply rows={rows} loading={loading} />
        }
      </div>
    </AppLayout>
  );
};

export default Supply;