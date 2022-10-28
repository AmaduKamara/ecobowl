import { Breadcrumb, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { api, handle401Error, handleError } from '../../api';
import * as Yup from "yup";
import Router, { useRouter } from 'next/router';
import { AppLayout, Card } from '../../components/AppLayout';
import { ShowMessage } from '../../contexts/message';
import Link from 'next/link';
import { newRole } from '../../interface/role';
import { AppButton } from '../../components/ui/Button';
import { HeadTitle } from '../../components/head';
import { Loading } from '../../components/table';

const Permission = () => {
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState(newRole);

  const { query } = useRouter();

  const { id } = query;

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    update();
  }, [record]);

  const fetch = () => {
    setLoading(true);
    api.get(`/role/${id}`)
      .then((res) => res.data)
      .then(({ data }) => {
        setRecord(data);
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const cancel = () => {
    Router.push("/role");
  }

  const validationSchema = Yup.object({
    permissions: Yup.array().of(
      Yup.object().shape({
        all: Yup.boolean().required(),
        create: Yup.boolean().required(),
        edit: Yup.boolean().required(),
        delete: Yup.boolean().required(),
        show: Yup.boolean().required(),
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      admin: false,
      permissions: [
        {
          all: false,
          name: "Dashboard",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Product",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Sales",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Offer",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Supply",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Customer",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Staff",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Service",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Role",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "User",
          create: false,
          edit: false,
          delete: false,
          show: false,
        },
        {
          all: false,
          name: "Setting",
          create: false,
          edit: false,
          delete: false,
          show: false,
        }
      ]
    },
    validationSchema,
    onSubmit(values) {
      setLoad(true);

      api.patch(`/role/permissions/${record.id}`, values)
        .then(res => res.data)
        .then(({ message }) => {
          ShowMessage('success', 'Permission', message);
          Router.push("/role");
        })
        .catch(handleError)
        .catch(err => {
          ShowMessage('success', 'Permission', err.data);
        })
        .finally(() => setLoad(false));
    }
  });

  const Permission = ({ permission, index }) => {
    const handleAll = (target) => {
      formik.setFieldValue(`permissions.${index}.all`, target.checked);
      formik.setFieldValue(`permissions.${index}.create`, target.checked);
      formik.setFieldValue(`permissions.${index}.edit`, target.checked);
      formik.setFieldValue(`permissions.${index}.delete`, target.checked);
      formik.setFieldValue(`permissions.${index}.show`, target.checked);
    }

    const handleOption = (target, name) => {
      formik.setFieldValue(name, target.checked);
    }

    const hasCheckBox = (name, box) => {
      if (name === "Dashboard") {
        if (box === "show") return true;
        if (box !== "show") return false;
      }

      if (name === "Setting") {
        if (box === "edit") return true;
        if (box === "show") return true;
        if (box === "create") return false;
        if (box === "delete") return false;
      }

      if (name === "Sales") {
        if (box === "edit") return false;
        if (box === "show") return true;
        if (box === "create") return true;
        if (box === "delete") return false;
      }

      if (name === "Product") {
        if (box === "edit") return false;
        if (box === "show") return true;
        if (box === "create") return true;
        if (box === "delete") return false;
      }

      return true;
    }

    return (
      <tr className={`${index % 2 === 1 ? 'bg-gray-50' : ''} hover:bg-gray-50`}>
        <td className='text-sm font-normal border p-3' align='center'><Checkbox name={`permissions.${index}.all`} checked={permission.all} onChange={e => handleAll(e.target)} /></td>
        <td className='text-sm font-normal border p-3'>{permission.name}</td>
        <td className='text-sm font-normal border p-3'>{hasCheckBox(permission.name, "create") ? <Checkbox onChange={e => handleOption(e.target, `permissions.${index}.create`)} checked={permission.create} name={`permissions.${index}.create`} /> : null}</td>
        <td className='text-sm font-normal border p-3'>{hasCheckBox(permission.name, "edit") ? <Checkbox onChange={e => handleOption(e.target, `permissions.${index}.edit`)} checked={permission.edit} name={`permissions.${index}.edit`} /> : null}</td>
        <td className='text-sm font-normal border p-3'>{hasCheckBox(permission.name, "delete") ? <Checkbox onChange={e => handleOption(e.target, `permissions.${index}.delete`)} checked={permission.delete} name={`permissions.${index}.delete`} /> : null}</td>
        <td className='text-sm font-normal border p-3'>{hasCheckBox(permission.name, "show") ? <Checkbox onChange={e => handleOption(e.target, `permissions.${index}.show`)} checked={permission.show} name={`permissions.${index}.show`} /> : null}</td>
      </tr>
    )
  }

  const update = () => {
    const permissions = (record && record.permissions) ? record.permissions : []
    permissions.forEach((permission, index) => {
      const all = permission.create && permission.delete && permission.edit && permission.show;

      formik.setFieldValue(`permissions.${index}.all`, all);
      formik.setFieldValue(`permissions.${index}.create`, permission.create);
      formik.setFieldValue(`permissions.${index}.edit`, permission.edit);
      formik.setFieldValue(`permissions.${index}.delete`, permission.delete);
      formik.setFieldValue(`permissions.${index}.show`, permission.show);
    })
  }

  return (
    <AppLayout logo='../app.png'>
      {
        loading ? <Loading />
          : record.id ? <>
            <HeadTitle title="Role" />
            <div className='flex justify-between'>
              <Breadcrumb>
                <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link href='/role'><a>Role</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item>Permissions</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className='mt-5'>
              <Card className='overflow-hidden p-2'>
                <div className='overflow-x-auto'>
                  <form onSubmit={formik.handleSubmit}>
                    <table className='w-full border border-collapse'>
                      <thead>
                        <tr>
                          <th className='text-sm font-normal border p-3'>#</th>
                          <th className='text-sm font-normal border p-3' align='left'>Features</th>
                          <th className='text-sm font-normal border p-3' align='left'>Add</th>
                          <th className='text-sm font-normal border p-3' align='left'>Edit</th>
                          <th className='text-sm font-normal border p-3' align='left'>Delete</th>
                          <th className='text-sm font-normal border p-3' align='left'>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          formik.values.permissions.map((permission, index) => <Permission permission={permission} index={index} />)
                        }
                        {
                          record.name !== "Owner" ? <tr>
                            <td colSpan={6} className="p-3 py-4">
                              <div className='flex space-x-3'>
                                <AppButton onClick={cancel} outline>Cancel</AppButton>
                                <AppButton type='submit' loading={load}>Save Permission</AppButton>
                              </div>
                            </td>
                          </tr> : null
                        }
                      </tbody>
                    </table>
                  </form>
                </div>
              </Card>
            </div>
          </> : <div className='flex items-end justify-center h-96'><p>No Data Found</p></div>
      }
    </AppLayout >
  )
}

export default Permission;